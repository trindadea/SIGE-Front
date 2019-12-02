<template>
  <div class="q-py-sm bg-white">
    <div class="row">
      <!-- col-lg-5 q-col-gutter-none -->
      <div class="col-6  q-pa-md-lg q-col-gutter-none q-pa-lg">
        <!-- <h2 class="text-center text-h4 text-grey-9 q-ma-sm text-capitalize">
          Lista de medidores
        </h2> -->

        <div class="">
          <!-- <status-table
            class="text-h6"
            :data="transductors"
            :dark="false"
          /> -->

          <!-- style="height: 800px!important" -->
          <l-map
            class="rounded-borders"
            style="height: 625px!important"
            :zoom="15"
            :min-zoom="15"
            :max-zoom="15"
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
          <vue-footer/>
        </div>
      </div>

      <!-- col-lg-6 offset-lg-1 -->
      <div class="col-6  q-pa-md-lg q-col-gutter-none q-pa-lg">
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
        <!-- <status-table
          class="text-h6"
          :data="transductors"
          :dark="false"
        /> -->

        <!-- <h2 class="text-center text-grey-9 q-ma-sm q-pa-none text-h5 text-capitalize">
          Estado dos medidores
        </h2> -->

        <div class="q-pa-md row items-start q-gutter-md">

          <router-link
            class="asdf"
            v-for="transductor in transductors"
            :key="transductor.id"
            :to="`${transductor.serial_number}/detail`"
          >
            <q-card
              bordered
              flat
              class="my-card"

            >
              <q-card-section>
                <div class="text-h6">
                  {{ transductor.location }} <q-icon name="fas fa-circle" :class="getColorStatus(transductor.broken)"/>
                </div>
                <div class="text-subtitle2">
                  Nº serial: {{ transductor.serial_number }}
                </div>
              </q-card-section>
            </q-card>
          </router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import StatusTable from 'components/presentationDashboard/StatusTable.vue'
import BarChartPresentation from '../charts/BarChartPresentation.vue'
import Footer from 'components/presentationDashboard/Footer.vue'
import { LMap, LTileLayer, LCircle, LPopup } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

export default {
  components: {
    BarChartPresentation,
    // StatusTable,
    LMap,
    LTileLayer,
    LCircle,
    LPopup,
    'vue-footer': Footer
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

      // center: [-15.763636, -47.872534],
      center: [-15.7650, -47.8665],

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
        .get(`http://192.168.100.229:8001/energy_transductors/`)
        .then((res) => {
          this.transductors = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getColorStatus (isBroken) {
      return isBroken ? 'text-red-9' : 'text-green-9'
    }
  },

  beforeMount () {
    this.getTransductorStatus()
  }
}

</script>

<style scoped>
  .asdf {
    text-decoration: none;
    color: inherit;
  }
</style>
