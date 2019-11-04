<template>
  <q-page>
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
  </q-page>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import NoDataPlaceholder from './NoDataPlaceholder.vue'
import moment from 'moment'
import axios from 'axios'

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
    'y_max'
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
    },
    chartOptions () {
      return {
        chart: {
          stacked: false
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
            text: 'frequency'
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
    asdf () {
      console.log(this.series)
    },
    updateChart () {
      let periods = this.periodsOptions[this.selectedPeriod]
      let startDate = periods[0]
      let endDate = periods[1]
      let limit = periods[2]

      if (this.selectedTransductor !== undefined) {
        axios
          .get(`http://127.0.0.1:8001/graph/minutely_${this.url}/?limit=${limit}&serial_number=${this.selectedTransductor}&start_date=${startDate}&end_date=${endDate}`)
          .then((res) => {
            // console.log(${this.url})
            const measurements = res.data.results[0]
            this.buildGraphInformation(measurements)
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

    formattedDate (date) {
      let dateValue
      let timeValue
      let result = date.split('T')

      dateValue = result[0].split('-')
      dateValue = dateValue[1] + '/' + dateValue[2] + '/' + dateValue[0]
      timeValue = result[1]
      let a = dateValue + ' ' + timeValue
      a = a.split('Z')[0]

      return a
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
