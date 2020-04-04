<template>
  <div class="row justify-center">
    <div class="col-md-4 col-lg-5 q-pa-md">
      <q-form
        class="q-gutter-md"
        @validation-success="send">
        <h3 class="text-secondary">
          Novo servidor
        </h3>
        <span
          :class="'text-capitalize text- text-' + messageType"
          v-if="message !== ''">
          {{ message }}
        </span>
        <q-input
          outlined
          name="slaveIp"
          v-model="slaveIp"
          label="Endereço do servidor"
          :rules="[ val => val.length === 15 && val.match('^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$') || 'Esse campo deve conter um endereço ip válido' ]"/>
        <q-input
          outlined
          name="location"
          v-model="location"
          label="Local do servidor"
          :rules="[ val =>  val.length <= 50 || 'Esse campo deve conter entre 1 e 50 caracteres' ]"/>
        <q-toggle
          v-model="slaveStatus"
          :label="'Status do servidor: ' + (slaveStatus ? 'Ativo' : 'Inativo')"
          color="primary"/>

        <div>
          <q-btn
            size="1rem"
            label="Enviar"
            color="primary"
            type="submit"
            :loading="loading"/>
        </div>
        <!-- <q-btn
          size="1rem"
          @click="reset_fields()"
          label="Cancelar"
          color="negative"
          type="reset"/> -->
      </q-form>
    </div>
  </div>
</template>

<script>
import HTTP from '../../services/masterApi/http-common'

export default {
  data () {
    return {
      slaveIp: '',
      location: '',
      slaveStatus: false,

      message: '',
      messageType: '',
      response: false,
      loading: false
    }
  },

  computed: {
    chooseFields () {
      return ''
    }
  },

  methods: {
    send () {
      const masterAddress = 'http://192.168.100.24:8001' || process.env.MASTER_URL
      const data = {
        ip_address: this.slaveIp,
        location: this.location,
        transductors: []
      }

      console.log(data)
      this.loading = true

      HTTP
        .post(`${masterAddress}/slaves/`, data)
        .then((res) => {
          this.loading = false
          console.log(res)
          this.messageType = 'success'
          this.message = 'Criado com sucesso!'
        })
        .catch((err) => {
          this.loading = false
          console.error(err)
          this.messageType = 'negative'
          this.message = err.message
        })
    },
    reset_fields () {
      this.slaveIp = ''
      this.location = ''
      this.slaveStatus = false
    }
  },

  created () {
    const masterUrl = ''
    HTTP
      .get(`${masterUrl}/campi/`)
      .then((res) => {
        console.log(res.data)
        this.availableCampi = res.data
        console.log(this.availableCampi)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
</script>

<style>
</style>
