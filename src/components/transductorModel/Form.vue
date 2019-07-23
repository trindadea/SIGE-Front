<template>
  <div class="row justify-center">
    <div class="col-md-4 col-lg-5 q-pa-md">
      <q-form
        class="q-gutter-md"
        @submit="send">
        <h3 class="text-secondary">
          Novo modelo de transdutor
        </h3>
        <!-- <span
          v-if="response"
          :class="'bg-' + messageType">
          {{ message }}
        </span>
        <span
          class="justify-center text-center"
          v-if="loading">
          <q-circular-progress
            size="25px"
            :thickness="0.22"
            color="purple"
            track-color="grey-3"/>
        </span> -->
        <q-input
          outlined
          name="model_name"
          v-model="trans_model_name"
          label="Nome do modelo"
          :rules="[ val => val && val.lenght > 0 && val.lenght <=50 || 'Esse campo deve conter entre 1 e 50 caracteres' ]"/>
        <q-input
          outlined
          name="model_name"
          v-model="trans_model_serial"
          label="Protocolo serial"
          :rules="[ val => val && val.lenght > 0 && val.lenght <=50 || 'Esse campo deve conter entre 1 e 50 caracteres' ]"/>
        <q-input
          outlined
          name="model_name"
          v-model="trans_model_transport"
          label="Protocolo de transporte"
          :rules="[ val => val && val.lenght > 0 && val.lenght <=50 || 'Esse campo deve conter entre 1 e 50 caracteres' ]"/>
        <q-btn
          size="1rem"
          label="Enviar"
          color="primary"
          type="submit"/>
        <q-btn
          size="1rem"
          @click="reset_fields()"
          label="Cancelar"
          color="negative"
          type="reset"/>
      </q-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      trans_model_name: '',
      trans_model_serial: '',
      trans_model_transport: '',
      message: '',
      messageType: '',
      response: false,
      loading: false
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
      this.loading = true

      axios
        .post(`${endpointMaster}/transductor_models/`, data)
        .then((res) => {
          this.loading = false
          console.log(res)
          this.messageType = 'success'
          this.message = 'Criado com sucesso!'
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.messageType = 'negative'
          this.message = err.message
        })
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
