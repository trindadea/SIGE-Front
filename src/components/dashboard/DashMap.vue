<template>
  <div class="q-pr-sm q-ma-none">
    <l-map
      class="rounded-borders"
      style="height: 500px!important"
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
    </l-map>
  </div>
</template>

<script>
import Vue2Leaflet from '../../services/ssr-import/leaflet'
import 'leaflet/dist/leaflet.css'
// import HTTP from '../../services/masterApi/http-common'

export default {
  components: {
    'l-map': Vue2Leaflet.LMap,
    // 'l-circle': Vue2Leaflet.LCircle,
    // 'l-popup': Vue2Leaflet.LPopup,
    'l-tile-layer': Vue2Leaflet.LTileLayer
  },

  props: {
    transductors: {
      type: Array,
      default: () => { return [] }
    }
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

      // center: [-15.763636, -47.872534],
      center: [-15.7650, -47.8665],

      mapOptions: {
        zoomControl: false,
        maxbounds: this.center
      },

      // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      url: 'https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png',
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      selectedPeriod: 'DIA'
    }
  },

  computed: {
    // transductors_points () {
    //   let arr = []

    //   this.transductors.forEach(transductor => {
    //     arr.push(
    //       {
    //         id: transductor.id,
    //         name: transductor.location,
    //         coordinates: [transductor.latitude, transductor.longitude],
    //         style: {
    //           color: 'green',
    //           fillColor: 'lime',
    //           fillOpacity: 1
    //         }
    //       }
    //     )
    //   })
    //   return arr
    // }
  },

  methods: {
    getColorStatus (isBroken) {
      return isBroken ? 'text-red-9' : 'text-green-9'
    }
  },

  beforeMount () {
    // this.getTransductorStatus()
  }
}

</script>

<style scoped>
</style>
