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
      v-if="(selectedTransductor && selectedPeriod)"
      class="row">
      <!-- <apexcharts
        class="col-12"
        :options="chartOptions"
        :series="series"/> -->
      <linechart
        class="col-12"
        :xaxis="xAxis"
        :yaxis="yAxis"
        :title="title"
        :series="series"
        :labels="getDates"/>
      <q-separator class="col-12"/>
    </div>
    <no-data-placeholder v-else/>
  </q-page>
</template>

<script>
import axios from 'axios'
import NoDataPlaceholder from 'components/dashboard/NoDataPlaceholder.vue'
import LineChart from 'components/charts/LineChart.vue'

export default {
  name: 'FrequencyDashboard',

  components: {
    NoDataPlaceholder,
    linechart: LineChart
  },

  data () {
    return {
      // min: 110,
      // max: 240,
      dates: [],
      frequency_a: [],
      measurements: [],
      transductorList: [],
      selectedCampus: '',
      selectedTransductor: '',
      selectedPeriod: 'Hoje',
      periodsOptions: {}
    }
  },

  computed: {
    getDates () {
      return this.dates
    },

    xAxis () {
      return {
        type: 'datetime',
        show: false
      }
    },

    yAxis () {
      return {
        min: Math.min(...this.series[0].data) - 20,
        max: Math.max(...this.series[0].data) + 20,
        tickAmount: 5,
        labels: {
          formatter: this.labelFormatter
        }
      }
    },

    title () {
      return {
        text: 'frequency'
      }
    },

    intervalOptions () {
      return {
        hour12: false,
        day: '2-digit',
        year: 'numeric',
        month: '2-digit'
      }
    },

    series () {
      return [
        {
          name: 'frequency A',
          data: this.frequency_a
        }
      ]
    }
  },

  watched: {
    transductorList: (val) => {
      this.transductorList = val
    },
    selectedTransductor: (val) => {
      this.selectedTransductor = val
    }
  },

  methods: {
    updateChart () {
      let periods = this.periodsOptions[this.selectedPeriod]
      let startDate = periods[0]
      let endDate = periods[1]
      let limit = periods[2]

      if (this.selectedTransductor !== undefined) {
        axios
          .get(`http://127.0.0.1:8000/graph/minutely_frequency/?limit=${limit}&serial_number=${this.selectedTransductor}&start_date=${startDate}&end_date=${endDate}`)
          .then((res) => {
            const measurements = res.data.results

            this.buildGraphInformation(measurements)
          })
          .catch((err) => console.log(err))
      }
    },

    getTodayInterval () {
      let endDate = this.endDate()
      let startDate = this.startDate(0)

      return [startDate, endDate, 1440]
    },

    getLastWeek () {
      let endDate = this.endDate()
      let startDate = this.startDate(7)

      return [startDate, endDate, 10080]
    },

    getLastMonth () {
      let endDate = this.endDate()
      let startDate = this.startDate(30)

      return [startDate, endDate, 43200]
    },

    endDate () {
      let endDate = new Date().toLocaleTimeString('pt-BR', this.intervalOptions).replace(/(\/)/g, '-').replace(/:[0-9]{2}$/g, '')

      let endDateDay = endDate.substr(0, 2)
      let endDateMonth = endDate.substr(3, 2)
      let endDateYear = endDate.substr(6, 4)
      let endDateTime = endDate.substr(10, endDate.length)
      endDate = endDateYear + '-' + endDateMonth + '-' + endDateDay + endDateTime

      return endDate
    },

    startDate (days) {
      let startDate = new Date()
      let day = startDate.getDay()
      day = startDate.getDate() - days
      startDate.setDate(day)
      startDate = startDate.toLocaleTimeString('pt-BR', this.intervalOptions).replace(/(:*[0-9]{2}:*[0-9]{2}:*[0-9]{2})/g, '00:00').replace(/(\/)/g, '-')

      let startDateDay = startDate.substr(0, 2)
      let startDateMonth = startDate.substr(3, 2)
      let startDateYear = startDate.substr(6, 4)
      let startDateTime = startDate.substr(10, startDate.length)
      startDate = startDateYear + '-' + startDateMonth + '-' + startDateDay + startDateTime

      return startDate
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

    labelFormatter (value) {
      return value.toFixed(2)
    },

    buildGraphInformation (measurements) {
      let date

      let frequency

      let formattedDates = []

      let frequencyList = []

      for (let measurement of measurements) {
        date = measurement['collection_date']
        date = this.formattedDate(date)

        frequency = measurement['frequency_a']
        formattedDates.push(date)

        frequencyList.push(frequency)
      }

      this.setInformations(frequencyList, formattedDates)
    },

    setInformations (frequencyAList, formattedDates) {
      this.frequency_a = frequencyAList
      this.dates = formattedDates
    },

    setTransductorList (transductorList) {
      this.transductorList = transductorList
    },

    setSelectedTransductor (selectedTransductor) {
      this.selectedTransductor = selectedTransductor
    },

    getTransductors () {
      axios
        .get(`http://0.0.0.0:8000/energy_transductors`)
        .then((res) => {
          const transductors = res.data.results

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

    this.updateChart()
    console.log()
  }
}
</script>

<style lang="scss" scoped>

</style>
