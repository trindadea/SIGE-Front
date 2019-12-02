<template>
  <div>
    <!-- <div
      v-if="this.selectedTransductor !== '' || !this.stacked"
    > -->
    <div>
      <apexcharts
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
import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'
// import NoDataPlaceholder from './NoDataPlaceholder.vue'

export default {
  name: 'BarChartPresentation',

  components: {
    // 'no-data-placeholder': NoDataPlaceholder,
    'apexcharts': VueApexCharts
  },

  props: [
    'title',
    'url',
    'graphic_type',
    'stacked',
    'labels',
    'option',
    'unit'
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
      return [
        {
          name: 'Consumo',
          data: this.consumption
        },
        {
          name: 'Geração',
          data: this.generation
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
            columnWidth: '20%',
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
  // 192.168.100.34
  methods: {
    updateChart () {
      if (this.selectedTransductor !== undefined) {
        const consumption = [
          `http://192.168.100.229:8001/graph/quarterly_consumption_off_peak/?start_date=2019-01-01 00:00&end_date=2019-10-30 23:59&is_filtered=True`,
          `http://192.168.100.229:8001/graph/quarterly_consumption_peak/?start_date=2019-01-01 00:00&end_date=2019-10-30 23:59&is_filtered=True`
        ]
        const generated = [
          `http://192.168.100.229:8001/graph/quarterly_generated_energy_off_peak/?start_date=2019-01-01 00:00&end_date=2019-10-30 23:59&is_filtered=True`,
          `http://192.168.100.229:8001/graph/quarterly_generated_energy_peak/?start_date=2019-01-01 00:00&end_date=2019-10-30 23:59&is_filtered=True`
        ]

        axios.all([
          axios.get(consumption[0]),
          axios.get(consumption[1]),
          axios.get(generated[0]),
          axios.get(generated[1])
        ])
          .then(axios.spread((consA, consB, genA, genB) => {
            const consumptionData = [
              consA.data.results[0],
              consB.data.results[0]
            ]
            const generatedData = [
              genA.data.results[0],
              genB.data.results[0]
            ]
            let minsMaxs = [
              generatedData[0].min,
              generatedData[0].max,
              consumptionData[0].min,
              consumptionData[0].max,
              generatedData[1].min,
              generatedData[1].max,
              consumptionData[1].min,
              consumptionData[1].max
            ]
            this.buildGraphInformation(consumptionData, generatedData, minsMaxs)
          }))
          .catch(errArray => {
            console.log(errArray)
          })
      }
    },

    buildGraphInformation (consumption, generation, minsMaxs) {
      if (this.graphic_type === '1') {
        this.min = Math.min(...minsMaxs)
        this.max = Math.max(...minsMaxs)

        this.consumption = []
        this.generation = []
        this.consumption.push(
          ...consumption[0].measurements,
          ...consumption[1].measurements
        )
        this.generation.push(
          ...generation[0].measurements,
          ...generation[1].measurements
        )
        console.log(this.consumption)
        console.log(this.generation)
      }
    },

    labelFormatter (value) {
      return value.toFixed(0) + ' ' + this.unit
    },

    setTransductorList (transductorList) {
      this.transductorList = transductorList
    },

    getTransductors () {
      axios
        .get(`http://192.168.100.229:8001/energy_transductors`)
        .then((res) => {
          const transductors = res.data

          let transductorsList = []

          for (let transductor of transductors) {
            transductorsList.push(transductor['serial_number'])
          }

          transductorsList.sort()

          this.setTransductorList(transductorsList)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  beforeMount () {
    this.getTransductors()
    this.updateChart()
  }
}
</script>

<style scoped>
  #chart {
    padding: .5rem;
  }
</style>
