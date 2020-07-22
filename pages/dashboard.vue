<template>
  <div id="dashboard">
    <b-form-slider
      v-if="timeRange"
      id="time-slider"
      :min="timeRange[0].id"
      :max="timeRange[timeRange.length - 1].id"
      :value="timeRange[0].id"
      :ticks="getTimeTicks()"
      :ticks-labels="getTimeLabels()"
      :step="timeRange[1].id - timeRange[0].id"
      @change="getShapes"
    />
    <b-row id="data">
      <b-col md="8">
        <div id="charts">
          <b-card
            v-for="card in cards"
            :key="card.key"
            header-bg-variant="primary"
            header-text-variant="light"
          >
            <template v-slot:header>
              <b-row align-h="between" class="m-auto">
                <h5 v-html="getText(card.key, true)" />
                <font-awesome-layers class="fa-2x">
                  <font-awesome-icon
                    icon="circle"
                    :style="{ color: card.color }"
                  />
                  <font-awesome-icon icon="circle" transform="shrink-1" />
                  <font-awesome-icon
                    :icon="card.icon"
                    transform="shrink-7"
                    :style="{ color: card.color }"
                  />
                </font-awesome-layers>
              </b-row>
            </template>
            <b-card-text>
              {{ getText(card.key, false) }}
            </b-card-text>
            <b-card-text
              v-for="chart in card.charts"
              :key="chart.key"
              class="pt-2"
            >
              <div v-if="chart.display">
                <GChart
                  :type="chart.type"
                  :data="chart.data"
                  :options="chart.options"
                />
              </div>
            </b-card-text>
          </b-card>
        </div>
      </b-col>
      <b-col md="4">
        <Map v-if="loaded" id="map" :geo="geoJsons" />
        <Loading v-else />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from 'axios'
