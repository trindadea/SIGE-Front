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
import chartFilter from './chartFilter.vue'
import LineChart from './LineChart.vue'
import noDataPlaceholder from './noDataPlaceholder.vue'
import { dimensions, getGraph } from '../../utils/transductorGraphControl'

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
  async created () {
    let filter = {
      ...this.$store.getters.filterOptions,
      transductor: this.transductorId
    }
    let graphOpt = await getGraph(filter)
    await this.$store.commit('updateFilter', filter)
    await this.$store.commit('updateChartPhase', graphOpt)
    this.mounted = true
  },
  methods: {
    graphIsLinechart () {
      let type = this.$store.getters.chartOptions.graphType
      return type === 'linechart'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
