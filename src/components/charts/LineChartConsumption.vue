<template>
  <q-no-ssr>
      <apexcharts v-if="series[0].data.length !== 0" type="line" height="500" :options="chartOptions" :series="series" />
      <div v-if="series[0].data.length === 0" class="no-data-warning">
        <span>
          Não há dados disponiveis no momento!
        </span>
      </div>
  </q-no-ssr>
</template>

<script>
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
      series: [{
        name: 'Consumo (Wh)',
        data: [214.9, 192.0, 170.7, 172.2, 178.2, 170.3, 151.1, 128.8, 124.9, 125.0, 134.6, 133.3, 127.0, 137.5, 132.9, 146.9, 139.7, 130.7, 176.0, 259.3, 260.9, 241.0, 224.7, 226.0]
      }],
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
  methods: {
    labelFormatter (value) {
      return value.toFixed(2) + ' ' + this.unit
    },
    labelFormatterX (value) {
      return value + 'h'
    }
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
