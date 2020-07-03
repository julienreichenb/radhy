<template>
  <div id="dashboard">
    <GChart
      id="geo-vis"
      :settings="{
        packages: ['geochart'],
        mapsApiKey: 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY',
      }"
      type="GeoChart"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartData: [
        ['City', 'Population', 'Area'],
        ['Rome', 2761477, 1285.31],
        ['Milan', 1324110, 181.76],
        ['Naples', 959574, 117.27],
        ['Turin', 907563, 130.17],
        ['Palermo', 655875, 158.9],
        ['Genoa', 607906, 243.6],
        ['Bologna', 380181, 140.7],
        ['Florence', 371282, 102.41],
        ['Fiumicino', 67370, 213.44],
        ['Anzio', 52192, 43.43],
        ['Ciampino', 38262, 11],
      ],
      chartOptions: {
        region: 'IT',
        displayMode: 'markers',
        colorAxis: { colors: ['green', 'blue'] },
      },
    }
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
<style>
#dashboard {
  height: 90vh;
}
#geo-vis {
}
</style>
