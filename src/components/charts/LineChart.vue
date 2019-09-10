<template>
  <apexcharts
    id="chart"
    type="line"
    :options="chartOptions"
    :series="chartSeries"/>
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
    'colors'
  ],

  data () {
    return {
      chartSeries: [],
      chartOptions: {
        annotations: {
          xaxis: [],
          yaxis: []
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
          enabled: true
        },
        stroke: {
          curve: 'smooth'
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
        markers: {
          size: 5
        },
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

  computed: {
    minBoundary () {
      return Math.min(...this.series) + 5
    },
    maxBoundary () {
      return Math.max(...this.series) + 5
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