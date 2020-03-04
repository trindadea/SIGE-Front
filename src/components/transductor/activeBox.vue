<template>
  <q-card class="status-card">
    <q-card-section :class="this.active? 'active': 'inactive'">
      <div class="status-title">
        <q-icon :name="this.active? 'flash_on' : 'flash_off'" />
        {{this.active?"Ativo" : "Inativo"}}
      </div>
    </q-card-section>
    <div class="card-content">
      <p v-if="this.campusName !== ''">Campus {{this.campusName}}</p>
      <q-btn outline class="map-button" label="Ver no mapa" />
    </div>
  </q-card>
</template>
<script>
import MASTER from '../../services/masterApi/http-common'

export default {
  name: 'ActiveBox',
  props: [
    'id'
  ],
  data () {
    return {
      active: false,
      lat: 0,
      long: 0,
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
        this.lat = res.data.geolocation_longitude
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
  color: #00417e;
}

</style>
