<template>
  <q-no-ssr>
      <apexcharts v-if="getSerie" type="line" height="500" :options="chartOptions" :series="getSerie" />
      <!-- <div v-if="getSerie[0].data.length === 0 || sumConsumption === 0" class="no-data-warning">
        <span>
          Não há dados disponiveis no momento!
        </span>
      </div> -->
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
    'unit'
  ],
  data () {
    return {
      min: 0,
      sumConsumption: 0,
      chartOptions: {
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
          type: 'Hora',
          categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
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
    ...mapGetters('totalCostStore', ['getSerie', 'getFilters'])
  },
  methods: {
    ...mapActions('totalCostStore', ['updateChartSerie']),
    labelFormatter (value) {
      return value.toFixed(2) + ' ' + this.unit
    },
    labelFormatterX (value) {
      return value + 'h'
    }
  },
  created () {
    this.updateChartSerie([150, 30, 40])
    // (() => {
    //   MASTER.get(`/graph/quarterly-daily-consumption/?campus=${1}`)
    //     .then(async res => {
    //       this.series = [{
    //         name: 'Consumo (Wh)',
    //         data: res.data
    //       }]
    //       res.data.forEach((item) => {
    //         this.sumConsumption += item
    //         return ''
    //       })
    //       this.consumption = res.data
    //     })
    //     .catch(err => { console.error(err) })
    // })()
  }
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
