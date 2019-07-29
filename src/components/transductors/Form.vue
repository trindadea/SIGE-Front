<template>
  <div class="row justify-center q-py-lg">
    <div class="col-8 q-mx-lg">
      <q-form>
        <q-input
          filled
          type = "number"
          v-model="serial_number"
          label="Serial Number"
          hint="type the transductor serial number"
          lazy-rules
          :rules="[ val => val && val.length > 7 || 'Please type the transductor serial number']"
        />
        <q-input
          filled
          v-model="ip_address"
          label="IP address"
          hint="type the transductor ip address"
          lazy-rules
          :rules="[  val => val && val.match('^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$') && val.length > 0 || 'Please type the transductor ip address']"
        />
        <q-input
          filled
          v-model="location"
          label="Location"
          hint="type the transductor location"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type the transductor location']"
        />
        <q-input
          filled
          type = "number"
          v-model="latitude"
          label="Latitude"
          hint="type the transductor Latitude"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type the transductor Latitude']"
        />
        <q-input
          filled
          type = "number"
          v-model="longitude"
          label="Longitude"
          hint="type the transductor Longitude"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type the transductor Longitude']"
        />
        <!-- <div class="row justify-center"> -->
          <q-toggle v-model="active" label="Active" />
          <q-select
          outlind
          label="TransductorModel"
          v-model="selectedTransductorModel"
          :options="transductorModels"
          option-label="name"
          >
          </q-select>
      </q-form>
      <div class="row justify-center">
        <q-btn
          label="Create"
          type="submit"
          color="primary"
          @click="addTransductor()"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      serial_number: '',
      ip_address: '',
      location: '',
      latitude: '',
      longitude: '',
      active: true,
      transductorModels: [],
      framework: {
        components: [
          'QForm',
          'QBtnDropdown'
        ]
      }
    }
  },
  methods: {
    addTransductor () {
      const masterUrl = 'http://localhost:8001'
      axios
        .post(`${masterUrl}/energy_transductors/`, {
          serial_number: this.serial_number,
          ip_address: this.ip_address,
          location: this.location,
          latitude: this.latitude,
          longitude: this.longitude,
          active: this.active,
          model: this.transductorModels[this.transductorModelsIndex].url,
          measurements_minutelymeasurement: [],
          measurements_quarterlymeasurement: [],
          measurements_monthlymeasurement: []
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getTransductorModels () {
      const masterUrl = 'http://localhost:8001'
      axios
        .get(`${masterUrl}/transductor_models/`)
        .then((res) => {
          this.transductorModels = res.data
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  beforeMount () {
    this.getTransductorModels()
  }
}
</script>

<style>
</style>
