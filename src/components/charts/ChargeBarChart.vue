<template>
  <div>
    <apexcharts
      id="chart"
      type="bar"
      :series="series"
      :options="chartOptions"
      height="170px"
      width="100%"/>

  </div>
</template>

<script>
import MASTER from '../../services/masterApi/http-common'
import Apexcharts from '../../services/ssr-import/apexcharts'

export default {
  name: 'ChargeBarChart',

  components: {
    Apexcharts
    // 'no-data-placeholder': NoDataPlaceholder,
  },

  props: {
    selectedCampus: Object,
    selectedTransductor: Object
  },

  data () {
    return {
      min: 0,
      max: 5,
      dates: [],
      consumption: [],
      generation: [],
      measurements: [],
      transductorList: [],
      selectedPeriod: 'Hoje',
      errors: []
    }
  },

  computed: {
    series () {
      return [
        {
          name: 'Carga',
          data: this.consumption
        }
      ]

    // return [
    //   {
    //     name: 'Carga',
    //     data: [
    //       32,
    //       40,
    //       42,
    //       40,
    //       240,
    //       200,
    //       420,
    //       90,
    //       10,
    //       60,
    //       400,
    //       420,
    //       350,
    //       384,
    //       70,
    //       75,
    //       90,
    //       40,
    //       70,
    //       510,
    //       112,
    //       90,
    //       35,
    //       35
    //     ]
    //   }
    // ]
    },

    chartOptions () {
      return {
        title: {
          text: 'Carga no campus hoje',
          align: 'center',
          margin: 0,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: '24px',
            fontWeight: '',
            fontFamily: 'Roboto',
            color: '#ffffff'
          }
        },
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
            formatter: (val) => {
              return `${val.toFixed(0) / 1000}`
            },
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
      MASTER
        .get(`/graph/quarterly-daily-consumption/?campus=${this.selectedCampus.id}`)
        // .get(`/graph/quarterly-daily-consumption/?start_date=2020-03-05%2000:00:00&end_date=2020-03-05%2023:59:59&campus=${this.selectedCampus.id}`)
        .then((res) => {
          this.consumption = res.data
        })
        .catch(err => {
          this.errors = err
          console.error(err)
        })
    }
  },

  beforeMount () {
    this.updateChart()
  },

  updated () {
    this.updateChart()
  }

}
</script>

<style scoped>
  #chart {
    size: 100px;
  }
</style>