import Loading from '../components/Loading'
import Map from '../components/Map'
export default {
  components: {
    Loading,
    Map,
  },
  data() {
    return {
      timeRange: null,
      loaded: false,
      geoJsons: {},
      snowValues: null,
      rainValues: null,
      storedHruValues: null,
      runoffValues: null,
      storedReachValues: null,
      cards: [
        {
          key: 'hru',
          icon: 'seedling',
          color: '#0b6317',
          charts: [
            {
              display: false,
              icon: 'cloud-showers-heavy',
              color: '#668dcc',
              key: 'overall',
              type: 'LineChart',
              data: [],
              options: {},
            },
          ],
        },
        {
          key: 'reach',
          icon: 'tint',
          color: '#265ad4',
          charts: [
            {
              display: false,
              icon: 'random',
              color: '#668dcc',
              key: 'overall',
              type: 'LineChart',
              data: [],
              options: {},
            },
          ],
        },
      ],
    }
  },
  async created() {
    await this.getAvailableTimeRange()
    this.getShapes(this.timeRange[0].id)
    this.getOverall(this.timeRange[0].id)
  },
  methods: {
    async getShapes(time) {
      this.resetValues()
      if (time.newValue) time = time.newValue
      this.geoJsons = {}
      await this.getHrus(time)
      await this.getReaches(time)
      this.loaded = true
    },
    async getHrus(time) {
      await axios
        .get(`http://127.0.0.1:3333/api/hru/geotime/${time}`)
        .then((res) => {
          const storedArr = []
          res.data.forEach((line) => {
            storedArr.push(line.row.properties.stored)
          })
          const rainArr = []
          res.data.forEach((line) => {
            rainArr.push(line.row.properties.rain)
          })
          const snowArr = []
          res.data.forEach((line) => {
            snowArr.push(line.row.properties.snow)
          })
          this.storedHruValues = this.getValues(storedArr)
          this.rainValues = this.getValues(rainArr)
          this.snowValues = this.getValues(snowArr)
          this.computeHruStoredGeoJsons(res.data)
          this.computeRainGeoJsons(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    computeRainGeoJsons(arr) {
      this.geoJsons.rain = []
      arr = arr.filter((x) => x.row.properties.rain !== 0)
      arr.forEach((line) => {
        this.geoJsons.rain.push({
          key: 'hr-' + line.row.properties.id,
          option: {
            style: {
              color: '#668dcc',
              weight:
                this.getScale(line.row.properties.rain, this.rainValues.max) *
                0.5,
              opacity: 0.3,
              fillOpacity: 0,
            },
          },
          row: line.row,
        })
      })
    },
    computeHruStoredGeoJsons(arr) {
      this.geoJsons.hruStored = []
      arr.forEach((line) => {
        const color =
          'rgba(23, 27, 84,' +
          this.getScale(line.row.properties.stored, this.storedHruValues.max) /
            5 +
          ')'
        this.geoJsons.hruStored.push({
          key: 'hs-' + line.row.properties.id,
          option: {
            style: {
              color,
              fillColor: color,
              opacity: 0.8,
              fillOpacity: 1,
              weight: 0.5,
            },
          },
          row: line.row,
        })
      })
    },
    async getReaches(time) {
      await axios
        .get(`http://127.0.0.1:3333/api/reach/geotime/${time}`)
        .then((res) => {
          this.geoJsons.reach = []
          const storedArr = []
          res.data.forEach((line) => {
            storedArr.push(line.row.properties.stored)
          })
          const runoffArr = []
          res.data.forEach((line) => {
            runoffArr.push(line.row.properties.runoff)
          })
          this.storedReachValues = this.getValues(storedArr)
          this.runoffValues = this.getValues(runoffArr)
          res.data.forEach((line) => {
            this.geoJsons.reach.push({
              key: 'r-' + line.row.id,
              option: {
                style: {
                  color: `rgba(0, 166, 255, ${(
                    this.getScale(
                      line.row.properties.stored,
                      this.storedReachValues.max
                    ) / 10
                  ).toString()})`,
                  weight: this.getScale(
                    line.row.properties.runoff,
                    this.runoffValues.max / 0.05
                  ),
                  opacity: 0.8,
                },
              },
              row: line.row,
            })
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getOverall(time) {
      this.hideCharts()
      const hruOverallQuery = axios.get(
        `http://127.0.0.1:3333/api/hru/overall/${this.timeRange[0].id}/${
          this.timeRange[this.timeRange.length - 1].id
        }`
      )
      const reachOverallQuery = axios.get(
        `http://127.0.0.1:3333/api/reach/overall/${this.timeRange[0].id}/${
          this.timeRange[this.timeRange.length - 1].id
        }`
      )
      await axios
        .all([hruOverallQuery, reachOverallQuery])
        .then(
          axios.spread(async (...responses) => {
            await this.setupHeaderCharts()
            responses[0].data.forEach((hru) => {
              hru.rain += hru.snow
              delete hru.snow
              hru.time_id = this.getDayLabel(hru.time_id)
              this.cards[0].charts[0].data.push(Object.values(hru))
            })
            responses[1].data.forEach((reach) => {
              reach.time_id = this.getDayLabel(reach.time_id)
              this.cards[1].charts[0].data.push(Object.values(reach))
            })
            this.showCharts()
          })
        )
        .catch((err) => {
          console.log(err)
        })
    },
    async getAvailableTimeRange() {
      await axios
        .get(`http://127.0.0.1:3333/api/hru/daterange`)
        .then(async (resHru) => {
          await axios
            .get(
              `http://127.0.0.1:3333/api/time/daterange/${resHru.data[0]}/${resHru.data[1]}`
            )
            .then((res) => {
              this.timeRange = res.data
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getOneShape(id) {
      await axios
        .get(`http://127.0.0.1:3333/api/hru/id/${id}`)
        .then((res) => {
          this.geoJsons = [res.data]
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getText(key, isTitle) {
      return isTitle
        ? this.$t('dashboard.' + key + '.title')
        : this.$t('dashboard.' + key + '.text')
    },
    getScale(line, max) {
      return (line * 100) / max
    },
    getValues(arr) {
      return {
        min: Math.min(...arr),
        max: Math.max(...arr),
        avg: arr.reduce((prev, curr) => prev + curr) / arr.length,
      }
    },
    resetValues() {
      this.loaded = false
      this.geoJsons = {}
      this.storedHruValues = null
      this.rainValues = null
      this.snowValues = null
      this.storedReachValues = null
      this.runoffValues = null
    },
    getTimeTicks() {
      const ticks = []
      this.timeRange.forEach((date) => {
        ticks.push(date.id)
      })
      return ticks
    },
    getDayLabel(id) {
      const fullTime = this.timeRange.filter((t) => t.id === id)[0]
      return fullTime.day + '-' + fullTime.month + '-' + fullTime.year
    },
    getTimeLabels() {
      const labels = []
      this.timeRange.forEach((date) => {
        const label = date.day + '/' + date.month + '/' + date.year
        labels.push(label)
      })
      return labels
    },
    setupHeaderCharts() {
      this.cards[0].charts[0].data = [
        [
          this.$t('dashboard.chart.day'),
          this.$t('dashboard.chart.rain'),
          this.$t('dashboard.chart.stored'),
        ],
      ]
      this.cards[1].charts[0].data = [
        [
          this.$t('dashboard.chart.day'),
          this.$t('dashboard.chart.runoff'),
          this.$t('dashboard.chart.storedr'),
        ],
      ]
      const options = {
        vAxis: {
          format: 'short',
        },
        legend: { position: 'top' },
      }
      this.cards[0].charts[0].options.legend = { position: 'top' }
      this.cards[0].charts[0].options.vAxis = {
        format: 'short',
      }
      this.cards[0].charts[0].options.series = {
        0: { targetAxisIndex: 0 },
        1: { targetAxisIndex: 1 },
      }
      this.cards[0].charts[0].options.vAxes = {
        0: { title: this.$t('dashboard.chart.rain') },
        1: { title: this.$t('dashboard.chart.stored') },
      }
      this.cards[1].charts[0].options = options
    },
    removeDuplicates(array) {
      return array.filter((a, b) => array.indexOf(a) === b)
    },
    showCharts() {
      this.cards[0].charts[0].display = true
      this.cards[1].charts[0].display = true
    },
    hideCharts() {
      this.cards[0].charts[0].display = false
      this.cards[1].charts[0].display = false
    },
  },
  head() {
    return {
      title: this.$t('head.dashboard'),
      meta: [
        {
          hid: 'dashboard',
        },
      ],
    }
  },
}
</script>
<style lang="scss">
#dashboard {
  margin: 0 1em;
}
#time-slider {
  width: 100%;
  margin: 1em 0em 2em 0em;
  padding: 0em 5em;
}
#data {
  height: 78vh;
}
#charts {
  margin-bottom: 0.3em;
}
#map {
  margin-bottom: 0.3em;
  height: 100%;
}
.card {
  margin-bottom: 0.8em;
}
.slider.slider-horizontal {
  width: 100% !important;
}
</style>
