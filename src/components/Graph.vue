<template>
  <div>
    <chart-filter
      filterLabel="Dimensão"
      :filterList="dimensions"
      :visionOptions="vision"
      :transductorId="transductorId"
    />
    <line-chart
      v-if="graphIsLinechart() && mounted"
      :transductorId='transductorId'
    />
    <no-data-placeholder
      v-else
      style="padding: 1.5em;"
      info="Para visualizar os dados é necessária a seleção de uma dimensão,
        assim como um intervalo de dados."
      />
  </div>
</template>
<script>
import chartFilter from './ChartFilter'
import LineChart from './charts/LineChart.vue'
import noDataPlaceholder from './NoDataPlaceHolder'
import { dimensions, getGraph } from '../utils/transductorGraphControl'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TransductorGraph',
  components: {
    chartFilter: chartFilter,
    LineChart: LineChart,
    noDataPlaceholder: noDataPlaceholder
  },
  props: [
    'transductorId'
  ],
  data () {
    return {
      dimensions: dimensions,
      vision: [
        { label: 'Hora', value: 'hour' },
        { label: 'Dia', value: 'day' }
      ],
      mounted: false
    }
  },
  computed: {
    ...mapGetters('transductorStore', ['filterOptions', 'chartOptions'])
  },
  async created () {
    const filter = {
      ...this.filterOptions,
      transductor: this.transductorId
    }
    const graphOpt = await getGraph(filter)
    await this.updateFilter(filter)
    await this.updateChartPhase(graphOpt)
    this.mounted = true
  },
  methods: {
    ...mapActions('transductorStore', ['updateFilter', 'updateChartPhase']),
    graphIsLinechart () {
      const type = this.chartOptions.graphType
      return type === 'linechart'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
