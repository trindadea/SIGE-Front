<template>
  <div
      v-if="chartSeries[0].data !== []"
  >
    <apexcharts
      id="chart"
      type="line"
      :options="chartOptions"
      :series="chartSeries"/>
  </div>
</template>

<script>
// width="50%"
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    'apexcharts': VueApexCharts
  },

  props: [
    'series',
    'xaxis',
    'yaxis',
    'yannotations',
    'xannotations',
    'title',
    'colors',
    'labels'
  ],

  data () {
    return {

    }
  },

  computed: {
    chartSeries () {
      console.log(this.series)
      return this.series
    },
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
        xaxis: {},
        yaxis: {},
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      }
    }
  },

  beforeMount () {
    // this.chartOptions = this.options
    this.chartSeries = this.series
    this.chartOptions.yaxis = this.yaxis
    this.chartOptions.yaxis.min = this.minBoundary
    this.chartOptions.yaxis.max = this.maxBoundary
    this.chartOptions.xaxis = this.xaxis
    this.chartOptions.colors = this.colors
    this.chartOptions.title.text = this.title
    this.chartOptions.annotations.xaxis = this.xannotations
    this.chartOptions.annotations.yaxis = this.yannotations
  }
}
</script>

<style scoped>
  #chart {
    padding: .5rem
  }
</style>
