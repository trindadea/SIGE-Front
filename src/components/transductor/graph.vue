<template>
  <div>
    <chart-filter
      filterLabel="Dimensão"
      :filterList="dimensions"
      :visionOptions="vision"
    />
    {{showInfo()}}
  </div>
</template>
<script>
import chartFilter from './chartFilter.vue'
export default {
  name: 'TransductorGraph',
  components: {
    chartFilter: chartFilter
  },
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
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
