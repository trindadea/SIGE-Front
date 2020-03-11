<template>
  <div>
    <total-cost-filter />
    <bar-chart
      title="Consumo"
      url="/graph/cost-consumption/?type=daily"/>
  </div>
</template>

<script>
import TotalCostFilter from '../components/transductors/totalCostFilter'
import BarChartPresentation from '../components/charts/BarChartPresentation'

export default {

  components: {
    TotalCostFilter: TotalCostFilter,
    BarChart: BarChartPresentation
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
