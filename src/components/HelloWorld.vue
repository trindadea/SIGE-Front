<template>
  <b-container>
    <b-row>
      <b-col>
        <apexcharts
          width="100%"
          :options="chartOptions"
          :series="series"/>
      </b-col>
      <b-col>
        <apexcharts
          width="100%"
          :options="chartOptions2"
          :series="series"/>
      </b-col>
      <b-col>
        <apexcharts
          width="100%"
          :options="chartOptions3"
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
      a: {}
    }
  },

  computed: {
    chartOptions () {
      return {
        chart: {
          id: 'vuechart-example',
          type: 'line',
          zoom: {
            enabled: true,
            // type: 'x',
            // zoomedArea: {
            //   fill: {
            //     color: '#90CAF9',
            //     opacity: 0.4
            //   },
            //   stroke: {
            //     color: '#0D47A1',
            //     opacity: 0.4,
            //     width: 1
            //   }
            // }
          }
        },
        xaxis: {
          categories: this.createDates(this.a),
          labels: {
            type: "datetime",
            show: false
          }
        },
        yaxis: {
          min: 1,
          max: 4.5,
          tickAmount: 6,
          labels: {
            formatter: this.labelFormatter
          }
        },
        dataLabels: {
          enabled: false,
        }
      }
    },
    chartOptions2 () {
      return {
        chart: {
          id: 'vuechart-example',
          type: 'area',
          zoom: {
            enabled: true,
            type: 'x',
            zoomedArea: {
              fill: {
                color: '#90CAF9',
                opacity: 0.4
              },
              stroke: {
                color: '#0D47A1',
                opacity: 0.4,
                width: 1
              }
            }
          }
        },
        xaxis: {
          categories: this.createDates(this.a),
          labels: {
            type: "datetime",
            show: false
          }
        },
        yaxis: {
          min: 1,
          max: 4.5,
          tickAmount: 6,
          labels: {
            formatter: this.labelFormatter
          }
        },
        dataLabels: {
          enabled: false,
        }
      }
    },
    chartOptions3 () {
      return {
        chart: {
          id: 'vuechart-example',
          type: 'bar',
          zoom: {
            enabled: true,
            type: 'x',
            zoomedArea: {
              fill: {
                color: '#90CAF9',
                opacity: 0.4
              },
              stroke: {
                color: '#0D47A1',
                opacity: 0.4,
                width: 1
              }
            }
          }
        },
        xaxis: {
          categories: this.averageDataPerYear(this.a)[0],
          labels: {
            type: "datetime",
            show: false
          }
        },
        yaxis: {
          min: 1,
          max: 4.5,
          tickAmount: 6,
          labels: {
            formatter: this.labelFormatter
          }
        },
        dataLabels: {
          enabled: false,
        }
      }
    },

    series () {
      return [{data: this.averageDataPerYear(this.a)[1]}]
    }
  },

  methods: {
    updateChartAxis () {
      let start = '2010-01-01'
      let end = '2019-01-01'
      let a = []
      let b = []
      axios
        .get(`https://api.exchangeratesapi.io/history?start_at=${start}&end_at=${end}&base=USD`)
        .then((res) => {
          this.a = res.data.rates
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
    getData (dataset) {
      const keys = this.createDates(dataset)
      let rates = []
      keys.forEach((k, i) => {
        rates.push(dataset[k].BRL)
      })
      return rates
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
  },
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
