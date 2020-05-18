<template>
  <div class="container">
    <total-cost-filter />
    <div class="full-height chart-container">
      <line-chart
        unit="Wh"
      />
    </div>
  </div>
</template>

<script >
import TotalCostFilter from '../components/TotalCostFilter'
// import BarChart from '../components/charts/BarChart'
import LineChart from '../components/charts/LineChartConsumption'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EnergyConsumptionCurve',
  components: {
    TotalCostFilter,
    LineChart
  },
  computed: {
    ...mapGetters('totalCostStore', ['getUrl'])
  },
  methods: {
    ...mapActions('userStore', ['changePage'])
  },
  created () {
    this.changePage('Curva de Carga')
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .chart-container {
    width: 80%;
  }
</style>
