<template>
  <q-page>
      <linechart
      title="Current"
      url="minutely_threephase_current"
      y_min="0"
      y_max="250"
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
