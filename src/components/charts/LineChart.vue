<template>
  <div>
    <div class="row q-pa-sm">
        <q-select
          class="col q-ma-sm"
          label="Transdutor"
          outlined
          :options="this.transductorList"
          v-model="selectedTransductor"
          @input="updateChart()"/>
        <q-select
          class="col q-ma-sm"
          label="Período"
          outlined
          v-model="selectedPeriod"
          :options="['Hoje', 'Últimos 7 dias', 'Últimos 30 dias']"
          @input="updateChart()"/>
    </div>
    <q-separator/>
      <div
      v-if="this.selectedTransductor !== ''">
      <apexcharts
      id="chart"
      type="line"
      :options="chartOptions"
      :series="series"/>
    </div>
    <no-data-placeholder v-else/>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import NoDataPlaceholder from './NoDataPlaceholder.vue'
import moment from 'moment'
import HTTP from '../../services/masterApi/http-common'

export default {
  components: {
    'apexcharts': VueApexCharts,
    'no-data-placeholder': NoDataPlaceholder
  },

  props: [
    'title',
    'url',
    'graphic_type',
    'y_min',
    'y_max',
    'show_legend',
    'unit'
  ],

  data () {
    return {
      phase_a: [],
      phase_b: [],
      phase_c: [],
      measurements: [],
      transductorList: [],
      selectedCampus: '',
      selectedTransductor: '',
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
          },
          y: {
            formatter: (val) => {
              return `${val.toFixed(3)} ${this.unit}`
            }
          }
        }
      }
    }
  },

  methods: {
    updateChart () {
      let periods = this.periodsOptions[this.selectedPeriod]
      let startDate = periods[0]
      let endDate = periods[1]
      let limit = periods[2]

      console.log(`http://127.0.0.1:8001/graph/${this.url}/?limit=${limit}&serial_number=${this.selectedTransductor}&start_date=${startDate}&end_date=${endDate}`)

      if (this.selectedTransductor !== undefined) {
        HTTP
          .get(`graph/minutely_${this.url}/?limit=${limit}&serial_number=${this.selectedTransductor}&start_date=${startDate}&end_date=${endDate}`)
          .then((res) => {
            const measurements = res.data.results[0]
            this.buildGraphInformation(measurements)
            console.log(measurements)
          })
          .catch((err) => console.log(err))
      }
    },

    getTodayInterval () {
      let now = new Date()
      let oneDayAgo = new Date()

      oneDayAgo.setDate(oneDayAgo.getDate() - 1)

      let startDate = moment(oneDayAgo).format('YYYY-MM-DD HH:mm')
      let endDate = moment(now).format('YYYY-MM-DD HH:mm')

      return [startDate, endDate, 1440]
    },

    getLastWeek () {
      let now = new Date()
      let oneWeekAgo = new Date()

      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      let startDate = moment(oneWeekAgo).format('YYYY-MM-DD h:mm')
      let endDate = moment(now).format('YYYY-MM-DD h:mm')

      return [startDate, endDate, 10080]
    },

    getLastMonth () {
      let now = new Date()
      let oneMonthAgo = new Date()

      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

      let startDate = moment(oneMonthAgo).format('YYYY-MM-DD h:mm')
      let endDate = moment(now).format('YYYY-MM-DD h:mm')

      return [startDate, endDate, 43200]
    },

    buildGraphInformation (data) {
      if (this.graphic_type === '1') {
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
      HTTP
        .get('energy_transductors')
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

  created () {
    this.getTransductors()

    this.periodsOptions['Hoje'] = this.getTodayInterval()
    this.periodsOptions['Últimos 7 dias'] = this.getLastWeek()
    this.periodsOptions['Últimos 30 dias'] = this.getLastMonth()
  }
}
</script>

<style scoped>
  #chart {
    padding: .5rem
  }
</style>
