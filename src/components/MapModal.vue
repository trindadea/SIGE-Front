<template>
  <q-dialog
    v-model="openMap"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-space/>
        <q-btn dense flat icon="close" @click="changeMapStatus()">
          <q-tooltip content-class="bg-white text-primary">Fechar</q-tooltip>
        </q-btn>
      </q-bar>

      <l-map
        class="rounded-borders"
        style="height: 95%!important"
        :zoom="200"
        :center="center"
        id="region-map">
        <l-tile-layer
          :url="url"
          :attribution="attribution"
        />
        <l-circle
          :lat-lng="center"
          :radius="4"
          :fill-opacity="1"
        >
        </l-circle>
      </l-map>

    </q-card>
  </q-dialog>
</template>
<script>
import Vue2Leaflet from '../services/ssr-import/leaflet'
import 'leaflet/dist/leaflet.css'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MapModal',
  components: {
    'l-map': Vue2Leaflet.LMap,
    'l-tile-layer': Vue2Leaflet.LTileLayer,
    'l-circle': Vue2Leaflet.LCircle
  },
  props: [
    'center'
  ],
  computed: {
    ...mapGetters('transductorStore', ['openMap'])
  },
  data () {
    return {
      maximizedToggle: true,
      colors: [
        '#023E73',
        '#F29F05',
        '#088521'
      ],
      mapOptions: {
        maxbounds: this.center
      },

      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  methods: {
    ...mapActions('transductorStore', ['changeMapStatus'])
  }
}
</script>
