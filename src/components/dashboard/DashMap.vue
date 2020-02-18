<template>
  <div class="q-pr-md q-ma-none">
    <!-- style="height: 55vh!important" -->
    <l-map
      class="rounded-borders cursor-not-allowed"
      :zoom="15"
      :min-zoom="15"
      :max-zoom="15"
      :center="new_center"
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
        :radius="18"
        :l-style="transductor.style"
        :hover="true"
      />
    </l-map>
  </div>
</template>

<script>
import Vue2Leaflet from '../../services/ssr-import/leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
    'l-map': Vue2Leaflet.LMap,
    'l-circle': Vue2Leaflet.LCircle,
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

      // center: [-15.7650, -47.8665],
      center: [-15.7650, -47.8665],
      new_center: [],

      mapOptions: {
        zoomControl: false,
        maxbounds: this.center
      },

      // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // url: 'https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png',
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      selectedPeriod: 'DIA'
    }
  },

  computed: {
    transductors_points () {
      let arr = []

      this.transductors.forEach(transductor => {
        arr.push(
          {
            id: transductor.id,
            name: transductor.name,
            coordinates: [transductor.geolocation_latitude, transductor.geolocation_longitude],
            style: {
              color: 'green',
              fillColor: 'lime',
              fillOpacity: 1
            }
          }
        )
      })
      return arr
    }
  },

  methods: {
    getColorStatus (isBroken) {
      return isBroken ? 'text-red-9' : 'text-green-9'
    },

    mapCenter () {
      let arrOfTransductorPoints = this.transductors_points
      return arrOfTransductorPoints[Math.floor(Math.random() * arrOfTransductorPoints.length)].coordinates
    }
  },

  created () {
    this.new_center = this.mapCenter()
  }
}

</script>

<style scoped>
</style>
