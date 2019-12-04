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
      v-if="this.selectedTransductor !== ''"
    >
      <apexcharts
      id="chart"
      type="area"
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
import HTTP from '../../services/masterApi/http-common'

export default {
  components: {
    'apexcharts': VueApexCharts,
    'no-data-placeholder': NoDataPlaceholder
  },

  props: [
    'title',
    'url',
    'graphic_type'
  ],

  data () {
    return {
      dates: [],
      fase_a: [],
      fase_b: [],
      fase_c: [],
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
          data: this.fase_a
        },
        {
          name: 'Fase B',
          data: this.fase_b
        },
        {
          name: 'Fase C',
          data: this.fase_c
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

        labels: this.dates,

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
          min: Math.min(...this.series[0].data) - 20,
          max: Math.max(...this.series[0].data) + 20,
          tickAmount: 5
        },

        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
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

      if (this.selectedTransductor !== undefined) {
        HTTP
          .get(`graph/minutely_${this.url}/?limit=${limit}&serial_number=${this.selectedTransductor}&start_date=${startDate}&end_date=${endDate}`)
          .then((res) => {
            const measurements = res.data
            console.log(measurements)
            this.buildGraphInformation(measurements)
          })
          .catch((err) => console.log(err))
      }
    },

    getTodayInterval () {
      let now = new Date()
      let oneDayAgo = new Date()

      oneDayAgo.setDate(oneDayAgo.getDate() - 1)

      let startDate = moment(oneDayAgo).format('YYYY-MM-DD h:mm')
      let endDate = moment(now).format('YYYY-MM-DD h:mm')

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

      return dateValue + ' ' + timeValue
    },

    buildGraphInformation (measurements) {
      if (this.graphic_type === '1') {
        let date

        let oneFaseMeasurement
        let formattedDates = []

        let measurementList = []

        for (let measurement of measurements) {
          date = measurement['collection_date']
          date = this.formattedDate(date)

          oneFaseMeasurement = measurement['measurement']

          formattedDates.push(date)

          measurementList.push(oneFaseMeasurement)
        }

        this.setOneFaseInformations(measurementList, formattedDates)
      } else {
        let date

        let faseA
        let faseB
        let faseC

        let formattedDates = []

        let faseAList = []
        let faseBList = []
        let faseCList = []

        for (let measurement of measurements) {
          date = measurement['collection_date']
          date = this.formattedDate(date)

          faseA = measurement['phase_a']
          faseB = measurement['phase_b']
          faseC = measurement['phase_c']

          formattedDates.push(date)

          faseAList.push(faseA)
          faseBList.push(faseB)
          faseCList.push(faseC)
        }

        this.setThreeFaseInformations(faseAList, faseBList, faseCList, formattedDates)
      }
    },

    setOneFaseInformations (measurementList, formattedDates) {
      this.fase_a = measurementList
      this.dates = formattedDates
    },

    setThreeFaseInformations (faseAList, faseBList, faseCList, formattedDates) {
      this.fase_a = faseAList
      this.fase_b = faseBList
      this.fase_c = faseCList
      this.dates = formattedDates
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
