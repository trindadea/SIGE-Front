<template>
    <div style="padding: 1.5em;" v-if="this.chartOptions.status">
      <q-no-ssr>
        <chart-container v-bind:loadingStatus="getPhaseChartLoadingStatus">
          <apexcharts
            v-if="mounted"
            id="chart"
            ref="chart"
            type="line"
            @hook:mounted="updateAnnotations"
            :options="chartConf"
            :series="series"/>
        </chart-container>
      </q-no-ssr>
    </div>
    <no-data-placeholder
      style="padding: 1.5em;"
      v-else
      info="Para visualizar os dados é necessária a seleção de uma dimensão,
        assim como um intervalo de dados."
    />
</template>

<script>
import noDataPlaceholder from '../NoDataPlaceHolder.vue'
import { mapGetters } from 'vuex'
import ChartContainer from './ChartContainer.vue'

export default {
  components: {
    Apexcharts: () => import('vue-apexcharts'),
    noDataPlaceholder: noDataPlaceholder,
    ChartContainer
  },
  props: [
    'graphic_type',
    'show_legend',
    'id',
    'min',
    'max',
    'chartTitle',
    'exportOptions'
  ],

  data () {
    const USED_VOLTAGE = 220
    return {
      measurements: [],
      mounted: false,
      annotations: {
        tensão: {
          yaxis: [
            {
              y: USED_VOLTAGE * 0.91,
              borderColor: '#d1d146',
              borderWidth: '2px',
              strokeDashArray: false,
              label: {
                borderColor: '#d1d146',
                style: {
                  color: '#FFFFFF',
                  background: '#d1d146',
                  fontSize: '16px'
                },
                text: 'Precária'
              }
            },

            {
              y: USED_VOLTAGE * 1.04,
              borderColor: '#d1d146',
              borderWidth: '2px',
              strokeDashArray: false,
              label: {
                borderColor: '#d1d146',
                style: {
                  color: '#FFFFFF',
                  background: '#d1d146',
                  fontSize: '16px'
                },
                text: 'Precária'
              }
            },

            {
              y: USED_VOLTAGE * 0.86,
              borderColor: '#d14646',
              borderWidth: '2px',
              strokeDashArray: false,
              label: {
                borderColor: '#d14646',
                style: {
                  color: '#FFFFFF',
                  background: '#d14646',
                  fontSize: '16px'
                },
                text: 'Crítica'
              }
            },

            {
              y: USED_VOLTAGE * 1.06,
              borderColor: '#d14646',
              borderWidth: '2px',
              strokeDashArray: false,
              label: {
                borderColor: '#d14646',
                style: {
                  color: '#FFFFFF',
                  background: '#d14646',
                  fontSize: '16px'
                },
                text: 'Crítica'
              }
            }
          ]
        }
      }
    }
  },

  methods: {
    updateAnnotations () {
      const dimensionAnnotations = this.annotations[this.filterOptions.dimension.toLowerCase()]
      this.$refs.chart.clearAnnotations()

      if (dimensionAnnotations) {
        dimensionAnnotations.yaxis.forEach((annotation) => {
          this.$refs.chart.addYaxisAnnotation(annotation)
        })
      }
    }
  },

  mounted () {
    this.mounted = true
  },

  computed: {
    ...mapGetters('transductorStore', ['chartOptions', 'filterOptions', 'getPhaseChartLoadingStatus']),
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
              return val.toFixed(this.chartOptions.decimals || 0) + ' ' + this.chartOptions.unit
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
  },

  watch: {
    series: function () {
      this.updateAnnotations()
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
