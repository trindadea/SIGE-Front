<template>
  <div class="q-py-sm bg-white">
    <h1 class="text-center q-pl-sm text-grey-10 main-tile text-h3 text-capitalize">
      faculdade de tecnologia
    </h1>
    <div class="row">
      <div class="col-6 col-lg-5 q-col-gutter-none">
        <h2 class="text-center text-grey-9 q-ma-sm q-pa-none text-h4 text-capitalize">
          lorem ipsum dolor sit amet
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

      <div class="col-6 col-lg-6 offset-lg-1 q-pa-md-lg q-col-gutter-none q-pa-lg">
        <h2 class="text-center text-h4 text-grey-9 q-ma-sm text-capitalize">
          Lista de transdutores
        </h2>

          <!-- style="height: 800px!important" -->
        <l-map
          class="rounded-borders"
          style="height: 550px!important"
          :zoom="18"
          :min-zoom="18"
          :max-zoom="18"
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
            <l-popup :content="transductor.name" />
          </l-circle>
        </l-map>
      </div>
    </div>

    <!-- <span class="q-ma-sm q-pa-sm"></span> -->

    <div class="row">
      <div class="col-6 col-lg-5 q-col-gutter-none q-pa-lg">
        <h2 class="text-center text-grey-9 q-ma-sm q-pa-none text-h4 text-capitalize">
          lorem ipsum dolor sit amet
        </h2>
        <bar-chart-presentation
          title="Consumo"
          url="quarterly_consumption_off_peak"
          graphic_type="1"
          :stacked="false"
          :labels="['Consumo']"
          unit="kW"
        />
      </div>
      <div class="col-6 col-lg-6 offset-lg-1 q-pa-sm q-col-gutter-none q-pa-lg">
        <h2 class="text-center text-h4 text-grey-9 q-ma-sm text-capitalize">
          Lista de transdutores
        </h2>
        <status-table
          :data="transductors"
          :dark="false"
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
          console.log('===============================================')
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
