<template>
  <apexcharts
    id="chart"
    type="bar"
    :series="series"
    :options="chartOptions"
    height="100%"
  />
</template>

<script>
import axios from 'axios'
import HTTP from '../../services/masterApi/http-common'
import Apexcharts from '../../services/ssr-import/apexcharts'

export default {
  name: 'ChargeBarChart',

  components: {
    Apexcharts
    // 'no-data-placeholder': NoDataPlaceholder,
  },

  props: [
  ],

  data () {
    return {
      min: 0,
      max: 5,
      dates: [],
      consumption: [],
      generation: [],
      measurements: [],
      transductorList: [],
      selectedCampus: '',
      selectedTransductor: '',
      selectedPeriod: 'Hoje'
    }
  },

  computed: {
    series () {
      // return [
      //   {
      //     data: this.consumption
      //   }
      // ]
      return [
        {
          name: 'Carga',
          data: [
            32,
            40,
            42,
            40,
            240,
            200,
            420,
            900,
            1100,
            960,
            400,
            420,
            350,
            384,
            900,
            935,
            920,
            840,
            670,
            510,
            112,
            90,
            35,
            35
          ]
        }
      ]
    },

    chartOptions () {
      return {
        theme: {
          mode: 'dark'
        },
        chart: {
          type: 'bar',
          background: '#00101F',
          toolbar: {
            show: false
          }
        },
        xaxis: {
          tickPlacement: 'on',
          categories: [
            '0h',
            ' ',
            ' ',
            ' ',
            '4h',
            ' ',
            ' ',
            ' ',
            '8h',
            ' ',
            ' ',
            ' ',
            '12h',
            ' ',
            '',
            ' ',
            '16h',
            ' ',
            ' ',
            ' ',
            '20h',
            ' ',
            ' ',
            '23h'
          ],
          labels: {
            style: {
              fontSize: '14px'
            },
            rotate: -90
          }
        },
        dataLabels: {
          enabled: false
        },
        yaxis: {
          tickAmount: 4,
          title: {
            text: 'kW',
            style: {
              fontSize: '20px'
            }
          },
          labels: {
            style: {
              fontSize: '14px'
            }
          }
        },
        colors: ['#339CFF']
      }
    }
  },

  methods: {
    updateChart () {
      if (this.selectedTransductor !== undefined) {
        const consumption = [
          `/graph/quarterly_consumption_off_peak/?start_date=2019-06-01 00:00&end_date=2019-06-30 23:59`,
          `/graph/quarterly_consumption_peak/?start_date=2019-06-01 00:00&end_date=2019-06-30 23:59`
        ]

        axios.all([
          HTTP.get(consumption[0]),
          HTTP.get(consumption[1])
        ])
          .then(axios.spread((consA, consB) => {
            console.log(consA, consB)
          }))
          .catch(errArray => {
            console.log(errArray)
          })
      }
    }
  },

  beforeMount () {
    this.updateChart()
  }
}
</script>

<style scoped>
  #chart {
    size: 100px;
  }
</style>
