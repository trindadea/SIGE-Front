<template>
  <div class="row">
    <line-chart
      class="col"
      :series="[{name: 'High - 2013',data: [28, 29, 33, 36, 32, 32, 33]},{name: 'Mid - 2013',data: [20, 26, 22, 29, 22, 23, 30]},{name: 'Low - 2013',data: [12, 11, 14, 18, 17, 13, 13]}]"
      :xaxis="{categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],title: {text: 'Month'}}"
      :yaxis="{title: {text: 'Temperature'}, min: 5, max: 40}"
      :yannotations="[{y: 37, y0: null, borderColor: '#ee9999', label: {text: 'Maximum'}},{y: 10, y0: null, borderColor: '#9999ee', label: {text: 'Minimum'}}]"
      title="Something triphasic"/>
    <line-chart
      class="col"
      :series="[{name: 'High - 2013',data: [28, 29, 33, 36, 32, 32, 33]}]"
      :xaxis="{categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],title: {text: 'Month'}}"
      :yaxis="{title: {text: 'Temperature'}, min: 20, max: 40}"
      :colors="['#eeeeee']"
      title="Something linear"/>
    <area-chart
      class="col"
      :series="[{name: 'High - 2013',data: [28, 29, 33, 36, 32, 32, 33]},{name: 'Mid - 2013',data: [20, 26, 22, 29, 22, 23, 30]},{name: 'Low - 2013',data: [12, 11, 14, 18, 17, 13, 13]}]"
      :xaxis="{categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],title: {text: 'Month'}}"
      :yaxis="{title: {text: 'Temperature'}, min: 5, max: 40}"
      :colors="['#9999ee','#9999ee','#9999ee']"
      title="Something triphasic"/>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import AreaChart from 'components/charts/AreaChart.vue'
import LineChart from 'components/charts/LineChart.vue'

export default {
  components: {
    LineChart,
    AreaChart
  },

  data () {
    return {}
  }
}
</script>

<style>
</style>
