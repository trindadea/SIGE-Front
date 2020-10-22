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
          categories: this.chartOptions.labels
        },

        yaxis: {
          min: 0,
          labels: {
            formatter: this.labelFormatter,
            style: {
              fontSize: '1rem'
            }
          },
          tickAmount: 10
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
