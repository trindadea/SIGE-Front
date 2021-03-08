<template>
  <div class="container">
    <ConsumptionFilter />
    <div class="full-height chart-container">
      <line-chart
        unit="Wh"
        chart-title="Curva de carga"
      />
    </div>
  </div>
</template>

<script >
import ConsumptionFilter from '../components/ConsumptionFilter'
// import BarChart from '../components/charts/BarChart'
import LineChart from '../components/charts/LineChartConsumption.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EnergyConsumptionCurve',
  components: {
    ConsumptionFilter,
    LineChart
  },
  computed: {
    ...mapGetters('consumptionCurve', ['getUrl'])
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
