<template>
  <div>
    <total-cost-filter />
    <div class="container">
    <bar-chart
      title="Consumo"
      url="/graph/cost-consumption/?type=daily"
      unit="R$"
      class="chart"
      />
    </div>
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
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin-right: 0;
    margin-left: 0;
  }
  .chart {
    width: 55%;
  }
</style>
