<template>
  <div>
    <client-only v-if="geo">
      <l-map :zoom="10" :center="center">
        <b-button id="infoButton" v-b-modal.info-map>
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
          </font-awesome-layers>
        </b-button>
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-geo-json
          v-for="geoJson in geo.rain"
          :key="geoJson.key"
          :geojson="geoJson.row"
          :options="geoJson.option"
        ></l-geo-json>
        <l-geo-json
          v-for="geoJson in geo.hruStored"
          :key="geoJson.key"
          :geojson="geoJson.row"
          :options="geoJson.option"
        ></l-geo-json>
        <l-geo-json
          v-for="geoJson in geo.reach"
          :key="geoJson.key"
          :geojson="geoJson.row"
          :options="geoJson.option"
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
    </b-modal></div
></template>
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
      center: [44.416817134, 5.740635221],
    }
  },
}
</script>
<style lang="scss">
#infoButton {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 40000;
  background: transparent;
  border: none;
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
</style>
