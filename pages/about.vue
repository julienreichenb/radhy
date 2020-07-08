<template>
  <div id="about">
    <div class="text-center">
      <Logo />
    </div>
    <b-card
      v-for="section in sections"
      :key="section.key"
      header-bg-variant="dark"
      header-text-variant="white"
      header-class="font-weight-bold"
      class="border-top-0 border-right-0 border-left-0 mt-4"
    >
      <template v-slot:header>
        <b-row align-h="between" class="m-auto">
          <h5 v-html="getTxt(section.key + '.header')" />
          <font-awesome-layers class="fa-2x">
            <font-awesome-icon
              icon="circle"
              :style="{ color: section.color }"
            />
            <font-awesome-icon icon="circle" transform="shrink-1" />
            <font-awesome-icon
              :icon="section.icon"
              transform="shrink-7"
              :style="{ color: section.color }"
            />
          </font-awesome-layers>
        </b-row>
      </template>
      <b-card-text v-html="getTxt(section.key + '.content')" />
    </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sections: [
        { key: 'overview', icon: 'bullseye', color: '#cc2e23' },
        { key: 'modeling', icon: 'layer-group', color: '#4d9feb' },
        { key: 'visualisations', icon: 'chart-bar', color: '#373e45' },
        { key: 'thanks', icon: ['far', 'hand-point-left'], color: '#2ea63c' },
      ],
    }
  },
  methods: {
    getTxt(key) {
      return this.$t('about.' + key)
    },
  },
  head() {
    return {
      title: this.$t('head.about'),
      meta: [
        {
          hid: 'about',
        },
      ],
    }
  },
}
</script>
<style scoped lang="scss">
#about {
  margin: 1em 10em 3em 10em;
}
</style>
