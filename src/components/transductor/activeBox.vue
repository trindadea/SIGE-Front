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
        v-if="lat !== null && long !== null"
        outline
        class="map-button"
        label="Ver no mapa"
        @click="openMap()"
      />
    </div>
    <map-modal :center='[lat, long]'/>
  </q-card>
</template>
<script>
import MASTER from '../../services/masterApi/http-common'
import mapModal from './mapModal'

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
      lat: null,
      long: null,
      name: '',
      campusName: '',
      campusId: 0
    }
  },
  async created () {
    await MASTER
      .get('/energy-transductors/' + this.id)
      .then((res) => {
        this.active = res.data.active
        this.lat = res.data.geolocation_latitude
        this.long = res.data.geolocation_longitude
        this.name = res.data.name
        this.campusId = parseInt(res.data.campus.split('/')[4], 10)
      })
      .catch(err => {
        console.log(err)
      })
    await MASTER
      .get('/campi/' + this.campusId)
      .then((res) => {
        this.campusName = res.data.name
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    openMap () {
      this.$store.commit('changeMapStatus')
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
