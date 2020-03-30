<template>
  <q-page>
    <linechart
      title="Tension"
      url="minutely_threephase_voltage"
      y_min="200"
      y_max="230"
      graphic_type="3"/>

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
