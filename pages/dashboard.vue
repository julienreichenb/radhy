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
      @change="getData"
    />
    <b-row id="data">
      <b-col md="12" lg="4" class="mb-3">
        <Map v-if="loaded" id="map" :geo="geoJsons" />
        <Loading v-else />
      </b-col>
      <b-col md="12" lg="8">
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
                <div>
                  <b-button
                    v-for="chart in card.charts"
                    :key="chart.key"
                    class="chart-button ml-1"
                    @click="displayChart(card.key, chart.key)"
                  >
                    <font-awesome-layers class="fa-2x">
                      <font-awesome-icon
                        icon="circle"
                        :style="{ color: chart.color }"
                      />
                      <font-awesome-icon icon="circle" transform="shrink-1" />
                      <font-awesome-icon
                        :icon="chart.icon"
                        transform="shrink-7"
                        :style="{ color: chart.color }"
                      />
                    </font-awesome-layers>
                  </b-button>
                </div>
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
    </b-row>
  </div>
</template>
<script>
import Axios from 'axios'
import Loading from '../components/Loading'
import Map from '../components/Map'
import axios from '../plugins/axios'
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
      cards: [
        {
          key: 'hru',
          charts: [
            {
              display: false,
              key: 'overall',
              icon: 'cloud-showers-heavy',
              color: '#4f82db',
              type: 'LineChart',
              data: [],
              options: {},
            },
            {
              display: false,
              key: 'soil',
              icon: 'layer-group',
              color: '#94570c',
              type: 'PieChart',
              data: [],
              options: {},
            },
            /*
            {
              display: false,
              key: 'agriculture',
              icon: 'seedling',
              color: '#0b6317',
              type: 'AreaChart',
              data: [],
              options: {},
            },
            */
          ],
        },
        {
          key: 'reach',
          charts: [
            {
              display: false,
              key: 'overall',
              icon: 'tint',
              color: '#265ad4',
              type: 'AreaChart',
              data: [],
              options: {},
            },
            {
              display: false,
              key: 'width',
              icon: 'arrows-alt-h',
              color: '#888888',
              type: 'Histogram',
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
    this.getOverall()
    this.getData(this.timeRange[0].id)
  },
  methods: {
    async getData(time) {
      this.resetValues()
      if (time.newValue) time = time.newValue
      this.geoJsons = {}
      await this.loadBoth(time)
      this.loaded = true
    },
    async loadBoth(time) {
      this.getReaches(time)
      await this.getHrus(time)
    },
    async getHrus(time) {
      await axios
        .get(`hru/hrutime/${time}`)
        .then((res) => {
          this.geoJsons.hru = res.data[0].data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getReaches(time) {
      await axios
        .get(`reach/reachtime/${time}`)
        .then((res) => {
          this.geoJsons.reach = res.data[0].data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getOverall() {
      this.hideCharts()
      const hruOverallQuery = axios.get(
        `hru/overall/${this.timeRange[0].id}/${
          this.timeRange[this.timeRange.length - 1].id
        }`
      )
      const reachOverallQuery = axios.get(
        `reach/overall/${this.timeRange[0].id}/${
          this.timeRange[this.timeRange.length - 1].id
        }`
      )
      const soilCompositionQuery = axios.get(`gishru/soil`)
      const reachWidthQuery = axios.get(`gisreach/width`)
      await Axios.all([
        hruOverallQuery,
        reachOverallQuery,
        soilCompositionQuery,
        reachWidthQuery,
      ])
        .then(
          Axios.spread(async (...responses) => {
            await this.setupHeaderCharts()
            /* Data HRU - OVERALL */
            responses[0].data.forEach((hru) => {
              hru.rain += hru.snow
              delete hru.snow
              hru.time_id = this.getDayLabel(hru.time_id)
              this.cards[0].charts[0].data.push(Object.values(hru))
            })
            /* Data REACH - OVERALL & WIDTH  */
            responses[1].data.forEach((reach) => {
              reach.time_id = this.getDayLabel(reach.time_id)
              this.cards[1].charts[0].data.push(Object.values(reach))
            })
            /* Data HRU - SOIL */
            Object.entries(responses[2].data[0]).forEach((line) => {
              line[0] = this.$t('dashboard.chart.' + line[0])
              line[1] = parseInt(line[1])
              this.cards[0].charts[1].data.push(line)
            })
            /* Data REACH - WIDTH */
            responses[3].data.forEach((reach) => {
              this.cards[1].charts[1].data.push([reach.id, reach.width])
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
        .get(`hru/daterange`)
        .then(async (resHru) => {
          await axios
            .get(`time/daterange/${resHru.data[0]}/${resHru.data[1]}`)
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
        .get(`hru/id/${id}`)
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
    resetValues() {
      this.loaded = false
      this.geoJsons = {}
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
      /* HRU - OVERALL */
      this.cards[0].charts[0].data = [
        [
          this.$t('dashboard.chart.day'),
          this.$t('dashboard.chart.rain'),
          this.$t('dashboard.chart.stored'),
        ],
      ]
      this.cards[0].charts[0].options.title = this.$t(
        'dashboard.chart.title.hruoverall'
      )
      this.cards[0].charts[0].options.legend = { position: 'top' }
      this.cards[0].charts[0].options.vAxis = { format: 'short' }
      this.cards[0].charts[0].options.series = {
        0: { targetAxisIndex: 0 },
        1: { targetAxisIndex: 1 },
      }
      this.cards[0].charts[0].options.vAxes = {
        0: { title: this.$t('dashboard.chart.rain') },
        1: { title: this.$t('dashboard.chart.stored') },
      }
      /* REACH - OVERALL */
      this.cards[1].charts[0].options.title = this.$t(
        'dashboard.chart.title.reachoverall'
      )
      this.cards[1].charts[0].data = [
        [
          this.$t('dashboard.chart.day'),
          this.$t('dashboard.chart.runoff'),
          this.$t('dashboard.chart.storedr'),
        ],
      ]
      this.cards[1].charts[0].options.legend = { position: 'top' }
      this.cards[1].charts[0].options.vAxis = { format: 'short' }
      this.cards[1].charts[0].options.isStacked = true
      /* HRU - SOIL */
      this.cards[0].charts[1].options.title = this.$t(
        'dashboard.chart.title.soil'
      )
      this.cards[0].charts[1].data = [
        [this.$t('dashboard.chart.type'), this.$t('dashboard.chart.quantity')],
      ]
      /* REACH - WIDTH */
      this.cards[1].charts[1].options.title = this.$t(
        'dashboard.chart.title.width'
      )
      this.cards[1].charts[1].data = [['id', 'width']]
      this.cards[1].charts[1].options.legend = { position: 'none' }
      this.cards[1].charts[1].options.histogram = {
        maxNumBuckets: 2,
        minNumBuckets: 2,
      }
    },
    removeDuplicates(array) {
      return array.filter((a, b) => array.indexOf(a) === b)
    },
    displayChart(cartKey, chartKey) {
      this.cards
        .filter((c) => c.key === cartKey)[0]
        .charts.forEach((chart) => {
          chart.key === chartKey
            ? (chart.display = true)
            : (chart.display = false)
        })
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
  margin: 1em 0 2em 0;
  padding: 0 5em;
}
#charts {
  margin-bottom: 2em;
}
#map {
  height: 79vh;
  min-height: 650px;
}
.card {
  margin-bottom: 0.8em;
}
.chart-button,
.chart-button:active,
.chart-button:hover,
.chart-button:focus {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
}
.slider.slider-horizontal {
  width: 100% !important;
}
.slider-tick {
  background-image: linear-gradient(
    to bottom,
    $basecolor-light 0%,
    $basecolor 100%
  );
}
</style>
