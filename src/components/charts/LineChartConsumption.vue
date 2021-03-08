<template>
  <q-no-ssr>
      <apexcharts v-if="getSerie && getGraphNotEmpty" type="line" height="500" :options="chartOptions" :series="getSerie" />
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
    'chartTitle'
  ],
  data () {
    return {
      min: 0,
      chartOptions: {
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
          type: this.getTypeXAxis,
          labels: {
            show: true,
            formatter: this.labelFormatterX,
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
  computed: {
    ...mapGetters('consumptionCurve', ['getSerie', 'getFilters', 'getTypeXAxis', 'getGraphNotEmpty', 'getPeriodicity'])
  },
  methods: {
    ...mapActions('consumptionCurve', ['updateChartSerie']),
    labelFormatter (value) {
      return value.toFixed(2) + ' ' + this.unit
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
