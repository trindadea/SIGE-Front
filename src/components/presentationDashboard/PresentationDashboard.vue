<template>
  <div>
    <q-layout view="hhh lpR fff">

      <presentation-header/>

      <q-page-container class="bg-grey-2">
        <router-view />
        <div class="container q-py-lg bg-white">
          <h1 class="text-center text-grey-10 main-tile text-capitalize">
            faculdade de tecnologia
          </h1>
          <div class="row">
            <div class="col-6 col-lg-5 q-col-gutter-none">
                <h5 class="text-left text-grey-9 q-ma-sm q-pa-lg">
                  Transductor list
                </h5>
                <status-table
                :data="[]"
                :dark="false"
                />
                <h6
                v-for="transductor in transductors"
                :key="transductor.id">
                  O - {{transductor.location}}
                </h6>
            </div>
            <div class="col-6 col-lg-6 offset-lg-1 q-pa-md-lg q-col-gutter-none q-pa-lg map-class">
              <l-map
                class="rounded-borders"
                :zoom="17"
                :min-zoom="3.2"
                :center="center"
                :options="mapOptions"
                id="region-map">
                <l-tile-layer
                  :url="url"
                  :attribution="attribution"
                />
                <l-circle
                  v-for="transductor in transductors"
                  :key="transductor.id"
                  :lat-lng="[transductor.latitude, transductor.longitude]"
                  :radius="7"
                  :l-style="collorFunction(transductor.broken)"
                  :hover="true"
                >
                  <l-popup :content="transductor.location" />
                </l-circle>
              </l-map>
            </div>
          </div>

          <span class="q-ma-lg q-pa-lg"></span>

          <div class="row">
            <div class="col-2 col-lg-6 offset-lg-1 q-pa-sm q-col-gutter-none q-pa-lg">
            </div>
            <div class="col-8 col-lg-5 q-col-gutter-none q-pa-lg">
              <div class="flex justify-center">
                <h5 class="text-left text-grey-9 q-ma-sm">
                  Gráfico de consumo de energia
                </h5>
              </div>
              <div class="flex justify-center">
                <q-btn
                  flat
                  dense
                  class="q-ma-sm q-px-md bg-grey-4 text-grey-10"
                  text-color="black"
                  label="Dia"
                />
                <q-btn
                  flat
                  dense
                  class="q-ma-sm q-px-md bg-grey-4 text-grey-10"
                  text-color="black"
                  label="Semana"
                />
                <q-btn
                  flat
                  dense
                  class="q-ma-sm q-px-md bg-grey-4 text-grey-10"
                  text-color="black"
                  label="Mês"
                />
              </div>
              <apexcharts
                id="chart"
                type="bar"
                :options="chartOptions"
                :series="series"
              />
            </div>
          </div>
        </div>
      </q-page-container>

      <presentation-footer/>

    </q-layout>
  </div>
</template>

<script>
import { LMap, LTileLayer, LCircle, LPopup } from 'vue2-leaflet'
// import LineChart from 'components/charts/LineChart.vue'
import VueApexCharts from 'vue-apexcharts'
import PresentationFooter from 'components/presentationDashboard/Footer.vue'
import PresentationHeader from 'components/presentationDashboard/Header.vue'
import StatusTable from 'components/presentationDashboard/StatusTable.vue'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

export default {
  components: {
    // linechart: LineChart,
    apexcharts: VueApexCharts,
    StatusTable,
    PresentationHeader,
    PresentationFooter,
    LMap,
    LTileLayer,
    LCircle,
    LPopup
  },
  data () {
    return {
      colors: [
        '#023E73',
        '#F29F05',
        '#088521'
      ],

      generation: [],

      center: [-15.763609, -47.872596],

      // center: L.latLng(-15.763636, -47.872534),
      mapOptions: {
        zoomControl: false,
        maxbounds: this.center,
        attributionControl: false
      },

      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      transductors: []
    }
  },

  computed: {
    series () {
      return [
        {
          name: 'Geração',
          data: [[1, 2], [2, 3], [4, 5]]
        },
        {
          name: 'Consumo',
          data: [[1, 4], [2, 5], [4, 2]]
        }
      ]
    },

    chartOptions () {
      return {
        chart: {
          stacked: true
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
          opacity: [0.85, 0.25, 1],
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
          enabled: false
        },

        markers: {
          size: 0
        },

        xaxis: {
          type: 'datetime',
          show: false
        },

        yaxis: {
          title: {
            text: 'Geração'
          },
          min: 0,
          max: 10,
          tickAmount: 5
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
          }
        }
      }
    }
  },
  methods: {
    collorFunction (transductorStatus) {
      if (transductorStatus) {
        return {
          color: 'red',
          fillColor: 'red',
          fillOpacity: 1
        }
      } else {
        return {
          color: 'green',
          fillColor: 'green',
          fillOpacity: 1
        }
      }
    },

    getPowerGenerationData () {
      axios
        .get(`http://localhost:8001/graph/consumption/`)
        .then(res => {
          this.generation = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getTransductorStatus () {
      axios
        .get(`http://localhost:8001/graph/`)
        .then((res) => {

        })
        .catch((err) => {
          console.log(err)
        })
    },
    getTransductors () {
      axios
        .get(`http://0.0.0.0:8001/energy_transductors`)
        .then((res) => {
          const transductors = res.data

          this.transductors = transductors
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  beforeMount () {
    this.getTransductors()
  }
}
</script>

<style lang="scss">
  .black-test-border {
    border: 1em black solid;
  }

  .container-header {
    // quasar breakpoints: https://quasar.dev/style/breakpoints
    @media (min-width: 1024px) {
      padding-right: 5%;
      padding-left: 5%;

      h1, h2, h3, h4, h5, h6 {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }
  .container {
        // quasar breakpoints: https://quasar.dev/style/breakpoints
    @media (min-width: 1024px) {
      margin-right: 5%;
      margin-left: 5%;

      h1, h2, h3, h4, h5, h6 {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }

  .main-tile {
    margin-top: 2.5em;
    margin-bottom: 2.5em;
  }

  .unb-blue {
    background-color: rgba(0, 64, 126, 100%);
  }

  .map-class {
    min-height: 30rem
  }
</style>
