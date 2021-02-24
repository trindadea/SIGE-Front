<template>
  <div class="container">
    <total-cost-filter />
    <div class="full-height chart-container">
      <bar-chart
        v-if="totalCostChart.status"
        :isCostPage="true"
        :exportOptions="exportOptions"
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
    ...mapGetters('totalCostStore', ['totalCostChart', 'getStartDate', 'getEndDate']),
    exportOptions () {
      const startDate = this.getStartDate.match(/(?<year>\d+)-(?<month>\d+)-(?<day>\d+)/).groups
      const endDate = this.getEndDate.match(/(?<year>\d+)-(?<month>\d+)-(?<day>\d+)/).groups
      return {
        location: '',
        dimension: 'Custo Total',
        startDate: startDate.day + '_' + startDate.month + '_' + startDate.year,
        endDate: endDate.day + '_' + endDate.month + '_' + endDate.year
      }
    }
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
