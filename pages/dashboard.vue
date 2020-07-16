<template>
  <div id="dashboard">
    <div id="map">
      <client-only>
        <l-map v-if="geoJsons" :zoom="13" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-geo-json
            v-for="geoJson in geoJsons"
            :key="geoJson.row.id + geoJson.row.time_id"
            :geojson="geoJson.row"
            :options="{}"
          ></l-geo-json>
        </l-map>
      </client-only>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: [44.556817134, 5.640635221],
      geoJsons: null,
    }
  },
  async created() {
    await this.getShapes(13129)
    // await this.getOneShape(1)
  },
  methods: {
    async getShapes(time) {
      await axios
        .get(`http://127.0.0.1:3333/api/hru/time/${time}`)
        .then((res) => {
          console.log(res.data)
          this.geoJsons = res.data
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
  height: 90vh;
}
#geo-vis {
}
#map {
  height: 600px;
}
</style>
