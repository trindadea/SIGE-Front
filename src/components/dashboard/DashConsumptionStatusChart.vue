<template>
  <div>
    <!-- <apexcharts
      :options="chartOptions"
      :series="series"/> -->
    fddsfsdf
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'

export default {
  name: 'DashConsumptionStatusChart',

  components: {},

  data () {
    return {
      consumption: 0,

      chartOptions: {
        annotations: {
          yaxis: [
            {
              y: 375 /* Valor da demanda contratada */,
              strokeDashArray: 6,
              borderColor: '#ff0',
              label: {
                borderWidth: 0,
                text: '$',
                textAnchor: 'center',
                position: 'left',
                offsetX: 0,
                offsetY: 8,
                style: {
                  background: '#00101F',
                  color: '#ff0',
                  fontSize: '14px',
                  padding: {
                    left: 0,
                    right: 0,
                    top: 4,
                    bottom: 2
                  }
                }
              }
            }
          ]
        },

        chart: {
          type: 'area',
          height: 96,
          width: 174,
          background: '#00101F',
          toolbar: {
            show: false
          }
        },

        dataLabels: {
          enabled: false
        },

        fill: {
          opacity: 1,
          colors: ['#339CFF'],
          gradient: {
            type: 'horizontal',
            shadeIntensity: 1,
            gradientToColors: ['#f00'],
            opacityFrom: 1,
            opacityTo: 1,
            stops: [
              75,
              75
            ] /* Porcentagem da demanda contratada em relação à demanda real */
          }
        },

        grid: {
          show: true,
          borderColor: '#00101F'
        },

        legend: {
          show: false
        },

        series: [
          {
            data: [0, 500]
          }
        ],

        stroke: {
          curve: 'straight',
          show: false
        },

        theme: {
          mode: 'dark'
        },

        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },

        yaxis: {
          show: false,
          tickAmount: 2,
          axisBorder: {
            show: false
          }
        }
      }
    }
  },

  mounted () {
    var options = {
      annotations: {
        yaxis: [
          {
            y: 375 /* Valor da demanda contratada */,
            strokeDashArray: 6,
            borderColor: '#ff0',
            label: {
              borderWidth: 0,
              text: '$',
              textAnchor: 'center',
              position: 'left',
              offsetX: 0,
              offsetY: 8,
              style: {
                background: '#00101F',
                color: '#ff0',
                fontSize: '14px',
                padding: {
                  left: 0,
                  right: 0,
                  top: 4,
                  bottom: 2
                }
              }
            }
          }
        ]
      },

      chart: {
        type: 'area',
        height: 96,
        width: 174,
        background: '#00101F',
        toolbar: {
          show: false
        }
      },

      dataLabels: {
        enabled: false
      },

      fill: {
        opacity: 1,
        colors: ['#339CFF'],
        gradient: {
          type: 'horizontal',
          shadeIntensity: 1,
          gradientToColors: ['#f00'],
          opacityFrom: 1,
          opacityTo: 1,
          stops: [
            75,
            75
          ] /* Porcentagem da demanda contratada em relação à demanda real */
        }
      },

      grid: {
        show: true,
        borderColor: '#00101F'
      },

      legend: {
        show: false
      },

      series: [
        {
          data: [0, 500]
        }
      ],

      stroke: {
        curve: 'straight',
        show: false
      },

      theme: {
        mode: 'dark'
      },

      xaxis: {
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },

      yaxis: {
        show: false,
        tickAmount: 2,
        axisBorder: {
          show: false
        }
      }
    }
    var chart1 = new ApexCharts(document.querySelector('#chart1'), options)
    chart1.render()

    options.series[0].data[1] = 278
    options.fill.gradient.stops = [100, 100] /* Porcentagem da demanda contratada em relação à demanda real */
    var chart2 = new ApexCharts(document.querySelector('#chart2'), options)
    chart2.render()

    options.series[0].data[1] = 5000
    options.fill.gradient.stops = [7, 7] /* Porcentagem da demanda contratada em relação à demanda real */
    options.annotations.yaxis[0].label.position = 'right'
    var chart3 = new ApexCharts(document.querySelector('#chart3'), options)
    chart3.render()
  }
}
</script>

<style lang="scss" scoped>
  @import url(https://fonts.googleapis.com/css?family=Roboto);

body {
  font-family: 'Roboto', sans-serif;
}

h3{
  text-align:center;
  margin-top:50px;
}

#chart1, #chart2, #chart3 {
  width: 174px;
  margin: 15px auto 50px;
}

</style>
