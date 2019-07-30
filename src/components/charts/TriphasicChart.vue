<template>
  <apexcharts
    width="100%"
    :options="chartOptions"
    :series="chartSeries"/>
</template>

<script>
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
    'xannotations'
  ],

  data () {
    return {
      chartSeries: [
        {
          name: 'High - 2013',
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: 'Mid - 2013',
          data: [20, 26, 22, 29, 22, 23, 30]
        },
        {
          name: 'Low - 2013',
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
      chartOptions: {
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
        colors: ['#77B6EA', '#545454', '#ee33ee'],
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Average High & Low Temperature',
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

          size: 6
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          title: {
            text: 'Month'
          }
        },
        yaxis: {
          title: {
            text: 'Temperature'
          },
          min: 5,
          max: 40
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        },
        annotations: {}
      }
    }
  },

  beforeMount () {
    this.chartSeries = this.series
    // this.chartOptions = this.options
    this.chartOptions.yaxis = this.yaxis
    this.chartOptions.xaxis = this.xaxis
    this.chartOptions.annotations.xaxis = this.xannotations
    this.chartOptions.annotations.yaxis = this.yannotations
  }
}
</script>

<style>

</style>
