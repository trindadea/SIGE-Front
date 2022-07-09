<template>
  <q-card class="status-card">
    <q-card-section :class="this.active? 'active': 'inactive'">
      <div class="status-title">
        <q-icon :name="this.active? 'flash_on' : 'flash_off'" />
        {{this.active?"Ativo" : "Inativo"}}
      </div>
    </q-card-section>
    <div class="card-content">
      <p class="campus" v-if="this.campusName !== ''">Campus {{this.campusName}}</p>
      <q-btn
        v-if="latitude !== null && longitude !== null"
        outline
        class="map-button"
        label="Ver no mapa"
        @click="map()"
      />
    </div>
    <map-modal :center='[latitude, longitude]'/>
  </q-card>
</template>
<script>
import MASTER from '../services/masterApi/http-common'
import mapModal from './MapModal'
import { mapActions } from 'vuex'

export default {
  name: 'ActiveBox',
  components: {
    mapModal: mapModal
  },
  props: [
    'id'
  ],
  data () {
    return {
      active: false,
      latitude: null,
      longitude: null,
      name: '',
      campusName: '',
      campusId: ''
    }
  },
  async created () {
    await this.getTransductors()
    this.getCampi()
  },
  methods: {
    ...mapActions('transductorStore', ['changeMapStatus']),
    map () {
      this.changeMapStatus()
    },
    getTransductors () {
      return new Promise((resolve) => {
        MASTER
          .get('/energy-transductors/' + this.id)
          .then((res) => {
            this.active = res.data.active
            this.latitude = res.data.geolocation_latitude
            this.longitude = res.data.geolocation_longitude
            this.name = res.data.name
            this.campusId = parseInt(res.data.campus.split('/')[4], 10)
            resolve()
          })
          .catch(err => {
            console.log(err)
            resolve()
          })
      })
    },
    getCampi () {
      return new Promise((resolve) => {
        MASTER
          .get('/campi/' + this.campusId)
          .then((res) => {
            this.campusName = res.data.name
            resolve()
          })
          .catch(err => {
            console.log(err)
            resolve()
          })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.status-card {
  text-align: center;
  margin: 10px;
}

.active {
  background-color: #06984d;
  text-align: center;
  padding: 10px;
}
.inactive {
  background-color: #f13209;
  text-align: center;
  padding: 10px;
}

.status-title {
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.25px;
  color: #ffffff;
}

.card-content {
  padding: 10px;
}

.map-button {
  color: $primary;
}
.campus {
  font-size: 16px;
}

</style>
