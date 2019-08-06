<template>
  <q-page>
    <div class="row q-pa-sm">
        <q-select
          class="col-4 q-ma-sm"
          label="Transdutor"
          outlined
          :options="this.transductorList"
          v-model="selectedTransductor"
          :after="this.updateChart()"/>
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
        :series="[{name: 'High - 2013',data: [28, 29, 33, 36, 32, 32, 33]}]"
        :xaxis="{categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],title: {text: 'Month'}}"
        :yaxis="{title: {text: 'Temperature'}, min: 20, max: 40}"
        :colors="['#676473']"
        title="Something linear"/>

      <area-chart
        class="col-12"
        :series="[{data: [28, 29, 33, 36, 32, 32, 33]}, {data: [22, 11, 14, 23, 11, 32, 23]}]"
        :xaxis="{categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],title: {text: 'Month'}}"
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
      selectedTransductor: 'None',
      transductorList: [],
      selectedPeriod: 'Hoje'
    }
  },
  methods: {
    updateChart () {
      axios
        .get(`http://localhost:8000/graph/minutely_voltage/?serial_number=${this.selectedTransductor}`)
        .then((res) => {
          console.log('Selected Transductor: ')
          console.log(res.data)
        })
        .catch((err) => console.log(err))
    }
  },
  beforeMount () {
    axios
      .get(`http://localhost:8000/graph/minutely_voltage/`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err))

    axios
      .get(`http://localhost:8000/energy_transductors/`)
      .then((res) => {
        console.log('Energy Transductors')
        let transductors = res.data.results, transductorsList = []

        for (let transductor of transductors) {
          transductorsList.push(transductor['serial_number'])
        }
        console.log(transductorsList)
        this.transductorList = transductorsList
      })
  }

}
</script>

<style lang="scss" scoped>

</style>
