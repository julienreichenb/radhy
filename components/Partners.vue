<template>
  <div id="partners" class="text-center mt-3">
    <h2 class="subtitle">{{ $t('partners.title') }}</h2>
    <b-row class="border-top">
      <b-col
        v-for="partner in partners"
        :key="partner"
        class="ml-1 mr-1 mt-4 my-auto"
      >
        <a :href="$t('partners.' + partner + '.url')">
          <img :src="getImgUrl(partner)" width="80%" :alt="partner" />
        </a>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      partners: ['eaurmc', 'geau', 'inrae', 'zabr', 'umrespace', 'hes'],
    }
  },
  methods: {
    getImgUrl(key) {
      return require('@/static/partners/' + key + '.jpg')
    },
  },
}
</script>
<style lang="scss" scoped>
#partners {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 2em;
  padding: 0 50px;
}
</style>
