<template>
  <l-map
    class="rounded-borders"
    style=""
    :zoom="16"
    :min-zoom="16"
    :max-zoom="16"
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
      :radius="15"
      :l-style="transductor.style"
      :hover="true"
    >
    <l-popup
      :content="transductor.name"
    />
    </l-circle>
  </l-map>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import Vue2Leaflet from '../../services/ssr-import/leaflet'

export default {
  components: {
    'l-map': Vue2Leaflet.LMap,
    'l-tile-layer': Vue2Leaflet.LTileLayer,
    'l-circle': Vue2Leaflet.LCircle,
    'l-popup': Vue2Leaflet.LPopup
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
            name: transductor.location,
            coordinates: [transductor.latitude, transductor.longitude],
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
    getTransductorStatus () {},

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
</style>
