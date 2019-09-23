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
      v-if="series[0].data !== []" class="row">
      <apexcharts
      id="chart"
      type="line"
      :options="chartOptions"
      :series="series"/>
    </div>
    <no-data-placeholder v-else/>
  </q-page>
</template>

<script>
// width="50%"
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    'apexcharts': VueApexCharts
  },

  props: [
    'title',
    'labels',
    'url',
    'graphic_type'
  ],

  data () {
    return {
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
    chartOptions () {
      return {
        annotations: {
          xaxis: [],
          yaxis: []
        },
        tooltip: {
          x: {
            format: 'dd-MM-yyyy HH:mm',
            formatter: undefined
          }
        },
        chart: {
          shadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#3333ee', '#33ee33', '#ee3333'],
        dataLabels: {
          enabled: false
        },
        title: {
          text: '',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
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
        stroke: {
          width: [2, 2, 2],
          curve: 'smooth'
        },
        markers: {
          size: 0
        },
        labels: this.labels,
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
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      }
    },
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
        if(graphic_type === 1) {
          
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
        
        }
        else {
          let date

          let currentA
          let currentB
          let currentC

          let formattedDates = []

          let currentAList = []
          let currentBList = []
          let currentCList = []

          for (let measurement of measurements) {
            date = measurement['collection_date']
            date = this.formattedDate(date)

            currentA = measurement['current_a']
            currentB = measurement['current_b']
            currentC = measurement['current_c']

            formattedDates.push(date)

            currentAList.push(currentA)
            currentBList.push(currentB)
            currentCList.push(currentC)
          }

          this.setInformations(currentAList, currentBList, currentCList, formattedDates)
        }
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
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
  
      this.periodsOptions['Hoje'] = this.getTodayInterval()
      this.periodsOptions['Últimos 7 dias'] = this.getLastWeek()
      this.periodsOptions['Últimos 30 dias'] = this.getLastMonth()
  
      this.updateChart()
      console.log()
    }
  // beforeMount () {
  //   // this.chartOptions = this.options
  //   this.chartSeries = this.series
  //   this.chartOptions.yaxis = this.yaxis
  //   this.chartOptions.yaxis.min = this.minBoundary
  //   this.chartOptions.yaxis.max = this.maxBoundary
  //   this.chartOptions.xaxis = this.xaxis
  //   this.chartOptions.colors = this.colors
  //   this.chartOptions.title.text = this.title
  //   this.chartOptions.annotations.xaxis = this.xannotations
  //   this.chartOptions.annotations.yaxis = this.yannotations
  // }
}
</script>

<style scoped>
  #chart {
    padding: .5rem
  }
</style>