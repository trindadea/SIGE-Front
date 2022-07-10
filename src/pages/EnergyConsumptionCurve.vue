<template>
  <div class="container">
    <ConsumptionFilter />
    <div class="full-height chart-container">
      <line-chart
        unit="Wh"
        chart-title="Curva de carga"
        :exportOptions="exportOptions"
      />
    </div>
  </div>
</template>

<script >
import ConsumptionFilter from '../components/ConsumptionFilter/ConsumptionFilter.vue'
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
    ...mapGetters('consumptionCurve', ['getUrl', 'getFilters']),
    exportOptions () {
      let startDate
      let endDate
      try {
        startDate = this.getFilters.startDate.match(/(?<year>\d+)-(?<month>\d+)-(?<day>\d+)/).groups
        endDate = this.getFilters.endDate.match(/(?<year>\d+)-(?<month>\d+)-(?<day>\d+)/).groups
      } catch (e) {
        endDate = startDate = {
          day: null,
          month: null,
          year: null
        }
      }
      return {
        location: this.location.campus ? (this.location.campus + (this.location.group ? ' - ' + this.location.group : '')) : '',
        dimension: 'Curva de Carga',
        startDate: startDate.day + '_' + startDate.month + '_' + startDate.year,
        endDate: endDate.day + '_' + endDate.month + '_' + endDate.year
      }
    }
  },
  methods: {
    ...mapActions('userStore', ['changePage'])
  },
  data () {
    return {
      location: {
        campus: '',
        group: ''
      }
    }
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
