<template>
  <q-page>
    <div v-if="!this.stacked" class="row q-pa-sm">
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
      v-if="this.selectedTransductor !== '' || this.stacked"
    >
      <apexcharts
      id="chart"
      type="bar"
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
    'stacked',
    'labels',
    'option'
  ],

  data () {
    return {
      min: 0,
      max: 5,
      dates: [],
      fase_a: [],
      fase_b: [],
      fase_c: [],
      measurements: [],
      transductorList: [],
      selectedCampus: '',
      selectedTransductor: '',
      selectedPeriod: 'Hoje'
    }
  },

  computed: {
    series () {
      if (this.graphic_type === '1') {
        return [
          {
            name: this.labels[0],
            data: this.fase_a
          }
        ]
      } else {
        return [
          {
            name: this.labels[0],
            data: this.fase_a
          },
          {
            name: this.labels[1],
            data: this.fase_b
          },
          {
            name: this.labels[2],
            data: this.fase_c
          }
        ]
      }
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
            text: this.title
          },
          labels: {
            formatter: this.labelFormatter
          },
          min: 0,
          max: this.max + 20,
          tickAmount: 5
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
            format: 'dd/MM/yyyy HH:mm',
            formatter: undefined
          }
        }
      }
    }
  },

  methods: {
    updateChart () {
      let endDate
      let startDate

      console.log('AAAA')

      if (this.selectedPeriod === 'DIA') {
        endDate = moment().endOf('day').format('YYYY-MM-DD h:mm')
        startDate = moment().startOf('day').format('YYYY-MM-DD h:mm')
      } else if (this.selectedPeriod === 'SEMANA') {
        endDate = moment().endOf('isoWeek').format('YYYY-MM-DD h:mm')
        startDate = moment().startOf('isoWeek').format('YYYY-MM-DD h:mm')
      } else if (this.selectedPeriod === 'MÊS') {
        endDate = moment().startOf('month').format('YYYY-MM-DD h:mm')
        startDate = moment().startOf('month').format('YYYY-MM-DD h:mm')
      }

      if (this.selectedTransductor !== undefined) {
        let a = `http://127.0.0.1:8001/graph/${this.url}/?serial_number=${this.selectedTransductor}&start_date=${startDate}&end_date=${endDate}`
        a = `http://localhost:8001/graph/${this.url}/?start_date=2019-01-01 00:00&end_date=2019-10-30 20:00`
        console.log(a)
        axios
          .get(a)
          .then((res) => {
            const data = res.data.results[0]
            this.buildGraphInformation(data)
          })
          .catch((err) => console.log(err))
      }
    },

    buildGraphInformation (data) {
      if (this.graphic_type === '1') {
        this.min = data.min
        this.max = data.max
        this.setOneFaseInformations(data.measurements)
      } else {
        let faseAList = data.phase_a
        let faseBList = data.phase_b
        let faseCList = data.phase_c
        this.setThreeFaseInformations(faseAList, faseBList, faseCList)
      }
    },

    setOneFaseInformations (measurementList) {
      this.fase_a = measurementList
      // console.log(this.fase_a)
    },

    setThreeFaseInformations (faseAList, faseBList, faseCList) {
      this.fase_a = faseAList
      this.fase_b = faseBList
      this.fase_c = faseCList
    },

    labelFormatter (value) {
      return value.toFixed(2)
    },

    setTransductorList (transductorList) {
      this.transductorList = transductorList
    },

    getTransductors () {
      axios
        .get(`http://0.0.0.0:8001/energy_transductors/`)
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

    this.updateChart()
  }
}
</script>

<style scoped>
  #chart {
    padding: .5rem
  }
</style>
