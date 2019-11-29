<template>
  <div>
    <div
      v-if="this.selectedTransductor !== '' || !this.stacked"
    >
      <apexcharts
        id="chart"
        type="bar"
        :series="series"
        :options="chartOptions"
      />
    </div>
    <no-data-placeholder v-else/>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import NoDataPlaceholder from './NoDataPlaceholder.vue'
import axios from 'axios'

export default {
  name: 'BarChartPresentation',

  components: {
    'apexcharts': VueApexCharts,
    'no-data-placeholder': NoDataPlaceholder
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
      phase_a: [],
      phase_b: [],
      phase_c: [],
      consumption: [],
      generation: [],
      measurements: [],
      transductorList: [],
      selectedCampus: '',
      selectedTransductor: '',
      selectedPeriod: 'Hoje',
      mock: [
        {
          name: 'Consumo',
          data: [['11/27/2019 00:00:00', 10.666], ['11/27/2019 01:00:00', 20.666], ['11/27/2019 02:00:00', 22.666]]
        },
        {
          name: 'Geração',
          data: [['11/27/2019 00:00:00', 5.666], ['11/27/2019 01:00:00', 7.666], ['11/27/2019 02:00:00', 5.666]]
        }
      ]
    }
  },

  computed: {
    series () {
      if (this.graphic_type === '1') {
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
      } else {
        return [
          {
            name: 'Fase A',
            data: this.phase_a
          },
          {
            name: 'Fase B',
            data: this.phase_b
          },
          {
            name: 'Fase C',
            data: this.phase_c
          }
        ]
      }
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
            show: true
          }
        },

        plotOptions: {
          bar: {
            columnWidth: '25%',
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
          show: true
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
        }
      }
    }
  },

  methods: {
    updateChart () {
      if (this.selectedTransductor !== undefined) {
        const consumption = [
          `http://localhost:8001/graph/quarterly_consumption_off_peak/?start_date=2019-10-01 00:00&end_date=2019-10-30 23:59`,
          `http://localhost:8001/graph/quarterly_consumption_peak/?start_date=2019-10-01 00:00&end_date=2019-10-30 23:59`
        ]
        const generated = [
          `http://localhost:8001/graph/quarterly_generated_energy_off_peak/?start_date=2019-10-01 00:00&end_date=2019-10-30 23:59`,
          `http://localhost:8001/graph/quarterly_generated_energy_peak/?start_date=2019-10-01 00:00&end_date=2019-10-30 23:59`
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

    setOneFaseInformations (measurementList) {
      this.phase_a = measurementList
    },

    setThreeFaseInformations (faseAList, faseBList, faseCList) {
      this.phase_a = faseAList
      this.phase_b = faseBList
      this.phase_c = faseCList
    },

    labelFormatter (value) {
      return value.toFixed(0)
    },

    setTransductorList (transductorList) {
      this.transductorList = transductorList
    },

    getTransductors () {
      axios
        .get(`http://0.0.0.0:8001/energy_transductors`)
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
