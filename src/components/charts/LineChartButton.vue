<template>
  <q-page>
    <div class="row q-pa-sm">
      <q-btn
        @input="setPeriod('today')"
      >
        aoifjioas
      </q-btn>
      <q-btn
        @input="setPeriod('week')"
      >
        aoifjioas
      </q-btn>
      <q-btn
        @input="setPeriod('month')"
      >
        aoifjioas
      </q-btn>
    </div>
    <q-separator />
    <div v-if="this.selectedTransductor !== ''">
      <apexcharts id="chart" type="line" :options="chartOptions" :series="series" />
    </div>
    <no-data-placeholder v-else />
  </q-page>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import NoDataPlaceholder from './NoDataPlaceholder.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  components: {
    apexcharts: VueApexCharts,
    'no-data-placeholder': NoDataPlaceholder
  },

  props: [
    'title',
    'url',
    'graphic_type',
    'y_min',
    'y_max',
    'show_legend',
    'transductor_id'
  ],

  data () {
    return {
      phase_a: [],
      phase_b: [],
      phase_c: [],
      measurements: [],
      transductorList: [],
      selectedCampus: '',
      selectedTransductor: this.transductor_id,
      selectedPeriod: 'Hoje',
      periodsOptions: {}
    }
  },

  computed: {
    series () {
      if (this.graphic_type === '1') {
        return [
          {
            name: this.title,
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
          opacity: [0.85, 0.25, 1],
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
          enabled: false
        },

        markers: {
          size: 0
        },

        xaxis: {
          type: 'datetime',
          show: false
        },

        yaxis: {
          title: {
            text: this.title
          },
          min: parseInt(this.y_min, 10),
          max: parseInt(this.y_max, 10),
          tickAmount: 5,
          decimalsInFloat: 2
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
          }
        }
      }
    }
  },

  methods: {
    setPeriod (value) {
      this.selectedPeriod = value
      console.log(this.selectedPeriod)
      this.updateChart()
    },

    updateChart () {
      let endDate
      let startDate

      if (this.selectedPeriod === 'today') {
        endDate = moment()
          .endOf('day')
          .format('YYYY-MM-DD h:mm')
        startDate = moment()
          .startOf('day')
          .format('YYYY-MM-DD h:mm')
      } else if (this.selectedPeriod === 'week') {
        endDate = moment()
          .endOf('isoWeek')
          .format('YYYY-MM-DD h:mm')
        startDate = moment()
          .startOf('isoWeek')
          .format('YYYY-MM-DD h:mm')
      } else if (this.selectedPeriod === 'month') {
        endDate = moment()
          .startOf('month')
          .format('YYYY-MM-DD h:mm')
        startDate = moment()
          .startOf('month')
          .format('YYYY-MM-DD h:mm')
      }

      if (this.selectedTransductor !== undefined) {
        let a = `http://127.0.0.1:8001/graph/${this.url}/?serial_number=${this.selectedTransductor}&start_date=${startDate}&end_date=${endDate}`
        // a = `http://localhost:8001/graph/${this.url}/?start_date=2019-06-01 00:00&end_date=2019-07-31 20:00`

        console.log(a)

        axios
          .get(a)
          .then(res => {
            const data = res.data.results[0]
            console.log(data)
            this.buildGraphInformation(data)
          })
          .catch(err => console.log(err))
      }
    },

    buildGraphInformation (data) {
      if (this.graphic_type === '1') {
        this.min = data.min
        this.max = data.max
        this.setOneFaseInformations(data.measurements)
      } else {
        this.min = data.min
        this.max = data.max
        this.setThreeFaseInformations(data.phase_a, data.phase_b, data.phase_c)
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
      return value.toFixed(2)
    },

    setTransductorList (transductorList) {
      this.transductorList = transductorList
    },

    getTransductors () {
      axios
        .get(`http://0.0.0.0:8001/energy_transductors`)
        .then(res => {
          const transductors = res.data

          let transductorsList = []

          for (let transductor of transductors) {
            transductorsList.push(transductor['serial_number'])
          }

          transductorsList.sort()

          this.setTransductorList(transductorsList)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  created () {
    this.getTransductors()
    this.updateChart()
  }
}
</script>

<style scoped>
#chart {
  padding: 0.5rem
}
</style>
