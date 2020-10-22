<template>
  <q-no-ssr>
      <apexcharts type="bar" height="500" :options="chartConf" :series="series" />
  </q-no-ssr>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BarChart',
  components: {
    Apexcharts: () => import('vue-apexcharts')
  },
  props: [
    'unit'
  ],
  computed: {
    ...mapGetters('transductorStore', ['chartOptions']),
    series () {
      console.log('opt:', this.chartOptions)
      return [{
        name: this.chartOptions.dimension,
        data: this.chartOptions.values
      }]
    },
    chartConf () {
      return {
        colors: ['#00417e'],
        grid: {
          strokeDashArray: 0,
          xaxis: {
            type: 'datetime',
            show: true,
            labels: {
              style: {
                fontSize: '.8rem'
              }
            }
          }
        },
        title: {
          text: 'Column',
          align: 'left',
          style: {
            color: '#FFF'
          }
        },

        dataLabels: {
          enabled: false
        },

        xaxis: {
          type: 'datetime',
          show: true,
          labels: {
            datetimeUTC: false,
            style: {
              fontSize: '.8rem'
            }
          }
        },

        yaxis: {
          labels: {
            formatter: (val) => {
              if (this.chartOptions.unit === 'R$') {
                return this.chartOptions.unit + ' ' + val.toFixed(this.decimals || 0)
              }
              return val.toFixed(this.decimals || 0) + ' ' + this.chartOptions.unit
            },
            style: {
              fontSize: '1rem'
            }
          },
          min: this.min,
          max: this.max,
          decimalsInFloat: 2,
          tickAmount: 10
        },
        tooltip: {
          x: {
            format: 'dd-MM-yyyy HH:mm',
            formatter: undefined
          },
          y: {
            formatter: (val) => {
              if (this.chartOptions.unit === 'R$') {
                return ` ${this.chartOptions.unit} ${val.toFixed(1)}`
              }
              return `${val.toFixed(1)} ${this.chartOptions.unit}`
            }
          }
        }
      }
    }
  },
  data () {
    return {
      min: 0
    }
  },
  methods: {
    labelFormatter (value) {
      return this.unit + ' ' + value.toFixed(2)
    }
  }
}
</script>
