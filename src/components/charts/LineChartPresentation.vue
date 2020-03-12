<template>
  <div>
    <div style="padding: 1.5em;" v-if="this.$store.state.chartOptions.status">
      <apexcharts
        v-if="mounted"
        id="chart"
        type="line"
        :options="chartOptions"
        :series="series"/>
    </div>
    <no-data-placeholder
      style="padding: 1.5em;"
      v-else
      info="Para visualizar os dados é necessária a seleção de uma dimensão,
        assim como um intervalo de dados."
    />
  </div>
</template>

<script>
import apexcharts from '../../services/ssr-import/apexcharts'
import noDataPlaceholder from './NoDataPlaceholder'

export default {
  components: {
    apexcharts: apexcharts,
    noDataPlaceholder: noDataPlaceholder
  },
  props: [
    'graphic_type',
    'show_legend',
    'id',
    'min',
    'decimals',
    'max'
  ],

  data () {
    return {
      measurements: [],
      mounted: false
    }
  },
  mounted () {
    this.mounted = true
  },
  computed: {
    series () {
      let chartData = this.$store.getters.chartOptions

      if (this.graphic_type === '1') {
        return [
          {
            name: 'asdfadsf',
            data: chartData.phase_a
          }
        ]
      } else {
        return [
          {
            name: 'Fase A',
            data: chartData.phase_a
          },
          {
            name: 'Fase B',
            data: chartData.phase_b
          },
          {
            name: 'Fase C',
            data: chartData.phase_c
          }
        ]
      }
    },

    chartOptions () {
      let chartData = this.$store.getters.chartOptions

      return {
        colors: ['#46b5d1', '#007944', '#da2d2d'],

        chart: {
          stacked: false
        },

        legend: {
          show: this.show_legend
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
          enabled: false,
          formatter: (val) => {
            return `${val.toFixed(0)} ${chartData.unit}`
          },
          style: {
            fontSize: '1rem'
          },
          offsetY: 20
        },

        markers: {
          size: 0
        },

        xaxis: {
          type: 'datetime',
          show: true,
          labels: {
            style: {
              fontSize: '.8rem'
            }
          }
        },

        yaxis: {
          labels: {
            formatter: (val) => {
              return val.toFixed(this.decimals || 0) + ' ' + chartData.unit
            },
            style: {
              fontSize: '1rem'
            }
          },
          min: this.min,
          max: this.max,
          decimalsInFloat: 2,
          tickAmount: 10
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
              return `${val.toFixed(1)} ${chartData.unit}`
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  #chart {
    padding: .5rem;
    colors: #147900;
  }
</style>
