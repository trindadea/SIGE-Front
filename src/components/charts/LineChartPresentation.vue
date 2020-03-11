<template>
  <div>
    <div style="padding: 1.5em;" v-if="hasAllData()">
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
import MASTER from '../../services/masterApi/http-common'
import apexcharts from '../../services/ssr-import/apexcharts'
import NoDataPlaceholder from './NoDataPlaceholder'

export default {
  components: {
    apexcharts: apexcharts,
    NoDataPlaceholder: NoDataPlaceholder
  },
  props: [
    'url',
    'graphic_type',
    'show_legend',
    'unit',
    'id',
    'min',
    'decimals',
    'max',
    'transductorId',
    'startDate',
    'endDate'
  ],

  data () {
    return {
      phase_a: [],
      phase_b: [],
      phase_c: [],
      measurements: [],
      mounted: false
    }
  },

  computed: {
    series () {
      if (this.graphic_type === '1') {
        return [
          {
            name: 'asdfadsf',
            data: this.phase_a
          }
        ]
      } else {
        return [
          {
            name: 'Fase A',
            data: this.phase_a
          },
          {
            name: 'Fase B',
            data: this.phase_b
          },
          {
            name: 'Fase C',
            data: this.phase_c
          }
        ]
      }
    },
    chartOptions () {
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
            return `${val.toFixed(0)} ${this.unit}`
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
              return val.toFixed(this.decimals || 0) + ' ' + this.unit
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
              return `${val.toFixed(1)} ${this.unit}`
            }
          }
        }
      }
    }
  },

  methods: {
    buildGraphInformation (data) {
      if (this.graphic_type === '1') {
        console.log(data.measurements)
        this.setOneFaseInformations(data.measurements)
      } else {
        let phaseAList = data['phase_a']
        let phaseBList = data['phase_b']
        let phaseCList = data['phase_c']

        this.setThreeFaseInformations(phaseAList, phaseBList, phaseCList)
      }
    },

    setThreeFaseInformations (measurementListA, measurementListB, measurementListC) {
      this.phase_a = measurementListA
      this.phase_b = measurementListB
      this.phase_c = measurementListC
    },

    hasAllData () {
      if (this.url !== undefined &&
        this.transductorId !== undefined &&
        this.startDate !== undefined &&
        this.endDate !== undefined) {
        return true
      } else {
        return false
      }
    }
  },

  mounted () {
    this.mounted = true
    const a = `/graph/${this.url}/?serial_number=${this.transductorId}&start_date=${this.startDate}&end_date=${this.endDate}&is_filtered=True`
    console.log('ta montando?????')

    MASTER
      .get(a)
      .then((res) => {
        const measurements = res.data[0]
        this.buildGraphInformation(measurements)
      })
      .catch((err) => console.log(err))
  }
}
</script>

<style scoped>
  #chart {
    padding: .5rem;
    colors: #147900;
  }
</style>
