<template>
  <div>
    <!-- <div
      v-if="this.selectedTransductor !== '' || !this.stacked"
    > -->
    <div>
      <apexcharts
        v-if="mounted"
        id="chart"
        type="bar"
        :series="series"
        :options="chartOptions"
      />
    </div>
    <!-- <no-data-placeholder v-else/> -->
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
        // colors: ['#d02222', '#22d022'],
        // colors: ['#487787', '#fa8901'],
        // colors: ['#fa8901', '#487787'],
        colors: ['#fa8901', '#3333d0'],

        chart: {
          stacked: true,
          toolbar: {
            show: false
          }
        },

        plotOptions: {
          bar: {
            columnWidth: '4%',
            dataLabels: {
              enabled: true,
              position: 'top',
              formatter: (val) => {
                return `${val.toFixed(0)} ${this.unit}`
              }
            }
          }
        },

        dataLabels: {
          enabled: false,
          formatter: (val) => {
            return `${val.toFixed(0)} ${this.unit}`
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
              return `${val.toFixed(0)} ${this.unit || ''}`
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
      return value.toFixed(0) + ' ' + this.unit
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
    // console.log()
  }
}
</script>

<style scoped>
  #chart {
    padding: .5rem;
  }
</style>
