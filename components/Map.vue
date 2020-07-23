<template>
  <div>
    <client-only v-if="geo">
      <b-row class="text-center">
        <b-col v-for="option in show" :key="option.key">
          <b-form-checkbox
            :id="option.key"
            v-model="option.active"
            :name="option.key"
          >
            <span>{{ $t('dashboard.map.options.' + option.key) }}</span>
          </b-form-checkbox>
        </b-col>
      </b-row>
      <l-map ref="map" :zoom="zoom" :center="center">
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
          :options="optionsReach"
          :geojson="geo.reach"
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
  },
  data() {
    return {
      url:
        'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: [44.456817134, 5.740635221],
      zoom: 10,
      show: [
        {
          key: 'tooltip',
          active: true,
        },
        { key: 'stored', active: true },
        { key: 'rain', active: true },
        { key: 'reach', active: true },
      ],
      max: {},
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
        const color =
          'rgba(23, 27, 84,' +
          this.getScale(feature.properties.stored, this.max.hruStored) / 5 +
          ')'
        return {
          color,
          fillColor: color,
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
          weight: this.getScale(feature.properties.rain, this.max.rain) * 0.5,
          opacity: 0.3,
          fillOpacity: 0,
        }
      }
    },
    styleOptionsReach() {
      return (feature) => {
        return {
          color: `rgba(0, 166, 255, ${(
            this.getScale(feature.properties.stored, this.max.reachStored) / 10
          ).toString()})`,
          weight: this.getScale(
            feature.properties.runoff,
            this.max.runoff / 0.05
          ),
          opacity: 0.8,
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
            Math.round(feature.properties.stored) +
            ' L' +
            '</p><p><b>' +
            this.$t('dashboard.map.tooltip.rain') +
            '</b> : ' +
            Math.round(feature.properties.rain) +
            ' L' +
            '</p><p><b>' +
            this.$t('dashboard.map.tooltip.snow') +
            '</b> : ' +
            Math.round(feature.properties.snow) +
            ' L' +
            '</p><p><b>' +
            this.$t('dashboard.map.tooltip.elevation') +
            '</b> : ' +
            Math.round(feature.properties.elevation) +
            'm' +
            '</p></div>',
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
            Math.round(feature.properties.stored) +
            ' L' +
            '</p><p><b>' +
            this.$t('dashboard.map.tooltip.runoff') +
            '</b> : ' +
            Math.round(feature.properties.runoff) +
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
  created() {
    this.computeMax()
  },
  methods: {
    recenter() {
      this.$refs.map.mapObject.setView(
        new this.$L.LatLng(this.center[0], this.center[1]),
        this.zoom
      )
    },
    computeMax() {
      this.max.hruStored = Math.max.apply(
        Math,
        this.geo.hru.map(function (o) {
          return o.properties.stored
        })
      )
      this.max.rain = Math.max.apply(
        Math,
        this.geo.hru.map(function (o) {
          return o.properties.rain
        })
      )
      this.max.reachStored = Math.max.apply(
        Math,
        this.geo.reach.map(function (o) {
          return o.properties.stored
        })
      )
      this.max.runoff = Math.max.apply(
        Math,
        this.geo.reach.map(function (o) {
          return o.properties.runoff
        })
      )
    },
    getScale(line, max) {
      return (line * 100) / max
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
</style>
