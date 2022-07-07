<template>
  <q-no-ssr>
    <apexcharts type="bar" height="500" :options="chartConf" :series="series" />
  </q-no-ssr>
</template>

<script>
export default {
  name: "BarChart",
  components: {
    Apexcharts: () => import("vue-apexcharts"),
  },
  props: [
    "isCostPage",
    "chartTitle",
    "exportOptions",
    "chartOptions",
    "totalCostChart",
  ],
  computed: {
    graph() {
      if (this.isCostPage) {
        return this.totalCostChart;
      }
      return this.chartOptions;
    },
    series() {
      return [
        {
          name: this.graph.dimension,
          data: this.graph.values,
        },
      ];
    },
    chartConf() {
      const {location, dimension, startDate, endDate} = this.exportOptions
      const { unit, max } = this.graph
      
      const tick = max <= 10 ? max + 1 : 11;
      const _max = max < 1 ? 1 : undefined;
      
      const filename = 
        (location ? location + " - " : "") +
        (dimension ? dimension + " - " : "") +
        (startDate + "-" + endDate);

      return {
        colors: ["#00417e"],

        title: {
          text: this.chartTitle,
          align: "center",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "24px",
            fontWeight: "300",
            fontFamily: "Roboto",
            color: "#00417e",
          },
        },

        grid: {
          strokeDashArray: 0,
          xaxis: {
            type: "datetime",
            show: true,
            labels: {
              style: {
                fontSize: ".8rem",
              },
            },
          },
        },

        dataLabels: {
          enabled: false,
        },

        xaxis: {
          type: "datetime",
          show: true,
          labels: {
            datetimeUTC: false,
            style: {
              fontSize: ".8rem",
            },
          },
        },

        yaxis: {
          labels: {
            formatter: (val) => {
              if (unit === "R$") {
                return unit + " " + val.toFixed(this.decimals || 0);
              }
              return val.toFixed(this.decimals || 0) + " " + unit;
            },
            style: {
              fontSize: "1rem",
            },
          },
          max: _max,
          decimalsInFloat: 2,
          tickAmount: tick,
        },

        tooltip: {
          x: {
            format: "dd-MM-yyyy HH:mm",
            formatter: undefined,
          },
          y: {
            formatter: (val) => {
              if (unit === "R$") {
                return ` ${unit} ${val.toFixed(1)}`;
              }
              return `${val.toFixed(1)} ${unit}`;
            },
          },
        },

        chart: {
          stacked: false,
          toolbar: {
            export: {
              csv: {
                filename: filename,
              },

              svg: {
                filename: filename,
              },

              png: {
                filename: filename,
              },
            },
          },
        },
      };
    },
  },
};
</script>
