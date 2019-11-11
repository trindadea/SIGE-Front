<template>
  <bar-chart
    title="Consumo"
    url="quarterly_consumption_off_peak"
    y_min="0"
    y_max="0"
    graphic_type="1"/>
</template>

<script>
import BarChart from 'components/charts/BarChart.vue'

export default {
  components: {
    BarChart
  }
}

</script>

<style>

</style>
