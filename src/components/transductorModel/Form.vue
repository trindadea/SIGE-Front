<template>
  <div class="q-pa-md">
    <h2>stuff</h2>
    <q-form
      class="q-gutter-md"
      @submit="send">
      <q-input
        name="model_name"
        v-model="trans_model_name"
        label="Nome"/>
      <q-option-group
        v-model="trans_model_serial"
        :options="serial_options"
        color="primary" />
      <q-option-group
        name="model_transport"
        :options="transport_options"
        v-model="trans_model_transport"
        label="Transporte serial"
        color="primary"/>
      <q-btn
        label="Enviar"
        type="submit"/>
      <q-btn
        @click="reset_fields()"
        label="Cancelar"
        type="reset"/>
    </q-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  // name: 'ComponentName',
  data () {
    return {
      serial_options: [
        { label: 'teste1', value: 'sadf2' },
        { label: 'teste2', value: 'sadf3' },
        { label: 'teste3', value: 'sadf4' }
      ],

      transport_options: [
        { label: 'teste1', value: 'sadf5' },
        { label: 'teste2', value: 'sadf3' },
        { label: 'teste3', value: 'sadf59' }
      ],

      trans_model_name: '',
      trans_model_serial: '',
      trans_model_transport: ''
    }
  },

  methods: {
    send () {
      let endpointMaster = 'http://192.168.100.241:8001'
      const data = {
        name: this.trans_model_name,
        serial_protocol: this.trans_model_serial,
        transport_protocol: this.trans_model_transport
      }

      console.log(data)

      axios
        .post(`${endpointMaster}/transductor_models/`, data)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => { console.log(err) })
    },
    reset_fields () {
      this.trans_model_name = ''
      this.trans_model_serial = ''
      this.trans_model_transport = ''
    }
  }
}
</script>

<style>
</style>
