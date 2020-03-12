<template>
  <div>
    <div>
      <apexcharts
        v-if="mounted"
        id="chart"
        type="bar"
        :series="series"
        :options="chartOptions"/>
    </div>
  </div>
</template>

<script>
import HTTP from '../../services/masterApi/http-common'
import apexcharts from '../../services/ssr-import/apexcharts'
// import NoDataPlaceholder from './NoDataPlaceholder.vue'

export default {
  name: 'BarChartPresentation',

  components: {
    apexcharts: apexcharts
  },

  props: [
    'title',
    'url',
    'unit'
  ],

  data () {
    return {
      min: 0,
      max: 5,
      dates: [],
      total_cost: [],
      measurements: [],
      transductorList: [],
      selectedCampus: '',
      selectedTransductor: '',
      selectedPeriod: 'Hoje',
      mounted: false
    }
  },

  computed: {
    series () {
      return [
        {
          name: 'Custo total',
          data: this.total_cost
        }
      ]
    },
    chartOptions () {
      return {
        colors: ['#fa8901', '#3333d0'],

        chart: {
          stacked: true,
          toolbar: {
            show: false
          }
        },

        plotOptions: {
          bar: {
            columnWidth: (100 / (this.total_cost.length / 2)).toString() + '%',
            dataLabels: {
              enabled: true,
              position: 'top',
              formatter: (val) => {
                return `${this.unit} ${(val / 1000).toFixed(2)}`
              }
            }
          }
        },

        dataLabels: {
          enabled: false,
          formatter: (val) => {
            return `${this.unit} ${(val / 1000).toFixed(2)}`
          },
          style: {
            fontSize: '1rem'
          },
          offsetY: 20
        },

        markers: {
          size: 1
        },

        xaxis: {
          type: 'datetime',
          show: true,
          labels: {
            style: {
              fontSize: '.8rem'
            }
          }
        },

        yaxis: {
          min: 0,
          max: this.max + 20,
          labels: {
            formatter: this.labelFormatter,
            style: {
              fontSize: '1rem'
            }
          },
          tickAmount: 10
        },

        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        },

        tooltip: {
          x: {
            format: 'dd-MM-yyyy HH:mm',
            formatter: undefined
          },
          y: {
            formatter: (val) => {
              return `${this.unit} ${(val / 1000).toFixed(2)}`
            }
          }
        },

        legend: {
          show: true,
          fontSize: '16px',
          onItemHover: {
            highlightDataSeries: true
          }
        }
      }
    }
  },

  methods: {
    labelFormatter (value) {
      return this.unit + ' ' + (value / 1000).toFixed(2)
    }
  },

  mounted () {
    HTTP.get(this.url)
      .then(res => {
        console.log(res.data)
        this.total_cost = res.data.cost
        this.min = res.data.min
        this.max = res.data.max
      })
      .catch(err => {
        console.log(err)
      })

    this.mounted = true
  }
}
</script>

<style scoped>
  #chart {
    padding: .5rem;
  }
</style>
