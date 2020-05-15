<template>
  <q-no-ssr>
    <apexcharts type="bar" height="500" :options="chartOptions" :series="series" />
  </q-no-ssr>
</template>

<script>
import MASTER from '../../services/masterApi/http-common'

export default {
  name: 'BarChart',

  components: {
    Apexcharts: () => import('vue-apexcharts')
  },

  props: [
    'url',
    'unit'
  ],

  data () {
    return {
      min: 0,
      max: 5,
      total_cost: [],
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
            show: true,
            tools: {
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false
            }
          }
        },

        tooltip: {
          show: false,
          x: {
            format: 'dd MMM yyyy'
          }
        },

        dataLabels: {
          enabled: false
        },

        xaxis: {
          type: 'datetime',
          show: true,
          labels: {
            datetimeFormatter: {
              month: 'MMM yy'
            },
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
      return this.unit + ' ' + value.toFixed(2)
    },
    async getData () {
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
  },

  watch: {
    url: async function (newVal, oldVal) {
      this.getData()
    }
  }
}
</script>
