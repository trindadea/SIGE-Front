<template>
  <div class="row justify-center">
    <div class="col-md-4 col-lg-5 q-pa-md">
      <q-form
        class="q-gutter-md"
        @validation-success="addTransductor()">
        <h3 class="text-secondary">
          Novo transdutor
        </h3>
        <q-input
          outlined
          v-model="serial_number"
          label="Número serial"
          mask="#######"
          lazy-rules
          :rules="[ val => val && val.length > 7 || 'Insira um número serial válido.']"/>
        <q-input
          outlined
          v-model="ip_address"
          label="Endereço IP"
          lazy-rules
          :rules="[  val => val && val.match('^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$') && val.length > 0 || 'Insira um endereço IP válido.']"/>
        <q-input
          outlined
          v-model="location"
          label="Localização física do transdutor"
          hint="Ex.: Sala do orientador de estágio"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Insira uma localização.']"/>
        <q-input
          outlined
          type = "number"
          v-model="latitude"
          label="Latitude"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Insira uma latitude válida.']"/>
        <q-input
          outlined
          type = "number"
          v-model="longitude"
          label="Longitude"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'insira uma longitude válida.']"/>
        <!-- <div class="row justify-center"> -->
          <q-toggle
            v-model="active"
            :label="active ? 'Transdutor se encontra: ativado' : 'Transdutor se encontra: desativado'" />
          <q-select
          outlined
          label="Modelo do transdutor"
          v-model="selectedTransductorModel"
          :options="transductorModels"
          option-label="name">
          </q-select>
        <q-btn
        size="1rem"
          label="Enviar"
          type="submit"
          color="primary"/>
        <q-btn
          size="1rem"
          @click="reset_fields()"
          label="Cancelar"
          color="negative"
          type="reset"/>
      <!-- <div class="row justify-center"> -->
      <!-- </div> -->
      </q-form>
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
    },
    reset_fields () {
      this.trans_model_name = ''
      this.trans_model_serial = ''
      this.trans_model_transport = ''
    }

  },
  created () {
    this.getTransductorModels()
  }
}
</script>

<style>
</style>
