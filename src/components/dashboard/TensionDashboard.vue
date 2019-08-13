<template>
  <q-page>
    <div class="row q-pa-sm">
        <q-select
          class="col q-ma-sm"
          label="Campus"
          outlined
          v-model="selectedCampus"
          @input="updateChart()"/>
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
      <apexcharts
        class="col-12"
        :options="chartOptions"
        :series="series"/>

      <q-separator class="col-12"/>

      <!-- <area-chart
        class="col-12"
        :series="[{data: [28.3, 29, 33, 36, 32, 32, 33]},
         {data: [22, 11, 14, 23, 11, 32, 23]}]"
        :xaxis="{categories: this.dates,title: {text: 'Time'}}"
        :yaxis="{title: {text: 'Temperature'},
         min: 5, max: 40}"
        :colors="['#9999ee','#9999ee','#9999ee']"
        title="Something triphasic"/>

      <q-separator class="col-12"/> -->
    </div>

    <no-data-placeholder v-else/>
  </q-page>
</template>

<script>
import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'
import NoDataPlaceholder from 'components/dashboard/NoDataPlaceholder.vue'

export default {
  components: {
    NoDataPlaceholder,
    apexcharts: VueApexCharts
  },

  data () {
    return {
      // min: 110,
      // max: 240,
      dates: [],
      voltage_a: [],
      voltage_b: [],
      voltage_c: [],
      measurements: [],
      transductorList: [],
      selectedCampus: '',
      selectedTransductor: '',
      selectedPeriod: 'Hoje',
      options: {
        hour12: false,
        day: '2-digit',
        year: 'numeric',
        month: '2-digit'
      },
      periodsOptions: {}
    }
  },

  computed: {
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
            text: 'Voltage'
          },
          min: Math.min(...this.series[0].data) - 20,
          max: Math.max(...this.series[0].data) + 20,
          tickAmount: 5,
          labels: {
            formatter: this.labelFormatter
          }
        },

        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        }
        // colors: [
        //   // '#3333ee',
        //   // '#33ee33',
        //   // '#ee3333'
        // ]
      }
    },

    series () {
      return [
        {
          name: 'Voltage A',
          data: this.voltage_a
        },

        {
          name: 'Voltage B',
          data: this.voltage_b
        },

        {
          name: 'Voltage C',
          data: this.voltage_c
        }
      ]
    }
  },

  methods: {
    updateChart () {
      let periods = this.periodsOptions[this.selectedPeriod]
      let startDate = periods[0]
      let endDate = periods[1]

      axios
        .get(`http://0.0.0.0:8000/graph/minutely_voltage/?limit=1440&serial_number=${this.selectedTransductor}&start_date=${startDate}&end_date=${endDate}`)
        .then((res) => {
          const measurements = res.data.results

          this.buildGraphInformation(measurements)
        })
        .catch((err) => console.log(err))

      // console.log(this.dates)
    },

    getTodayInterval () {
      let endDate = new Date().toLocaleTimeString('pt-BR', this.options).replace(/(\/)/g, '-').replace(/:[0-9]{2}$/g, '')

      let endDateDay = endDate.substr(0, 2)
      let endDateMonth = endDate.substr(3, 2)
      let endDateYear = endDate.substr(6, 4)
      let endDateTime = endDate.substr(10, endDate.length)
      endDate = endDateYear + '-' + endDateMonth + '-' + endDateDay + endDateTime

      let startDate = new Date().toLocaleTimeString('pt-BR', this.options).replace(/(:*[0-9]{2}:*[0-9]{2}:*[0-9]{2})/g, '00:00').replace(/(\/)/g, '-')

      let startDateDay = startDate.substr(0, 2)
      let startDateMonth = startDate.substr(3, 2)
      let startDateYear = startDate.substr(6, 4)
      let startDateTime = startDate.substr(10, startDate.length)
      startDate = startDateYear + '-' + startDateMonth + '-' + startDateDay + startDateTime

      return [startDate, endDate]
    },

    getLastWeek () {

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

      let voltageA
      let voltageB
      let voltageC

      let formattedDates = []

      let voltageAList = []
      let voltageBList = []
      let voltageCList = []

      for (let measurement of measurements) {
        date = measurement['collection_date']
        date = this.formattedDate(date)

        voltageA = measurement['voltage_a']
        voltageB = measurement['voltage_b']
        voltageC = measurement['voltage_c']

        formattedDates.push(date)

        voltageAList.push(voltageA)
        voltageBList.push(voltageB)
        voltageCList.push(voltageC)
      }

      this.setInformations(voltageAList, voltageBList, voltageCList, formattedDates)
    },

    setInformations (voltageAList, voltageBList, voltageCList, formattedDates) {
      this.voltage_a = voltageAList
      this.voltage_b = voltageBList
      this.voltage_c = voltageCList
      this.dates = formattedDates
    },

    setTransductorList (transductorList) {
      this.transductorList = transductorList
    },

    setSelectedTransductor (selectedTransductor) {
      this.selectedTransductor = selectedTransductor
    }
  },

  beforeMount () {
    axios
      .get(`http://0.0.0.0:8000/energy_transductors`)
      .then((res) => {
        const transductors = res.data.results

        let transductorsList = []

        for (let transductor of transductors) {
          transductorsList.push(transductor['serial_number'])
        }

        this.setTransductorList(transductorsList)
        this.setSelectedTransductor(transductorsList[16])
      })
      .catch((err) => {
        console.log(err)
      })

    this.periodsOptions['Hoje'] = this.getTodayInterval()

    this.updateChart()
  }
}
</script>

<style lang="scss" scoped>

</style>
