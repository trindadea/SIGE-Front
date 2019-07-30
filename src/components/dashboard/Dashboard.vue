<template>
  <div>
    <triphasic-chart
      :series="[{name: 'High - 2013',data: [28, 29, 33, 36, 32, 32, 33]},{name: 'Mid - 2013',data: [20, 26, 22, 29, 22, 23, 30]},{name: 'Low - 2013',data: [12, 11, 14, 18, 17, 13, 13]}]"
      :xaxis="{categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],title: {text: 'Month'}}"
      :yaxis="{title: {text: 'Temperature'}, min: 5, max: 40}"
      :yannotation="[{
              y: 33,
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  color: '#fff',
                  background: '#00E396',
                },
                text: 'Support',
              }
            }]"/>
    <router-view></router-view>
  </div>
</template>

<script>
import TriphasicChart from 'components/charts/TriphasicChart.vue'
export default {
  components: {
    TriphasicChart
  },

  data () {
    return {}
  }
}
</script>

<style>
</style>
