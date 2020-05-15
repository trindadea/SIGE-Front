<template>
      <div class="bg-white chart-container">
      <apexcharts
        v-if="mounted"
        id="chart"
        type="bar"
        :series="series"
        :options="chartOptions"
        height="95%"
      />
      </div>
</template>

<script>
import MASTER from '../../services/masterApi/http-common'
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
        colors: ['#00417e'],

        chart: {
          type: 'bar',
          toolbar: {
            show: false
          }
        },

        dataLabels: {
          enabled: false
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
        }
      }
    }
  },

  methods: {
    labelFormatter (value) {
      return this.unit + ' ' + (value / 1000).toFixed(2)
    },
    async getData () {
      console.log(this.url)
      await MASTER.get(this.url)
        .then(res => {
          this.total_cost = res.data.cost
          this.min = res.data.min
          this.max = res.data.max
          this.mounted = true
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  async mounted () {
    this.getData()
    // console.log()
  },

  watch: {
    url: async function (newVal, oldVal) {
      this.getData()
    }
  }
}
</script>

<style scoped>
  .chart-container {
    height: 100%;
    width: 80%;
  }
</style>
