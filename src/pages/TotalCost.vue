<template>
  <div>
    <total-cost-filter/>
    <div class="container">
    <bar-chart
      title="Consumo"
      :url="getUrl"
      unit="R$"
      class="chart"
      />
    </div>
  </div>
</template>

<script>
import TotalCostFilter from '../components/transductors/totalCostFilter'
import BarChartPresentation from '../components/charts/BarChartPresentation'
import { mapGetters } from 'vuex'

export default {

  components: {
    TotalCostFilter: TotalCostFilter,
    BarChart: BarChartPresentation
  },
  data () {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters('totalCostStore', ['getUrl'])
  }
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
    height: 72vh;
  }
</style>
