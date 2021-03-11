<template>
  <div class="map-wrapper">
    <l-map
      class="rounded-borders cursor-not-allowed map-dimension"
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
        v-for="transductor in transductors_points"
        :key="transductor.id"
        :lat-lng="transductor.coordinates">
        <l-icon
          :icon-size="[16, 16]">
          <img :src="transductor.img_src">
        </l-icon>
      </l-marker>

      <l-line
        v-for="line in lines"
        :key="line.id"
        :lat-lngs="line.coordinates"
        :color="line.color"
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
    'l-tile-layer': Vue2Leaflet.LTileLayer,
    'l-line': Vue2Leaflet.LPolyline
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
    unifilarDiagram: {
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
      const arr = []
      if (this.transductors === 0) {
        return [[], []]
      }

      const mapTrans = {}
      let i = 4
      // Mark occurences in mapTrans
      this.occurences.forEach(occ => {
        occ.forEach(o => {
          mapTrans[o.transductor] = `statics/ic_ocorrencia_${i}.svg`
        })
        i -= 1
      })

      this.transductors.forEach(t => {
        if (mapTrans[t.id]) {
          arr.push({
            id: t.id,
            name: t.name,
            coordinates: [t.geolocation_latitude, t.geolocation_longitude],
            img_src: mapTrans[t.id]
          })
        } else {
          arr.push({
            id: t.id,
            name: t.name,
            coordinates: [t.geolocation_latitude, t.geolocation_longitude],
            img_src: 'statics/ic_sem_ocorrencia.svg'

          })
        }
      })

      return arr
    },
    lines () {
      let arr = []
      arr = []
      if (this.unifilarDiagram === 0) {
        return []
      }

      this.unifilarDiagram.forEach(point => {
        arr.push({
          id: point.id,
          coordinates: [[point.start_lat, point.start_lng], [point.end_lat, point.end_lng]],
          color: '#98274d'
        })
      })

      return arr
    },
    mapCenter () {
      if (!(this.currentCampus.geolocation_latitude)) {
        if (this.currentCampus.name.toLowerCase().includes('gama')) {
          return [15.9894 - 48.0443] // gama's geo-pos
        } else {
          return [-15.7636, -47.8694] // darcy's geo-pos
        }
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
  .map-dimension {
    height: 53.9vh;
  }

  .map-wrapper {
    padding-right: 16px;
  }

  @media screen and (max-width: 1440px) {
    .map-dimension {
      height: 100% !important;
    }
  }

  @media screen and (max-width: 800px) {
    .map-wrapper {
      padding-right: 0 !important;
    }

    .map-dimension {
      height: 53.9vh !important;
    }
  }
</style>
