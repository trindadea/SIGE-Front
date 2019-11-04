<template>
  <linechart
    title="Current"
    url="threephase_current"
    y_min="0"
    y_max="250"
    graphic_type="3"/>
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
