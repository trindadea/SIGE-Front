<template>
  <chart-container  v-bind:loadingStatus="getPhaseChartLoadingStatus">
    <q-no-ssr>
        <apexcharts type="bar" height="500" :options="chartConf" :series="series" />
    </q-no-ssr>
  </chart-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartContainer from './ChartContainer.vue'

export default {
  name: 'BarChart',
  components: {
    Apexcharts: () => import('vue-apexcharts'),
    ChartContainer
  },
  props: [
    'isCostPage',
    'chartTitle',
    'exportOptions'
  ],
  computed: {
    ...mapGetters('transductorStore', ['chartOptions', 'filterOptions', 'getPhaseChartLoadingStatus']),
    ...mapGetters('totalCostStore', ['totalCostChart']),
    ...mapGetters('userStore', ['getPage']),
    ...mapGetters('totalCostStore', ['getStartDate', 'getEndDate']),
    graph () {
      if (this.isCostPage) {
        return this.totalCostChart
      }
      return this.chartOptions
    },
    series () {
      return [{
        name: this.graph.dimension,
        data: this.graph.values
      }]
    },
    chartConf () {
      const tick = this.graph.max <= 10 ? this.graph.max + 1 : 11
      const max = this.graph.max < 1 ? 1 : undefined
      const filename = (this.exportOptions.location ? (this.exportOptions.location + ' - ') : ('')) +
      (this.exportOptions.dimension ? (this.exportOptions.dimension + ' - ') : ('')) + this.exportOptions.startDate + '-' + this.exportOptions.endDate

      return {
        colors: ['#00417e'],

        title: {
          text: this.chartTitle,
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '24px',
            fontWeight: '300',
            fontFamily: 'Roboto',
            color: '#00417e'
          }
        },

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
              if (this.graph.unit === 'R$') {
                return this.graph.unit + ' ' + val.toFixed(this.decimals || 0)
              }
              return val.toFixed(this.decimals || 0) + ' ' + this.graph.unit
            },
            style: {
              fontSize: '1rem'
            }
          },
          max: max,
          decimalsInFloat: 2,
          tickAmount: tick
        },
        tooltip: {
          x: {
            format: 'dd-MM-yyyy HH:mm',
            formatter: undefined
          },
          y: {
            formatter: (val) => {
              if (this.graph.unit === 'R$') {
                return ` ${this.graph.unit} ${val.toFixed(1)}`
              }
              return `${val.toFixed(1)} ${this.graph.unit}`
            }
          }
        },

        chart: {
          stacked: false,
          toolbar: {
            export: {
              csv: {
                filename: filename
              },

              svg: {
                filename: filename
              },

              png: {
                filename: filename
              }
            }
          }
        }
      }
    }
  }
}
</script>
