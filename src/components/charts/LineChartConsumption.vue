<template>
  <q-no-ssr>
      <apexcharts v-if="getSerie && getGraphNotEmpty" type="line" height="500" :options="chartConf" :series="getSerie" />
      <div v-if="!getGraphNotEmpty" class="no-data-warning">
        <span>
          Não há dados disponiveis no momento!
        </span>
      </div>
  </q-no-ssr>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LineChart',
  components: {
    Apexcharts: () => import('vue-apexcharts')
  },
  props: [
    'unit',
    'exportOptions'
  ],
  computed: {
    ...mapGetters('consumptionCurve', ['getSerie', 'getFilters', 'getTypeXAxis', 'getGraphNotEmpty', 'getPeriodicity', 'getStartDate', 'getEndDate']),
    chartConf () {
      const filename = (this.exportOptions.location ? (this.exportOptions.location + ' - ') : ('')) +
      (this.exportOptions.dimension ? (this.exportOptions.dimension + ' - ') : ('')) + this.exportOptions.startDate + '-' + this.exportOptions.endDate

      return {
        colors: ['#00417e'],
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
          labels: {
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
        // {
        //   x: 18,
        //   x2: 21,
        //   fillColor: '#B3F7CA',
        //   label: {
        //     text: 'Horário de Ponta'
        //   }
        // }
        // ],
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
          y: {
            formatter: (val) => {
              return `${val.toFixed(1)} ${this.unit}`
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
      height: 60vh;
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
