<template>
  <apexcharts
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
    // 'options',
    'xaxis',
    'yaxis',
    'yannotations',
    'xannotations',
    'title'
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

  beforeMount () {
    this.chartSeries = this.series
    // this.chartOptions = this.options
    this.chartOptions.yaxis = this.yaxis
    this.chartOptions.xaxis = this.xaxis
    this.chartOptions.title.text = this.title
    this.chartOptions.annotations.xaxis = this.xannotations
    this.chartOptions.annotations.yaxis = this.yannotations
  }
}
</script>

<style>

</style>
