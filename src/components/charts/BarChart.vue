<template>
  <div>
    <div v-if="this.stacked" class="row q-pa-sm">
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
      v-if="this.selectedTransductor !== '' || !this.stacked">
      <apexcharts
      id="chart"
      type="bar"
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
    'option',
    'unit'
  ],

  data () {
    return {
      min: 0,
      max: 5,
      dates: [],
      phase_a: [],
      phase_b: [],
      phase_c: [],
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
          min: 0,
          max: this.max + 20,
          tickAmount: 5,
          labels: {
            formatter: this.labelFormatter
          }
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
              return `${val.toFixed(3)} ${this.unit || ''}`
            }
          }
        }
      }
    }
  },

  methods: {
    updateChart () {
      let endDate
      let startDate

      this.selectedPeriod = 'DIA'

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
        // a = `http://localhost:8001/graph/${this.url}/?start_date=2019-01-01 00:00&end_date=2019-10-30 20:00`
        axios
          .get(a)
          .then((res) => {
            const data = res.data.results[0]
            console.log(data)
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

    this.updateChart()
  }
}
</script>

<style scoped>
  #chart {
    padding: .5rem;
  }
</style>
