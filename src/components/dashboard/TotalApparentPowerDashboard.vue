<template>
  <q-page>
    <linechart
      title="Potência aparente total"
      url="minutely_total_apparent_power"
      y_min="300"
      y_max="600"
      graphic_type="1"
      :show_legend="false"/>

  </q-page>
</template>

<script>
import LineChart from 'components/charts/LineChart.vue'

export default {
  components: {
    linechart: LineChart
  }
}
</script>

<style>

</style>
