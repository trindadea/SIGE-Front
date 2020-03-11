<template>
  <div>
    <chart-filter
      filterLabel="Dimensão"
      :filterList="dimensions"
      :visionOptions="vision"
    />
    <line-chart
      v-if="graphType() === 'linechart'"
      :transductorId='transductorId'
      :url='getUrl()'
      :startDate='getDate("startDate")'
      :endDate='getDate("endDate")'
      :unit="getUnit()"
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
      dimensions: [
        'Corrente',
        'Custo',
        'Consumo',
        'DHT Corrente',
        'DHT Tensão',
        'Energia Captativa',
        'Energia Indutiva',
        'Fator de Potência',
        'Geração',
        'Potência Aparente',
        'Potência Ativa',
        'Potência Reativa',
        'Tensão'
      ],
      vision: [
        { label: 'Hora', value: 'hour' },
        { label: 'Dia', value: 'day' }
      ]
    }
  },
  methods: {
    showInfo () {
      let filter = this.$store.state.transductorFilter
      return filter
    },
    getDate (date) {
      let dateString = this.$store.state.transductorFilter[date]
      if (dateString !== '') {
        let dateParts = dateString.split('/')
        let res = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' ' + '00:00:00'

        return res
      } else {
        return undefined
      }
    },
    graphType () {
      let dimension = this.$store.state.transductorFilter.dimension

      if (dimension === this.dimensions[0] || dimension === this.dimensions[3] ||
          dimension === this.dimensions[4] || dimension === this.dimensions[6] ||
          dimension === this.dimensions[7] || dimension === this.dimensions[9] ||
          dimension === this.dimensions[10] || dimension === this.dimensions[11] ||
          dimension === this.dimensions[12]) {
        return 'linechart'
      } else {
        return ''
      }
    },
    getUrl () {
      let dimension = this.$store.state.transductorFilter.dimension
      switch (dimension) {
        case this.dimensions[0]:
          return ''
        case this.dimensions[1]:
          return ''
        case this.dimensions[2]:
          return ''
        case this.dimensions[3]:
          return 'minutely-dht-current'
        case this.dimensions[4]:
          return 'minutely-dht-voltage'
        case this.dimensions[5]:
          return ''
        case this.dimensions[6]:
          return ''
        case this.dimensions[7]:
          return ''
        case this.dimensions[8]:
          return ''
        case this.dimensions[9]:
          return ''
        case this.dimensions[10]:
          return ''
        case this.dimensions[11]:
          return ''
        case this.dimensions[12]:
          return ''
        default:
          return ''
      }
    },
    getUnit () {
      let dimension = this.$store.state.transductorFilter.dimension
      if (dimension === this.dimensions[4]) {
        return 'V'
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
