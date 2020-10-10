<template>
  <div class="q-pr-md q-ma-none">
    <l-map
      style="height: 53.9vh!important"
      class="rounded-borders cursor-not-allowed"
      :zoom="currentCampus.zoom_ratio || 16"
      :min-zoom="currentCampus.zoom_ratio || 16"
      :max-zoom="currentCampus.zoom_ratio || 16"
      :options="mapOptions"
      :center="mapCenter"
      id="region-map">

      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />

      <!-- for custom icons -->
      <l-marker
        v-for="transductor in transductors_points[1]"
        :key="transductor.id"
        :lat-lng="transductor.coordinates">
        <l-icon
          :icon-size="[16, 16]">
          <img :src="transductor.img_src">
        </l-icon>
      </l-marker>

      <l-circle
        v-for="transductor in transductors_points[0]"
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
    'l-marker': Vue2Leaflet.LMarker,
    'l-icon': Vue2Leaflet.LIcon,
    'l-map': Vue2Leaflet.LMap,
    'l-circle': Vue2Leaflet.LCircle,
    'l-tile-layer': Vue2Leaflet.LTileLayer
  },

  props: {
    transductors: {
      type: Array,
      required: true
    },
    occurences: {
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
      new_center: [-15.7658756, -47.8743207],

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
      let arr = [[], []] // First array for non occurrence related and second for occurrences
      arr = [[], []]
      if (this.transductors === 0) {
        return [[], []]
      }

      let mapTrans = {}
      mapTrans = {}

      let i = 1
      // Mark occurences in mapTrans
      this.occurences.forEach(occ => {
        occ.forEach(o => {
          mapTrans[o.transductor] = `statics/ic_ocorrencia_${i}.svg`
        })
        i += 1
      })

      this.transductors.forEach(t => {
        if (mapTrans[t.serial_number]) {
          arr[1].push({
            id: t.id,
            name: t.name,
            coordinates: [t.geolocation_latitude, t.geolocation_longitude],
            img_src: mapTrans[t.serial_number]
          })
        } else {
          arr[0].push({
            id: t.id,
            name: t.name,
            coordinates: [t.geolocation_latitude, t.geolocation_longitude],
            style: {
              color: !t.broken ? 'green' : '#CC0000',
              fillColor: !t.broken ? 'lime' : '#FF0000',
              fillOpacity: 1
            }
          })
        }
      })

      return arr
    },
    mapCenter () {
      if (!(this.currentCampus.geolocation_latitude)) {
        return [-15.7658756, -47.8743207] // darcy's geo-pos
      }
      return [this.currentCampus.geolocation_latitude, this.currentCampus.geolocation_longitude]
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
