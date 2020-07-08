<template>
  <div>
    <b-carousel
      id="carousel-1"
      :controls="false"
      :indicators="false"
      :interval="4000"
      fade
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide
        v-for="pic in pictures"
        :key="pic"
        :caption-html="`<h1 class='huge'>` + $t('appname') + `</h1>`"
        :text="$t('radhy')"
      >
        <template v-slot:img
          ><img
            class="d-block img-fluid w-100"
            style="max-height: 58vh; object-fit: cover; filter: grayscale(10%);"
            :src="getImgUrl(pic)"
            height="900"
          />
        </template>
        <b-button
          class="m-1"
          size="lg"
          variant="primary"
          @click="goTo('dashboard')"
          ><font-awesome-icon class="mr-2" icon="chart-bar" />{{
            $t('go_to_dashboard')
          }}</b-button
        >
        <b-button size="lg" variant="light" @click="goTo('about')"
          ><font-awesome-icon class="mr-2" icon="question-circle" />{{
            $t('go_to_about')
          }}</b-button
        >
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pictures: ['buech1', 'buech2'],
    }
  },
  methods: {
    getImgUrl(key) {
      return require('@/static/buech/' + key + '.jpg')
    },
    goTo(route) {
      this.$router.push(this.localePath({ name: route }))
    },
  },
}
</script>
<style lang="scss">
.huge {
  font-size: 5em;
}
.carousel-caption > p {
  padding: 10px !important;
  border-radius: 4px !important;
  background-color: rgba(74, 91, 122, 0.6) !important;
}
</style>
