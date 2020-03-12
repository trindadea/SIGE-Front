<template>
  <div>
    <chart-filter
      filterLabel="Dimensão"
      :filterList="dimensions"
      :visionOptions="vision"
      :transductorId="transductorId"
    />
    <line-chart
      v-if="graphIsLinechart()"
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
import LineChart from '../charts/LineChartPresentation.vue'
import noDataPlaceholder from '../charts/noDataPlaceholder.vue'
import { dimensions } from '../../utils/transductorGraphControl'

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
      ]
    }
  },
  methods: {
    graphIsLinechart () {
      let type = this.$store.getters.chartOptions.graphType
      console.log(type)
      return type === 'linechart'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
