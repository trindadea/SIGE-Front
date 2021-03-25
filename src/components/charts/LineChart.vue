<template>
  <div>
    <div style="padding: 1.5em;" v-if="this.chartOptions.status">
      <q-no-ssr>
        <apexcharts
          v-if="mounted"
          id="chart"
          type="line"
          :options="chartConf"
          :series="series"/>
      </q-no-ssr>
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
import noDataPlaceholder from '../NoDataPlaceHolder.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Apexcharts: () => import('vue-apexcharts'),
    noDataPlaceholder: noDataPlaceholder
  },
  props: [
    'graphic_type',
    'show_legend',
    'id',
    'min',
    'decimals',
    'max',
    'chartTitle',
    'exportOptions'
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
    ...mapGetters('transductorStore', ['chartOptions']),
    ...mapGetters('userStore', ['getPage']),
    series () {
      if (this.graphic_type === '1') {
        return [
          {
            name: 'asdfadsf',
            data: this.chartOptions.phase_a
          }
        ]
      } else {
        return [
          {
            name: 'Fase A',
            data: this.chartOptions.phase_a
          },
          {
            name: 'Fase B',
            data: this.chartOptions.phase_b
          },
          {
            name: 'Fase C',
            data: this.chartOptions.phase_c
          }
        ]
      }
    },

    chartConf () {
      const filename = (this.exportOptions.location ? (this.exportOptions.location + ' - ') : ('')) +
      (this.exportOptions.dimension ? (this.exportOptions.dimension + ' - ') : ('')) + this.exportOptions.startDate + '-' + this.exportOptions.endDate

      return {
        colors: ['#46b5d1', '#007944', '#da2d2d'],

        chart: {
          stacked: false,
          toolbar: {
            export: {
              csv: {
                filename: filename
              },

              svg: {
                filename: filename
              },

              png: {
                filename: filename
              }
            }
          }
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

        title: {
          text: this.chartTitle,
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '24px',
            fontWeight: '300',
            fontFamily: 'Roboto',
            color: '#00417e'
          }
        },

        dataLabels: {
          enabled: false,
          formatter: (val) => {
            return `${val.toFixed(0)} ${this.chartOptions.unit}`
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
            datetimeUTC: false,
            style: {
              fontSize: '.8rem'
            }
          }
        },

        yaxis: {
          labels: {
            formatter: (val) => {
              return val.toFixed(this.decimals || 0) + ' ' + this.chartOptions.unit
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
              return `${val.toFixed(1)} ${this.chartOptions.unit}`
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
    color: #147900;
  }
</style>
