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
    <!-- {{chartOptions.xaxis.categories}} -->
    <hr>
    <!-- {{series}} -->
  </b-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'

export default {
  name: "HelloWorld",
  components: {
    apexcharts: VueApexCharts
  },
  data() {
    return {
      object: {}
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          stacked: false
        },
        stroke: {
          width: [2, 2, 2],
          curve: "smooth"
        },
        plotOptions: {
          bar: {
            columnWidth: "50%"
          }
        },
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: this.createGraphData(this.object, "BRL")[0],
        markers: {
          size: 0
        },
        xaxis: {
          type: "datetime",
          show: false
        },
        yaxis: {
          title: {
            text: "Voltage"
          },
          min: 1,
          max: 4.5,
          tickAmount: 6,
          labels: {
            formatter: this.labelFormatter
          },
          min: 0
        }
      }
    },
    series() {
      return [
        {
          name: "BRL",
          type: "line",
          data: this.createGraphData(this.object, "BRL")[1],
          labels: []
        },
        {
          name: "MYR",
          type: "line",
          data: this.createGraphData(this.object, "MYR")[1],
          labels: []
        },
        {
          name: "SGD",
          type: "line",
          data: this.createGraphData(this.object, "SGD")[1],
          labels: []
        }
      ]
    }
  },
  methods: {
    updateChartAxis () {
      let start = '2018-01-01'
      let end = '2019-01-01'
      let a = []
      let b = []
      axios
        .get(`https://api.exchangeratesapi.io/history?start_at=${start}&end_at=${end}&base=USD`)
        .then((res) => {
          this.object = res.data.rates
        })
    },
    createDates (dataset) {
      let keys = []
      for (let k in dataset) keys.push(k)

      keys.sort((a,b) => {
        a = a.split("-").join("")
        b = b.split("-").join("")
        return a.localeCompare(b)
      })

      return keys
    },
    createGraphData (dataset, coin) {
      let unformatted_keys = this.createDates(dataset)
      let formatted_keys = []
      let value

      // console.log(unformatted_keys)

      for(let k = 0; k < unformatted_keys.length; k++) {
        value = unformatted_keys[k].split("-")
        value = value[1] + "/" + value[2] + "/" + value[0]
        formatted_keys.push(value)
      }

      console.log(formatted_keys)

      let values = []

      unformatted_keys.forEach((k, i) => {
        values.push(dataset[k][coin])
      })

      return [formatted_keys, values]
    },
    labelFormatter (value) {
      return value.toFixed(2)
    },
    averageDataPerYear (dataset) {
      const keys = this.createDates(dataset)
      let date_year = []
      let rates_average = []
      let mid = 0
      let counter = 0

      let actual = "";
      keys.forEach((k, i) => {
        mid += dataset[k].BRL
        counter += 1
        if(k.slice(0, 4) != actual){
          if(actual === ""){
            actual = k.slice(0, 4)
          }else{
            if(k.slice(0, 4) != actual){
              date_year.push(actual)
              rates_average.push(mid/counter)
              actual = k.slice(0, 4)
              mid = 0
              counter = 0
            }
          }
        }
      })

    return [date_year, rates_average]
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
