<template>
  <q-page>
    <div class="row q-pa-sm">
        <q-select
          class="col-4 q-ma-sm"
          label="Transdutor"
          outlined
          :options="this.transductorList"
          v-model="selectedTransductor"
          @input="updateChart"/>
        <q-select
          class="col-4 q-pa-sm"
          label="Período"
          outlined
          :options="['Hoje', 'Últimos 7 dias', 'Últimos 30 dias']"
          v-model="selectedPeriod"/>
    </div>

    <q-separator/>

    <div class="row">
      <line-chart
        class="col-12"
        :series="series"
        :xaxis="{categories: this.dates}"
        :yaxis="{title: {text: 'Voltage'}, min: this.min, max: this.max}"
        :colors="['#9999ee','#9999ee','#9999ee']"
        title="Gráfico de Tensão"
        />

      <area-chart
        class="col-12"
        :series="[{data: [28.3, 29, 33, 36, 32, 32, 33]}, {data: [22, 11, 14, 23, 11, 32, 23]}]"
        :xaxis="{categories: this.dates,title: {text: 'Time'}}"
        :yaxis="{title: {text: 'Temperature'}, min: 5, max: 40}"
        :colors="['#9999ee','#9999ee','#9999ee']"
        title="Something triphasic"/>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import LineChart from 'components/charts/LineChart.vue'
import AreaChart from 'components/charts/AreaChart.vue'

export default {
  components: {
    LineChart,
    AreaChart
  },
  data () {
    return {
      selectedTransductor: '',
      transductorList: [],
      selectedPeriod: 'Hoje',
      measurements: [],
      voltage_a: [],
      voltage_b: [],
      voltage_c: [],
      dates: [],
      min: 0,
      max: 300
    }
  },
  computed: {
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
      var self = this
      axios
        .get(`http://localhost:8000/graph/minutely_voltage/?serial_number=${this.selectedTransductor}`)
        .then((res) => {
          let measurements = res.data.results
          self.buildGraphInformation(measurements)
          // console.log(self.measurements)
        })
        .catch((err) => console.log(err))

      console.log(this.dates)
    },
    formattedDate (date) {
      let result = date.split('T')
      let dateValue, timeValue

      dateValue = result[0].split('-')
      dateValue = dateValue[1] + '/' + dateValue[2] + '/' + dateValue[0]
      timeValue = result[1]

      return dateValue + ' ' + timeValue
    },
    buildGraphInformation (measurements) {
      let date, formattedDates = []
      let voltageA, voltageB, voltageC
      let voltageAList = [], voltageBList = [], voltageCList = []

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
      .get(`http://localhost:8000/graph/minutely_voltage/`)
      .then((res) => {
        // console.log(res.data)
      })
      .catch((err) => console.log(err))

    axios
      .get(`http://localhost:8000/energy_transductors/`)
      .then((res) => {
        // console.log('Energy Transductors')
        let transductors = res.data.results, transductorsList = []

        for (let transductor of transductors) {
          transductorsList.push(transductor['serial_number'])
        }
        // console.log(transductorsList)
        this.setTransductorList(transductorsList)
        this.setSelectedTransductor(transductorsList[0])
      })

    this.updateChart()
  }
}
</script>

<style lang="scss" scoped>

</style>
