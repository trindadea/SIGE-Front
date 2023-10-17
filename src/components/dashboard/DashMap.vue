<template>
  <div class="map-wrapper">
    <l-map class="rounded-borders cursor-not-allowed map-dimension" :bounds="mapBounds" :options="mapOptions"
      id="region-map">

      <l-tile-layer :url="url" :attribution="attribution" />

      <l-marker v-for="transductor in transductors_points" :key="transductor.id" :lat-lng="transductor.coordinates">
        <l-icon :icon-size="[16, 16]">
          <img :src="transductor.img_src">
        </l-icon>
      </l-marker>

      <l-line v-for="line in lines" :key="line.id" :lat-lngs="line.coordinates" :color="line.color" />

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

  data() {
    return {
      url1: process.env,

      colors: [
        '#023E73',
        '#F29F05',
        '#088521'
      ],

      generation: [],

      center: [-15.7650, -47.8665],
      new_center: [-15.7658756, -47.8743207],
      zoom_ratio: parseInt(this.currentCampus.zoom_ratio),

      mapOptions: {
        zoomControl: false
      },

      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      selectedPeriod: 'DIA'
    }
  },

  computed: {
    transductors_points() {
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
    lines() {
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
    mapBounds() {
      const arr = []
      if (this.transductors.length > 0) {
        this.transductors.forEach((point) => {
          const latlng = []
          latlng.push(point.geolocation_latitude)
          latlng.push(point.geolocation_longitude)
          arr.push(latlng)
        })
      } else {
        return [
          [-16.124765, -48.235374],
          [-15.499674, -47.413761]
        ];
      }
      return arr
    }
  },

  methods: {
    getColorStatus(isBroken) {
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

::v-deep .leaflet-layer {
  filter: invert(100%) hue-rotate(180deg) brightness(100%) contrast(85%);
}

.vue2leaflet-map {
  background: #23201C;
}
</style>
