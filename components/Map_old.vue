<template>
  <div>
    <client-only v-if="geo">
      <l-map ref="map" :zoom="zoom" :center="center">
        <l-control class="options-control" position="bottomleft">
          <b-row>
            <b-col v-for="option in show" :key="option.key" md="6">
              <b-form-checkbox
                :id="option.key"
                v-model="option.active"
                :name="option.key"
              >
                <span>{{ $t('dashboard.map.options.' + option.key) }}</span>
              </b-form-checkbox>
            </b-col>
          </b-row>
        </l-control>
        <l-control>
          <b-button id="infoButton" v-b-modal.info-map class="map-button">
            <font-awesome-layers class="fa-3x">
              <font-awesome-icon icon="circle" class="text-white" />
              <font-awesome-icon
                icon="circle"
                transform="shrink-1"
                :style="{ color: '#546f9f' }"
              />
              <font-awesome-icon
                icon="question"
                transform="shrink-7"
                class="text-white"
              />
            </font-awesome-layers> </b-button
          ><b-button id="recenterButton" class="map-button" @click="recenter()">
            <font-awesome-layers class="fa-3x">
              <font-awesome-icon icon="circle" :style="{ color: '#546f9f' }" />
              <font-awesome-icon
                class="text-white"
                icon="circle"
                transform="shrink-1"
              />
              <font-awesome-icon
                icon="crosshairs"
                transform="shrink-7"
                :style="{ color: '#546f9f' }"
              />
            </font-awesome-layers>
          </b-button>
          <b-button
            v-if="!playing"
            id="playButton"
            class="map-button ml-3"
            :disabled="!playable"
            @click="play()"
          >
            <font-awesome-layers class="fa-3x">
              <font-awesome-icon icon="circle" :style="{ color: '#6B8E23' }" />
              <font-awesome-icon
                class="text-white"
                icon="circle"
                transform="shrink-1"
              />
              <font-awesome-icon
                icon="play"
                transform="shrink-7"
                :style="{ color: '#6B8E23' }"
              />
            </font-awesome-layers>
          </b-button>
          <b-button
            v-else
            id="stopButton"
            class="map-button ml-3"
            @click="stop()"
          >
            <font-awesome-layers class="fa-3x">
              <font-awesome-icon icon="circle" :style="{ color: 'darkred' }" />
              <font-awesome-icon
                class="text-white"
                icon="circle"
                transform="shrink-1"
              />
              <font-awesome-icon
                icon="stop"
                transform="shrink-7"
                :style="{ color: 'darkred' }"
              />
            </font-awesome-layers>
          </b-button>
        </l-control>
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-geo-json
          v-if="show[2].active"
          :geojson="geo.hru"
          :options-style="styleOptionsRain"
        ></l-geo-json>
        <l-geo-json
          v-if="show[1].active"
          :geojson="geo.hru"
          :options="optionsHruStored"
          :options-style="styleOptionsHruStored"
        ></l-geo-json>
        <l-geo-json
          v-if="show[3].active"
          :geojson="geo.reach"
          :options="optionsReach"
          :options-style="styleOptionsReach"
        ></l-geo-json>
      </l-map>
    </client-only>
    <b-modal
      id="info-map"
      size="lg"
      centered
      ok-only
      header-bg-variant="primary"
      header-text-variant="white"
      :title="$t('dashboard.map.modal.title')"
    >
      <p class="my-4" v-html="$t('dashboard.map.modal.text')" />
    </b-modal>
    <b-tooltip
      target="recenterButton"
      triggers="hover"
      placement="bottomleft"
      >{{ $t('dashboard.map.tooltip.recenter') }}</b-tooltip
    >
  </div></template
