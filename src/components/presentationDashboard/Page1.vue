<template>
  <div class="q-py-sm bg-white">
    <div class="row">
      <div class="col-6 col-lg-5 q-col-gutter-none q-pa-md-lg q-col-gutter-none q-pa-lg">
        <h2 class="text-center text-h4 text-grey-9 q-ma-sm text-capitalize">
          Lista de medidores
        </h2>

        <div class="">
          <status-table
            class="text-h6"
            :data="transductors"
            :dark="false"
          />

          <!-- style="height: 800px!important" -->
          <l-map
            class="rounded-borders"
            style="height: 300px!important"
            :zoom="17"
            :min-zoom="17"
            :max-zoom="17"
            :center="center"
            :options="mapOptions"
            id="region-map">
            <l-tile-layer
              :url="url"
              :attribution="attribution"
            />
            <l-circle
              v-for="transductor in transductors_points"
              :key="transductor.id"
              :lat-lng="transductor.coordinates"
              :radius="7"
              :l-style="transductor.style"
              :hover="true"
            >
            <l-popup
              :content="transductor.name"
            />
            </l-circle>
          </l-map>
          aqui vao ficar os parceiros
        </div>
      </div>

      <div class="col-6 col-lg-6 offset-lg-1 q-pa-md-lg q-col-gutter-none q-pa-lg">
        <h2 class="text-center text-grey-9 q-ma-sm q-pa-none text-h4 text-capitalize">
          consumo mensal
        </h2>
        <bar-chart-presentation
          title="Geração"
          url="quarterly_generated_energy_off_peak"
          graphic_type="1"
          :stacked="false"
          :labels="['Geração']"
          unit="kW"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatusTable from 'components/presentationDashboard/StatusTable.vue'
import BarChartPresentation from '../charts/BarChartPresentation.vue'
import { LMap, LTileLayer, LCircle, LPopup } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

export default {
  components: {
    BarChartPresentation,
    StatusTable,
    LMap,
    LTileLayer,
    LCircle,
    LPopup
  },
  data () {
    return {
      url1: process.env,

      transductors: [],

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

      transductors_points: [
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
