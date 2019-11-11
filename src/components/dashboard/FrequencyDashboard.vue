<template>
  <linechart
    title="Frequency"
    url="minutely_frequency"
    y_min="30"
    y_max="70"
    graphic_type="1"/>
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