>
<script>
export default {
  props: {
    geo: { type: Object, required: true },
    playing: { type: Boolean, default: false },
    playable: { type: Boolean, default: false },
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      center: [44.430817134, 5.760635221],
      zoom: 10,
      hruGradient: [
        'rgba(255, 0, 0, .6)',
        'rgba(227, 28, 0, .6)',
        'rgba(199, 56, 0, .6)',
        'rgba(171, 84, 0, .6)',
        'rgba(143, 112, 0, .6)',
        'rgba(115, 140, 0, .6)',
        'rgba(87, 168, 0, .6)',
        'rgba(59, 196, 0, .6)',
        'rgba(31, 224, 0, .6)',
        'rgba(0, 255, 0, .6)',
      ],
      show: [
        {
          key: 'tooltip',
          active: false,
        },
        { key: 'stored', active: true },
        { key: 'rain', active: false },
        { key: 'reach', active: true },
      ],
    }
  },
  computed: {
    optionsHruStored() {
      return {
        onEachFeature: this.optionFunctionHruStored,
      }
    },
    optionsReach() {
      return {
        onEachFeature: this.optionFunctionReach,
      }
    },
    styleOptionsHruStored() {
      return (feature) => {
        return {
          color: 'transparent',
          fillColor: this.hruGradient[feature.option.fillcolor],
          opacity: 0.8,
          fillOpacity: 1,
          weight: 0.5,
        }
      }
    },
    styleOptionsRain() {
      return (feature) => {
        return {
          color: '#668dcc',
          weight: feature.option.weight,
          opacity: 0.3,
          fillOpacity: 0,
        }
      }
    },
    styleOptionsReach() {
      return (feature) => {
        return {
          color: `rgba(0, 166, 255, ${feature.option.color})`,
          weight: feature.option.weight * 1.2,
          opacity: 1,
        }
      }
    },
    optionFunctionHruStored() {
      if (!this.show[0].active) {
        return () => {}
      }
      return (feature, layer) => {
        layer.bindTooltip(
          '<div><p><b>' +
            this.$t('dashboard.map.tooltip.stored') +
            '</b> : ' +
            Math.round(feature.properties.stored).toLocaleString('de-CH') +
            ' L' +
            '</p><p><b>' +
            this.$t('dashboard.map.tooltip.rain') +
            '</b> : ' +
            Math.round(feature.properties.rain).toLocaleString('de-CH') +
            ' L' +
            '</p><p><b>' +
            this.$t('dashboard.map.tooltip.snow') +
            '</b> : ' +
            Math.round(feature.properties.snow).toLocaleString('de-CH') +
            ' L' +
            '</p><p><b>' +
            this.$t('dashboard.map.tooltip.elevation') +
            '</b> : ' +
            Math.round(feature.properties.elevation) +
            'm' +
            '</p><hr><p><b>' +
            this.$t('dashboard.map.tooltip.composition') +
            '</b>' +
            this.getProportionLabel(feature) +
            '</div>',
          {
            permanent: false,
            sticky: true,
          }
        )
      }
    },
    optionFunctionReach() {
      if (!this.show[0].active) {
        return () => {}
      }
      return (feature, layer) => {
        layer.bindTooltip(
          '<div><p><b>' +
            this.$t('dashboard.map.tooltip.width') +
            '</b> : ' +
            feature.properties.width +
            'm' +
            '</p><p><b>' +
            this.$t('dashboard.map.tooltip.storedReach') +
            '</b> : ' +
            Math.round(feature.properties.stored).toLocaleString('de-CH') +
            ' L' +
            '</p><p><b>' +
            this.$t('dashboard.map.tooltip.runoff') +
            '</b> : ' +
            Math.round(feature.properties.runoff).toLocaleString('de-CH') +
            ' L' +
            '</p></div>',
          {
            permanent: false,
            sticky: true,
          }
        )
      }
    },
  },
  methods: {
    recenter() {
      this.$refs.map.mapObject.setView(
        new this.$L.LatLng(this.center[0], this.center[1]),
        this.zoom
      )
    },
    play() {
      this.show[0].active = false
      this.$emit('play')
    },
    stop() {
      this.$emit('stop')
    },
    getProportionLabel(feature) {
      if (
        !feature.properties.argile ||
        !feature.properties.sable ||
        !feature.properties.limon
      )
        return '<p>' + this.$t('dashboard.chart.unknown') + '</p>'
      const total =
        feature.properties.argile +
        feature.properties.sable +
        feature.properties.limon
      return (
        '<p>' +
        this.$t('dashboard.chart.argile') +
        ' ' +
        ((feature.properties.argile * 100) / total).toFixed(1) +
        '%</p><p>' +
        this.$t('dashboard.chart.sable') +
        ' ' +
        ((feature.properties.sable * 100) / total).toFixed(1) +
        '%</p><p>' +
        this.$t('dashboard.chart.limon') +
        ' ' +
        ((feature.properties.limon * 100) / total).toFixed(1) +
        '%</p>'
      )
    },
  },
}
</script>
<style lang="scss">
.map-button,
.map-button:active,
.map-button:hover,
.map-button:focus {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
}

.map-button.disabled {
  background: transparent;
  opacity: 0.8;

  svg:first-child,
  svg:last-child {
    color: gray !important;
  }
}

#info-map span {
  font-weight: bold;
}
.hru-area {
  color: rgb(23, 27, 84);
}
.reach-vector {
  color: rgb(0, 166, 255);
}
.water-circle {
  color: #668dcc;
}
.leaflet-tooltip p {
  margin: 0.2em 0;
}
.options-control {
  background-color: rgba(230, 230, 230, 0.7);
  border: 1px solid $basecolor-dark;
  border-radius: 3px;
  padding: 5px;
  margin: 5px;
  z-index: 104000;
}
</style>
