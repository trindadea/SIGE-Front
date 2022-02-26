<template>
  <q-no-ssr>
      <chart-container v-bind:loadingStatus="getChartLoadingStatus">
        <apexcharts v-if="getSerie && getGraphNotEmpty" type="line" height="500" :options="chartConf" :series="getSerie" />
        <div v-if="!getGraphNotEmpty && !getChartLoadingStatus" class="no-data-warning">
          <span>
            Não há dados disponiveis no momento!
          </span>
        </div>
      </chart-container>
  </q-no-ssr>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ChartContainer from './ChartContainer.vue'

export default {
  name: 'LineChart',
  components: {
    Apexcharts: () => import('vue-apexcharts'),
    ChartContainer
  },
  props: [
    'unit',
    'chartTitle',
    'exportOptions'
  ],
  computed: {
    ...mapGetters('consumptionCurve', ['getSerie', 'getFilters', 'getTypeXAxis', 'getGraphNotEmpty', 'getPeriodicity', 'getStartDate', 'getEndDate', 'getChartLoadingStatus']),
    chartConf () {
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
          labels: {
            datetimeUTC: false,
            show: true,
            style: {
              colors: [],
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label'
            }
          }
        },
        yaxis: {
          labels: {
            formatter: this.labelFormatter,
            style: {
              fontSize: '1rem'
            }
          },
          tickAmount: 10
        },
        tooltip: {
          x: {
            format: 'dd-MM-yyyy HH:mm',
            formatter: undefined
          },
          y: {
            formatter: (val) => {
              return `${val.toFixed(1)} ${this.unit}`
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
  },
  data () {
    return {
      min: 0
    }
  },
  methods: {
    ...mapActions('consumptionCurve', ['updateChartSerie']),
    labelFormatter (value) {
      return value + ' ' + this.unit
    }
  },
  created () {}
}
</script>

<style lang="scss">
    .no-data-warning {
      width: 100%;
      min-height: 500px;
      display:flex;
      justify-content: center;
      align-items: center;

      span {
        font-family: Roboto;
        color: #00417e;
        font-size: 2.4vh;
        font-weight: bold;
      }
    }
</style>
