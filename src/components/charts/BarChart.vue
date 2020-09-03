<template>
  <q-no-ssr>
      <apexcharts type="bar" height="500" :options="chartOptions" :series="series" />
  </q-no-ssr>
</template>

<script>
export default {
  name: 'BarChart',
  components: {
    Apexcharts: () => import('vue-apexcharts')
  },
  props: [
    'unit'
  ],
  data () {
    return {
      min: 0,
      series: [{
        name: 'Custo total',
        data: [1176161.05, 1021364.82, 983322.41, 1211139.45, 1563437.43, 1022631.37, 1000487.55, 880484.34, 1133119.42, 1104629.39, 1338607.05, 1251423.70]
      }],
      chartOptions: {
        colors: ['#00417e'],
        grid: {
          strokeDashArray: 0,
          xaxis: {
            type: 'datetime',
            show: true,
            labels: {
              style: {
                fontSize: '.8rem'
              }
            }
          }
        },
        title: {
          text: 'Column',
          align: 'left',
          style: {
            color: '#FFF'
          }
        },

        dataLabels: {
          enabled: false
        },

        xaxis: {
          categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Óut', 'Nov', 'Dez']
        },

        yaxis: {
          min: 0,
          labels: {
            formatter: this.labelFormatter,
            style: {
              fontSize: '1rem'
            }
          },
          tickAmount: 10
        }
      }
    }
  },
  methods: {
    labelFormatter (value) {
      return this.unit + ' ' + value.toFixed(2)
    }
  }
}
</script>
