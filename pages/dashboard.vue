<template>
  <div id="dashboard">
    <b-row class="mb-3 border-bottom">
      <b-col sm="12" md="3" lg="2" class="pt-3">
        <h6>{{ $t('dashboard.picker') }}</h6>
        <date-picker
          v-model="datepicker.value"
          :clear-option="datepicker.clearOption"
          :min="datepicker.min"
          :max="datepicker.max"
          :date-format="datepicker.dateFormat"
          @selected="changeTimeRange"
        />
      </b-col>
      <b-col class="pt-3">
        <b-form-slider
          v-if="timeRange && timeRange[0] !== undefined"
          id="time-slider"
          :handle="'custom'"
          :min="timeRange && timeRange[0].id"
          :max="timeRange && timeRange[timeRange.length - 1].id"
          :value="selectedTime && selectedTime.id"
          :ticks="getTimeTicks()"
          :ticks-labels="timeLabels.map((t) => t.labelShort)"
          :formatter="(index) => timeLabels.find((l) => l.id === index).label"
          :tooltip="'always'"
          :tooltip-position="'top'"
          :step="timeRange && timeRange[1].id - timeRange[0].id"
          :enabled="selectedTime && selectedTime.loaded"
          @change="getData"
        />
      </b-col>
    </b-row>
    <b-row id="data" no-gutters>
      <b-col
        v-if="timeRange"
        md="12"
        lg="4"
        :class="
          selectedTime && selectedTime.loaded && timeRange[0] !== undefined
            ? 'mb-3'
            : 'my-auto'
        "
      >
        <div
          v-if="timeRange[0] === undefined"
          class="d-flex justify-content-center"
        >
          <h5 class="text-muted">{{ $t('dashboard.error') }}</h5>
        </div>
        <Map
          v-else-if="selectedTime && selectedTime.loaded"
          id="map"
          :geo="geoJsons"
          :playable="isPlayable"
          :playing="isPlaying"
          @play="play"
          @stop="stop"
        />
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
import moment from 'moment'
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
      timeLabels: null,
      datepicker: {
        value: null,
        min: null,
        max: null,
        dateFormat: 'MMMM YYYY',
        clearOption: false,
      },
      selectedTime: null,
      loaded: false,
      isPlaying: false,
      isPlayable: false,
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
    await this.getOverall()
    this.getAllData()
  },
  methods: {
    play() {
      this.isPlaying = true
      let timeIndex = 0
      // First iteration
      this.getData(this.timeRange[timeIndex].id)
      // Start play
      const playInterval = setInterval(() => {
        timeIndex++
        if (timeIndex >= this.timeRange.length || !this.isPlaying) {
          this.isPlaying = false
          clearInterval(playInterval)
        } else {
          this.getData(this.timeRange[timeIndex].id)
        }
      }, 2500)
    },
    stop() {
      this.isPlaying = false
    },
    areFirstLoaded(nb) {
      for (let i = 0; i <= nb && i < this.timeRange.length; i++) {
        if (!this.timeRange[i].loaded) return false
      }
      return true
    },
    getAllData() {
      this.loaded = false
      this.timeRange.forEach((t) => {
        t.data = { hru: null, reach: null }
        t.loaded = false
        this.loadBoth(t.id)
      })
    },
    getData(time) {
      this.resetValues()
      if (time.newValue) time = time.newValue
      this.selectedTime = this.timeRange.find((t) => t.id === time)
      this.geoJsons.hru = this.selectedTime.data.hru
      this.geoJsons.reach = this.selectedTime.data.reach
      this.loaded = true
    },
    loadBoth(time) {
      this.getHrus(time)
      this.getReaches(time)
    },
    async getHrus(time) {
      await axios
        .get(`hru/hrutime/${time}`)
        .then((res) => {
          const currentTime = this.timeRange.find((t) => t.id === time)
          currentTime.data.hru = res.data[0].data
          currentTime.loaded = true
          // Init map
          if (currentTime === this.timeRange[0]) {
            this.loaded = true
            this.getData(currentTime.id)
          }
          // Change isPlayable only if not already playable
          if (!this.isPlayable) this.isPlayable = this.areFirstLoaded(4)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getReaches(time) {
      await axios
        .get(`reach/reachtime/${time}`)
        .then((res) => {
          const currentTime = this.timeRange.find((t) => t.id === time)
          currentTime.data.reach = res.data[0].data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getOverall() {
      this.hideCharts()
      console.log(this.timeRange)
      try {
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
      } catch (err) {
        console.log(err)
      }
    },
    async getAvailableTimeRange() {
      await axios
        .get(`hru/daterange`)
        .then(async (resHru) => {
          await axios
            .get(`time/daterange/${resHru.data[0]}/${resHru.data[1]}`)
            .then((res) => {
              console.log(res)
              this.availableTimeRange = res.data
              const max = this.setPickerOptions()
              // Initial values
              this.timeRange = this.availableTimeRange.filter(
                (d) => d.year === max.year && d.month === max.month
              )
              this.getTimeLabels()
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setPickerOptions() {
      const maxY = Math.max.apply(
        Math,
        this.availableTimeRange.map((o) => {
          return o.year
        })
      )
      const maxM = Math.max.apply(
        Math,
        this.availableTimeRange
          .filter((d) => d.year === maxY)
          .map((o) => {
            return o.month
          })
      )
      this.datepicker.max = moment(maxY + '-' + maxM + '-01').locale(
        this.$i18n.locale
      )
      const minY = Math.min.apply(
        Math,
        this.availableTimeRange.map((o) => {
          return o.year
        })
      )
      const minM = Math.min.apply(
        Math,
        this.availableTimeRange
          .filter((d) => d.year === minY)
          .map((o) => {
            return o.month
          })
      )
      this.datepicker.min = moment(minY + '-' + minM + '-01').locale(
        this.$i18n.locale
      )
      this.datepicker.value = this.datepicker.max // Initialize at the last available date
      return {
        month: maxM,
        year: maxY,
      }
    },
    async changeTimeRange(value) {
      // Set current TimeRange
      this.timeRange = await this.availableTimeRange.filter(
        (r) => r.year === value.year() && r.month === value.month() + 1
      )
      this.getTimeLabels()
      // Reload data
      await this.getOverall()
      this.getAllData()
    },
    getText(key, isTitle) {
      return isTitle
        ? this.$t('dashboard.' + key + '.title')
        : this.$t('dashboard.' + key + '.text')
    },
    resetValues() {
      this.loaded = false
      this.selectedTime = null
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
        const formattedDate = moment(
          date.year + '-' + date.month + '-' + date.day
        )
          .locale(this.$i18n.locale)
          .format('Do MMMM YYYY')
        const formattedShort = moment(
          date.year + '-' + date.month + '-' + date.day
        )
          .locale(this.$i18n.locale)
          .format('D MMM YY')
        labels.push({
          id: date.id,
          label: formattedDate,
          labelShort: formattedShort,
        })
      })
      this.timeLabels = labels
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

#time-slider {
  width: 100%;
  margin: 1.5em 0 2em 0;
  padding: 0 2.8em 0 2.5em;

  @media (max-width: 768px) {
    padding: 0 1em 0 1em;
  }

  .slider.slider-horizontal {
    width: 100% !important;
  }

  .tooltip.in {
    opacity: 1;
    font-size: 1em;

    @media (max-width: 768px) {
      font-size: 0.7em;
    }
  }

  .tooltip-inner {
    background: $basecolor-dark !important;
  }

  .slider-selection {
    background: transparent;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: none;
  }

  .slider-tick.in-selection {
    background: transparent !important;
    color: $basecolor !important;
  }

  .slider-handle.custom::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900 !important;
    content: '\f783';
    line-height: 20px;
    font-size: 20px;
    color: $basecolor-dark;
    padding: 4px;
    background: white;
    z-index: 50;
    border-radius: 100px;
    border: 1px solid $basecolor-light;
  }

  .slider-tick.custom::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900 !important;
    content: '\f783';
    padding: 4px;
    line-height: 20px;
    font-size: 20px;
    color: $basecolor;
  }

  .slider-tick-label {
    font-size: 0.7em;
    opacity: 0;

    @media (min-width: 1200px) {
      &:nth-child(odd) {
        opacity: 1;
      }
    }

    @media (max-width: 1200px) {
      &:nth-child(3n + 1) {
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      &:nth-child(4n + 1) {
        opacity: 1;
      }
    }
  }
}

.vue-monthly-picker {
  .date-popover {
    z-index: 90000 !important;
  }

  .item.active {
    font-weight: bold;
  }
}
</style>
