<template>
  <div class="container">
    <total-cost-filter />
    <div class="full-height chart-container">
      <bar-chart
        v-if="totalCostChart.status"
        :isCostPage="true"
      />
    </div>
  </div>
</template>

<script >
import TotalCostFilter from '../components/TotalCostFilter'
import BarChart from '../components/charts/BarChart'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TotalCost',
  components: {
    TotalCostFilter,
    BarChart
  },
  computed: {
    ...mapGetters('totalCostStore', ['totalCostChart'])
  },
  methods: {
    ...mapActions('userStore', ['changePage'])
  },
  created () {
    this.changePage('Custo Total')
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
