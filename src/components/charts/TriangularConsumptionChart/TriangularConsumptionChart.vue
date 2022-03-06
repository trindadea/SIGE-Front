<template>
  <div>
    <q-no-ssr>
    <apexcharts
      id='chart'
      :series="series"
      :options="chartOptions"
      class="q-pa-none"
      height="75"/>
    <!-- <p class="text-center vertical-top q-pa-none">
      {{ 800 }} kW
    </p> -->
  </q-no-ssr>
  </div>
</template>

<script>
import MASTER from '../../../services/masterApi/http-common'

export default {
  name: 'TriangularConsumptionChart',

  components: {
    Apexcharts: () => import('vue-apexcharts')
  },

  props: [
  ],

  data () {
    return {
      min: 0,
      max: 5,
      consumption: 0,
      contracted: 375
    }
  },

  computed: {
    series () {
      // return [
      //   {
      //     data: [0, this.consumption]
      //   }
      // ]

      return [
        {
          data: [0, 500]
        }
      ]
    },

    chartOptions () {
      return {
        annotations: {
          yaxis: [
            {
              y: this.contracted /* Valor da demanda contratada */,
              strokeDashArray: 6,
              borderColor: '#ff0',
              label: {
                borderWidth: 0,
                text: '$',
                textAnchor: 'center',
                position: 'left',
                offsetX: 0,
                offsetY: 0,
                style: {
                  background: '#00101F',
                  color: '#ff0',
                  fontSize: '14px',
                  padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                  }
                }
              }
            }
          ]
        },

        chart: {
          type: 'area',
          // height: 96,
          // width: 174,
          background: '#00101F',
          toolbar: {
            show: false
          }
        },

        dataLabels: {
          enabled: false
        },

        fill: {
          opacity: 1,
          colors: ['#339CFF'],
          gradient: {
            type: 'horizontal',
            shadeIntensity: 1,
            gradientToColors: ['#f00'],
            opacityFrom: 1,
            opacityTo: 1,
            stops: [
              this.contracted * 100 / this.series[0].data[1],
              this.contracted * 100 / this.series[0].data[1]
            ] /* Porcentagem da demanda contratada em relação à demanda real */
          }
        },

        grid: {
          show: true,
          borderColor: '#00101F'
        },

        legend: {
          show: false
        },

        stroke: {
          curve: 'straight',
          show: false
        },

        theme: {
          mode: 'dark'
        },

        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },

        yaxis: {
          show: false,
          tickAmount: 2,
          axisBorder: {
            show: false
          }
        }
      }
    }
  },

  methods: {
    updateChart () {
      if (this.selectedTransductor !== undefined) {
        const consumption = [
          '/graph/quarterly-consumption-off-peak/?start_date=2019-06-01 00:00&end_date=2019-06-30 23:59',
          '/graph/quarterly-consumption-peak/?start_date=2019-06-01 00:00&end_date=2019-06-30 23:59'
        ]

        MASTER.all([
          MASTER.get(consumption[0]),
          MASTER.get(consumption[1])
        ])
          .then(MASTER.spread((consA, consB) => {
            this.consumption = [...consA.data, ...consB.data]
          }))
          .catch(errArray => {
            console.error(errArray)
          })
      }
    }
  },

  async beforeMount () {
    await this.updateChart()
  }
}
</script>

<style scoped>
<<<<<<< HEAD:src/components/charts/TriangularConsumptionChart/TriangularConsumptionChart.vue
  @import './style.scss';
=======
  #chart {
    padding: none;
    margin: none;
  }
>>>>>>> 3c52385 (#56 - 'TriangularConsumptionChart' component refactoring):src/components/charts/TriangularConsumptionChart.vue
</style>
