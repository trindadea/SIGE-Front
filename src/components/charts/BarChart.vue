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
    'isCostPage'
  ],
  computed: {
    ...mapGetters('transductorStore', ['chartOptions', 'filterOptions']),
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
      let filename
      if (this.$route.name === 'total_cost') {
        const endDate = this.getEndDate.match(/(?<year>\d+)-(?<month>\d+)-(?<day>\d+)/).groups
        const startDate = this.getStartDate.match(/(?<year>\d+)-(?<month>\d+)-(?<day>\d+)/).groups
        filename = this.getPage + ' - ' + startDate.day + '_' + startDate.month + '_' + startDate.year + '-' + endDate.day + '_' + endDate.month + '_' + endDate.year
      } else {
        filename = this.getPage + ' - ' + this.filterOptions.dimension + ' - ' + this.filterOptions.startDate + '-' + this.filterOptions.endDate
      }

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
              if (this.graph.unit === 'R$') {
                return this.graph.unit + ' ' + val.toFixed(this.decimals || 0)
              }
              return val.toFixed(this.decimals || 0) + ' ' + this.graph.unit
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
              if (this.graph.unit === 'R$') {
                return ` ${this.graph.unit} ${val.toFixed(1)}`
              }
              return `${val.toFixed(1)} ${this.graph.unit}`
            }
          }
        },
        chart: {
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
