<template>
  <q-page>
    <div class="row q-pa-sm">
        <q-select
          class="col q-ma-sm"
          label="Campus"
          outlined
          v-model="selectedTransductor"
          :options="this.campusList"
          :after="this.updateChart()"/>
        <q-select
          class="col q-ma-sm"
          label="Transdutor"
          outlined
          :options="this.transductorList"
          :after="this.updateChart()"
          v-model="selectedTransductor"/>
        <q-select
          class="col q-ma-sm"
          label="Período"
          outlined
          v-model="selectedPeriod"
          :options="['Hoje', 'Últimos 7 dias', 'Últimos 30 dias']"
          :after="this.updateChart()"/>
    </div>

    <q-separator/>

    <div class="row">
      <line-chart
        class="col-12"
        :series="[{name: 'High - 2013',data: [28, 29, 33, 36, 32, 32, 33]}]"
        :xaxis="{categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],title: {text: 'Month'}}"
        :yaxis="{title: {text: 'Temperature'}, min: 20, max: 40}"
        :colors="['#676473']"
        title="Something linear"/>

      <q-separator class="col-12"/>

      <area-chart
        class="col-12"
        :series="[{data: [28, 29, 33, 36, 32, 32, 33]}, {data: [22, 11, 14, 23, 11, 32, 23]}]"
        :xaxis="{categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],title: {text: 'Month'}}"
        :yaxis="{title: {text: 'Temperature'}, min: 5, max: 40}"
        :colors="['#9999ee','#9999ee','#9999ee']"
        title="Something triphasic"/>

      <q-separator class="col-12"/>
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
      selectedPeriod: 'Hoje'
    }
  },
  methods: {
    updateChart () {
      axios
        .get(`http://localhost:8000/graph/minutely_voltage/?serial_number=${this.selectedTransductor}`)
        .then((res) => {
          console.log('Selected Transductor: ' + this.selectedTransductor)
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  beforeMount () {
    // axios
    //   .get(`http://localhost:8000/graph/minutely_voltage/`)
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch((err) => console.log(err))

    axios
      .get(`${process.env.MASTER_URL || 'localhost:8000'}`)
      .then((res) => {
        console.log('Energy Transductors')
        let transductors = res.data.results, transductorsList = []

        for (let transductor of transductors) {
          transductorsList.push(transductor['serial_number'])
        }
        console.log(transductorsList)
        this.transductorList = transductorsList
      })
      .catch((err) => {
        console.log(err)
      })
  }

}
</script>

<style lang="scss" scoped>

</style>
