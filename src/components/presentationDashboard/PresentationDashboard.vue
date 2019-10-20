<template>
  <div>
    <q-layout view="hhh lpR fff">

      <presentation-header/>

      <q-page-container>
        <router-view />
        <div class="container q-my-lg">
          <div class="row">
            <div class="col-6 col-lg-5">
                <h5 class="text-left text-grey-7 q-ma-sm">
                  Geração
                </h5>
              <div class="flex justify-center">
                <q-btn
                  flat
                  dense
                  class="q-ma-sm q-px-md bg-grey-4 text-grey-10"
                  text-color="black"
                  label="Dia" />
                <q-btn
                  flat
                  dense
                  class="q-ma-sm q-px-md bg-grey-4 text-grey-10"
                  text-color="black"
                  label="Semana" />
                <q-btn
                  flat
                  dense
                  class="q-ma-sm q-px-md bg-grey-4 text-grey-10"
                  text-color="black"
                  label="Mês" />
              </div>
              <apexcharts
                id="chart"
                type="bar"
                :options="chartOptions"
                :series="series" />
            </div>
            <div class="col-6 col-lg-5 col-lg-offset-2 q-pa-md-lg">
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
                  :lat-lng="transductor.coordinates"
                  :radius="7"
                  :l-style="transductor.style"
                  :hover="true"
                >
                  <l-popup :content="transductor.name" />
                </l-circle>
              </l-map>
            </div>
          </div>
          <div class="row">
            <div class="col-6 col-lg-5">
                <h5 class="text-left text-grey-7 q-ma-sm">
                  Consumo
                </h5>
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
            <div class="col-6 col-lg-5 col-lg-offset-2 q-pa-sm">
              <status-table
                :data="[]"
                :dark="false"
              />
              <!-- <h6
              v-for="transductor in transductors"
              :key="transductor.id">
                O - {{transductor.name}}
              </h6> -->
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
      generation: [],

      center: [-15.763636, -47.872534],

      // center: L.latLng(-15.763636, -47.872534),
      mapOptions: { zoomControl: false },

      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      transductors: [
        {
          id: 1,
          name: 'Transdutor FT I',
          coordinates: [-15.7632, -47.8730366666666],
          style: {
            color: 'green',
            fillColor: 'green',
            fillOpacity: 1
          }
        },
        {
          id: 2,
          name: 'Transdutor FT II',
          coordinates: [-15.7642, -47.8726],
          style: {
            color: 'green',
            fillColor: 'green',
            fillOpacity: 1
          }
        },
        {
          id: 3,
          name: 'Transdutor FT III',
          coordinates: [-15.7638, -47.8719],
          style: {
            color: 'green',
            fillColor: 'green',
            fillOpacity: 1
          }
        }
      ]
    }
  },

  computed: {
    series () {
      return [
        {
          name: 'Fase A',
          data: [[1, 2], [2, 3], [4, 5]]
        }
      ]
    },

    chartOptions () {
      return {
        chart: {
          stacked: false
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
          min: parseInt(this.y_min, 10),
          max: parseInt(this.y_max, 10),
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
    getPowerGenerationData () {
      axios
        .get(`http://localhost:8001/graph/consumption/`)
        .then(res => {
          this.generation = res.data
          console.log(this.generation)
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
    }
  }
}
</script>

<style lang="scss">
  .black-test-border {
    border: 1em black solid;
  }

  .container {
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
</style>
