<template>
  <div>
    <!-- <div v-if="this.selectedTransductor !== ''"> -->
    <div style="padding: 1.5em;">
      <h2 class="text-left text-muted text-h4 q-pa-none q-ma-none q-px-lg q-mb-md">
        {{this.title}}
      </h2>
      <apexcharts
        id="chart"
        type="line"
        :options="chartOptions"
        :series="series"/>
    </div>
    <!-- <no-data-placeholder v-else/> -->
  </div>
</template>

<script>
import axios from 'axios'
// import NoDataPlaceholder from './NoDataPlaceholder.vue'

export default {
  components: {
    // 'no-data-placeholder': NoDataPlaceholder,
  },

  props: [
    'title',
    'url',
    'graphic_type',
    'show_legend',
    'unit',
    'id',
    'min',
    'decimals',
    'max'
  ],

  data () {
    return {
      phase_a: [],
      phase_b: [],
      phase_c: [],
      measurements: [],
      transductor: '',
      selectedPeriod: 'Hoje',
      periodsOptions: {}

      // id: 30000247
    }
  },

  computed: {
    series () {
      if (this.graphic_type === '1') {
        return [
          {
            name: 'asdfadsf',
            data: this.phase_a
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
        // colors: ['', '', ''],
        colors: ['#46b5d1', '#007944', '#da2d2d'],

        chart: {
          stacked: false
        },

        legend: {
          show: this.show_legend
        },

        stroke: {
          width: [2, 2, 2],
          curve: 'smooth'
        },

        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },

        fill: {
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
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
          size: 0
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
          labels: {
            formatter: (val) => {
              return val.toFixed(this.decimals || 0) + ' ' + this.unit
            },
            style: {
              fontSize: '1rem'
            }
          },
          min: this.min,
          max: this.max,
          decimalsInFloat: 2,
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
              return `${val.toFixed(1)} ${this.unit}`
            }
          }
        }
      }
    }
  },

  methods: {
    updateChart () {
      const a = `http://192.168.100.229:8001/graph/${this.url}/?serial_number=${this.transductor.id}&start_date=2019-06-01 00:00&end_date=2019-07-31 23:59`

      console.log(a)

      axios
        .get(a)
        .then((res) => {
          const measurements = res.data.results[0]
          console.log(measurements)
          this.buildGraphInformation(measurements)
        })
        .catch((err) => console.log(err))
    },

    buildGraphInformation (data) {
      if (this.graphic_type === '1') {
        console.log(data.measurements)
        this.setOneFaseInformations(data.measurements)
      } else {
        let phaseAList = data['phase_a']
        let phaseBList = data['phase_b']
        let phaseCList = data['phase_c']

        this.setThreeFaseInformations(phaseAList, phaseBList, phaseCList)
      }
    },

    setOneFaseInformations (measurementList) {
      this.phase_a = measurementList
    },

    setThreeFaseInformations (measurementListA, measurementListB, measurementListC) {
      this.phase_a = measurementListA
      this.phase_b = measurementListB
      this.phase_c = measurementListC
    },

    setTransductorList (transductorList) {
      this.transductorList = transductorList
    },

    getTransductors () {
      axios
        .get(`http://192.168.100.229:8001/energy_transductors/${this.id}/`)
        .then((res) => {
          this.transductor = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  beforeMount () {
    const a = `http://192.168.100.229:8001/graph/${this.url}/?serial_number=${this.id}&start_date=2019-06-01 00:00&end_date=2019-12-30 23:59&is_filtered=True`

    console.log(a)

    axios
      .get(a)
      .then((res) => {
        const measurements = res.data.results[0]
        console.log(measurements)
        this.buildGraphInformation(measurements)
      })
      .catch((err) => console.log(err))
  }
}
</script>

<style scoped>
  #chart {
    padding: .5rem;
    colors: #147900;
  }
</style>
