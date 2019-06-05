<template>
  <b-container>
    <b-row>
      <b-col>
        <apexcharts
          width="100%"
          :options="chartOptions"
          :series="series"/>
      </b-col>
    </b-row>
    <div class="actions">
      <b-dropdown id="dropdown-1" text="Dados" class="m-md-2">
        <b-dropdown-item @click="teste('voltage')">Voltage</b-dropdown-item>
        <b-dropdown-item @click="teste('current')">Current</b-dropdown-item>
        <b-dropdown-item @click="teste('active_power')">Active Power</b-dropdown-item>
        <b-dropdown-item @click="teste('apparent_power')">Apparent Power</b-dropdown-item>
        <b-dropdown-item @click="teste('dht_current')">DHT Current</b-dropdown-item>
        <b-dropdown-item @click="teste('dht_voltage')">DHT Voltage</b-dropdown-item>
        <b-dropdown-item @click="teste('power_factor')">Power Factor</b-dropdown-item>
        <b-dropdown-item @click="teste('reactive_power')">Reactive Power</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
      </b-dropdown>
      <button @click="">DIA</button>
      <button @click="">SEMANA</button>
      <button @click="">MÊS</button>
    </div>
  </b-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  components: {
    apexcharts: VueApexCharts
  },
  data () {
    return {
      ready: false,
      api: {
        categories: [],
        dataset: []
      },
      object: {},
      arguments: {
        measurement_a: '',
        measurement_b: '',
        measurement_c: ''
      },
      values: {
        min: 99999,
        max: 0
      },
      dataSet: {
        measurement_a: {
          values: [],
          labels: []
        },
        measurement_b: {
          values: [],
          labels: []
        },
        measurement_c: {
          values: [],
          labels: []
        }
      }
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
        labels: this.dataSet.measurement_a.labels,
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
          min: this.values.min,
          max: this.values.max,
          tickAmount: 5,
          labels: {
            formatter: this.labelFormatter
          }
        }
      }
    },
    series () {
      return [
        {
          name: this.arguments.measurement_a,
          type: 'line',
          data: this.dataSet.measurement_a.values,
        },
        {
          name: this.arguments.measurement_b,
          type: 'line',
          data: this.dataSet.measurement_b.values,
        },
        {
          name: this.arguments.measurement_c,
          type: 'line',
          data: this.dataSet.measurement_c.values,
        }
      ]
    }
  },
  methods: {
    updateChartAxis () {
      axios
        .get(`http://localhost:8000/minutely_measurements/`)
        .then((res) => {
          this.object = res.data
          console.log(this.object)
        })
    },
    formattedDate (date) {
      let result = date.split('T')
      let dateValue, timeValue
      dateValue = result[0].split('-')
      dateValue = dateValue[1] + '/' + dateValue[2] + '/' + dateValue[0]
      timeValue = result[1]

      return dateValue + ' ' + timeValue
    },
    createGraphData (dataset, dataType, measurementType) {
      let formattedDates = []
      let values = []
      let date, value

      for (let i = 0; i < dataset.length; i++) {
        date = dataset[i]['collection_date']
        date = this.formattedDate(date)
        value = dataset[i][dataType]

        if (i !== 259 && i !== 461) {
          formattedDates.push(date)
          values.push(value)
        }
      }
      this.values.min = Math.min(this.values.min, ...values)
      // console.log(this.values.min)
      this.values.max = Math.max(this.values.max, ...values)
      // console.log(this.values.max)

      this.dataSet[measurementType].values = values
      this.dataSet[measurementType].labels = formattedDates
    },
    labelFormatter (value) {
      return value.toFixed(2)
    },
    teste (measurement) {
      this.values.min = 99999
      this.values.max = 0
      this.arguments.measurement_a = measurement + '_a'
      this.createGraphData(this.object, this.arguments.measurement_a, 'measurement_a')
      this.arguments.measurement_b = measurement + '_b'
      this.createGraphData(this.object, this.arguments.measurement_b, 'measurement_b')
      this.arguments.measurement_c = measurement + '_c'
      this.createGraphData(this.object, this.arguments.measurement_c, 'measurement_c')
    }
  },
  beforeMount () {
    this.updateChartAxis()
  }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
