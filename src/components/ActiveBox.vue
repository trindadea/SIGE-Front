<template>
  <q-card class="status-card">
    <q-card-section :class="this.active ? 'active' : 'inactive'">
      <div class="status-title">
        <q-icon :name="this.active ? 'flash_on' : 'flash_off'" />
        {{ this.active ? 'Ativo' : 'Inativo' }}
      </div>
    </q-card-section>
    <div class="card-content">
      <p class="campus" v-if="this.campusName !== ''">
        Campus {{ this.campusName }}
      </p>
      <q-btn
        v-if="latitude !== null && longitude !== null"
        outline
        class="map-button"
        label="Ver no mapa"
        @click="map()"
      />
    </div>
    <map-modal :center="[latitude, longitude]" />
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
  props: ['id'],
  data() {
    return {
      active: false,
      latitude: null,
      longitude: null,
      name: '',
      campusName: '',
      campusId: ''
    }
  },
  async created() {
    await this.getTransductors()
    await this.getCampus()
  },
  methods: {
    ...mapActions('transductorStore', ['changeMapStatus']),
    map() {
      this.changeMapStatus()
    },
    async getTransductors() {
      try {
        const response = await MASTER.get(`/energy-transductors/${this.id}`)

        const { active, latitude, geolocation_longitude, name } = response?.data
        const campusId = response.data.campus?.split('/')?.[4] //  response.data.campus ->  http://164.41.98.3:443/campi/1/
        this.active = active
        this.latitude = latitude
        this.longitude = geolocation_longitude
        this.name = name
        this.campusId = parseInt(campusId, 10)
      } catch (error) {
        console.log(error)
      }
    },
    async getCampus() {
      try {
        const response = await MASTER.get(`/campi/${this.campusId}`)
        this.campusName = response.data.name
      } catch (error) {
        console.log(error)
      }
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
