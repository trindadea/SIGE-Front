<template>
  <div class="container q-py-lg bg-white">
    <h1 class="text-center text-grey-10 main-tile text-capitalize">
      faculdade de tecnologia
      {{ url1  }}
    </h1>
    <div class="row">
      <div class="col-6 col-lg-5 q-col-gutter-none">
          <h5 class="text-left text-grey-9 q-ma-sm q-pa-lg">
            Gráfico de geração de energia
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
        <!-- <apexcharts
          id="chart"
          type="bar"
          :options="chartOptions"
          :series="getGeneratedEnergy()" /> -->
        <barchart
          title="Geração"
          url="quarterly_generated_energy_off_peak"
          graphic_type="1"
          :stacked="false"
          :labels="['Geração']"
        />
      </div>
      <div class="col-6 col-lg-6 offset-lg-1 q-pa-md-lg q-col-gutter-none q-pa-lg">
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

    <span class="q-ma-lg q-pa-lg"></span>

    <div class="row">
      <div class="col-6 col-lg-5 q-col-gutter-none q-pa-lg">
        <h5 class="text-left text-grey-9 q-ma-sm">
          Gráfico de consumo de energia
        </h5>
        <!-- <apexcharts
          id="chart"
          type="bar"
          :options="chartOptions2"
          :series="series"
        /> -->
        <barchart
          title="Consumo"
          url="quarterly_consumption_off_peak"
          graphic_type="1"
          :stacked="false"
          :labels="['Consumo']"
        />
      </div>
      <div class="col-6 col-lg-6 offset-lg-1 q-pa-sm q-col-gutter-none q-pa-lg">
        <h5 class="text-left text-grey-9 q-ma-sm">
          Lista de transdutores
        </h5>
        <status-table
          :data="transductors"
          :dark="false"
        />
      </div>
    </div>
  </div>

</template>

<script>
import { LMap, LTileLayer, LCircle, LPopup } from 'vue2-leaflet'
// import LineChart from 'components/charts/LineChart.vue'
// import VueApexCharts from 'vue-apexcharts'
import StatusTable from 'components/presentationDashboard/StatusTable.vue'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import BarChartVue from '../charts/BarChart.vue'

export default {
  components: {
    barchart: BarChartVue,
    // apexcharts: VueApexCharts,
    StatusTable,
    LMap,
    LTileLayer,
    LCircle,
    LPopup
  },
  data () {
    return {
      url1: process.env,

      colors: [
        '#023E73',
        '#F29F05',
        '#088521'
      ],

      generation: [],

      center: [-15.763636, -47.872534],

      // center: L.latLng(-15.763636, -47.872534),
      mapOptions: {
        zoomControl: false,
        maxbounds: this.center
      },

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
      ],

      selectedPeriod: 'DIA'
    }
  },

  methods: {
    getTransductorStatus () {
      axios
        .get(`http://localhost:8001/energy_transductors/`)
        .then((res) => {
          this.transductors = res.data
          console.log(this.transductors)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  beforeMount () {
    this.getTransductorStatus()
  }
}

</script>

<style>

</style>
