<template>
  <div class="q-pr-md q-ma-none">
      <!-- :center="mapCenter" -->
    <l-map
      style="height: 53.9vh!important"
      class="rounded-borders cursor-not-allowed"
      :zoom="currentCampus.zoom_ratio"
      :min-zoom="currentCampus.zoom_ratio"
      :max-zoom="currentCampus.zoom_ratio"
      :center="[currentCampus.geolocation_latitude, currentCampus.geolocation_longitude]"
      :options="mapOptions"
      id="region-map">

      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />

      <!-- for custom icons -->
      <!-- <l-marker
        v-for="transductor in transductors_points"
        :key="transductor.id"
        :lat-lng="transductor.coordinates">
        <l-icon
          :icon-anchor="transductor.coordinates"
          :icon-size="[120, 120]">
          <img src="statics/icons/ic_ocorrencia_1.svg">
        </l-icon>
      </l-marker> -->

      <l-circle
        v-for="transductor in transductors_points"
        :key="transductor.id"
        :lat-lng="transductor.coordinates"
        :radius="14"
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
    // 'l-marker': Vue2Leaflet.LMarker,
    // 'l-icon': Vue2Leaflet.LIcon,
    'l-map': Vue2Leaflet.LMap,
    'l-circle': Vue2Leaflet.LCircle,
    'l-tile-layer': Vue2Leaflet.LTileLayer
  },

  props: {
    transductors: {
      type: Array,
      required: true
    },
    currentCampus: Object,
    selectedTransductor: Object
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
      new_center: [0, 0],

      mapOptions: {
        zoomControl: false,
        maxbounds: this.center
      },

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
      arr = []
      if (this.transductors === 0) {
        return []
      }

      this.transductors.forEach(t => {
        arr.push(
          {
            id: t.id,
            name: t.name,
            coordinates: [t.geolocation_latitude, t.geolocation_longitude],
            style: {
              color: !t.broken ? 'green' : 'silver',
              fillColor: !t.broken ? 'lime' : '#FF0000',
              fillOpacity: 1
            }
          }
        )
      })

      return arr
    },
    mapCenter () {
      const arrOfTransductorPoints = this.transductors_points

      if (arrOfTransductorPoints.length !== 0) {
        return arrOfTransductorPoints[Math.floor(Math.random() * arrOfTransductorPoints.length)].coordinates
      }
      // let current = this.selectedTransductor

      // if (current) {
      //   return [current.geolocation_latitude, current.geolocation_longitude]
      // }

      return [-15.9895825, -48.0447814]
    }

  },

  methods: {
    getColorStatus (isBroken) {
      return isBroken ? 'text-red-9' : 'text-green-9'
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
