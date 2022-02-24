<template>
  <q-no-ssr>
    <apexcharts
      id="chart"
      type="bar"
      :series="series"
      :options="chartOptions"
      height="170px"
      width="100%"/>
  </q-no-ssr>
</template>

<script>
import ChartService from '../../../services/masterApi/ChartService'

export default {
  name: 'ChargeBarChart',

  components: {
    Apexcharts: () => import('vue-apexcharts')
  },

  props: {
    selectedCampus: Object,
    selectedTransductor: Object
  },

  data () {
    return {
      min: 0,
      max: 5,
      dates: [],
      consumption: [],
      generation: [],
      measurements: [],
      transductorList: [],
      selectedPeriod: 'Hoje'
    }
  },

  computed: {
    series () {
      return [
        {
          name: 'Carga',
          data: this.consumption
        }
      ]
    },

    chartOptions () {
      return {
        title: {
          text: 'Carga no campus hoje',
          align: 'center',
          margin: 0,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: '24px',
            fontWeight: '',
            fontFamily: 'Roboto',
            color: '#ffffff'
          }
        },
        theme: {
          mode: 'dark'
        },
        chart: {
          type: 'bar',
          background: '#00101F',
          toolbar: {
            show: false
          }
        },
        xaxis: {
          tickPlacement: 'on',
          categories: [
            '0h',
            ' ',
            ' ',
            ' ',
            '4h',
            ' ',
            ' ',
            ' ',
            '8h',
            ' ',
            ' ',
            ' ',
            '12h',
            ' ',
            '',
            ' ',
            '16h',
            ' ',
            ' ',
            ' ',
            '20h',
            ' ',
            ' ',
            '23h'
          ],
          labels: {
            style: {
              fontSize: '14px'
            },
            rotate: -90
          }
        },
        dataLabels: {
          enabled: false
        },
        yaxis: {
          tickAmount: 4,
          title: {
            text: 'kW',
            style: {
              fontSize: '20px'
            }
          },
          labels: {
            formatter: (val) => {
              return `${val.toFixed(0) / 1000}`
            },
            style: {
              fontSize: '14px'
            }
          }
        },
        colors: ['#339CFF']
      }
    }
  },

  methods: {
    updateChart () {
<<<<<<< HEAD:src/components/charts/ChargeBarChart/ChargeBarChart.vue
      ChartService.getQuartelyDailyConsumption(this.selectedCampus.id)
=======
      ChartService.getQuartelyDailyConsumption()
>>>>>>> 08273da (#53 - 'ChargeBarChart' component refactoring):src/components/charts/ChargeBarChart.vue
        .then((res) => {
          this.consumption = res.data
        })
        .catch(err => {
          console.error(err)
        })
    }
  },

  mounted () {
    this.updateChart()
  }
}
</script>

<style scoped>
  @import './style.scss';
</style>
