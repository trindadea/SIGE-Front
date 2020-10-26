<template>
  <div>
    <h3>Lista de Campi </h3>
    <q-btn
      size="1rem"
      label="Novo"
      color="primary"
      @click="handlePressButton('new')"/>
    <div class="container">
      <div class="lst-campi">
        <ul>
          <li v-for="(campi,index) in campis" :key="index">
            <p class="lst-item">
              {{index}} - {{campi.name}} - {{campi.acronym}}
            <q-btn
              size="1rem"
              label="show"
              @click="handlePressButton('show', campi.id)"
              color="primary"/>
              </p>
          </li>
        </ul>
      </div>
      <div class="campi-info" v-if="isCreatingNew">
        <h3 class="login-text">
          Novo Campi
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postCampi()"
          >
          <q-input
            outlined
            v-model="newCampi.name"
            label="Nome do Campi"/>
          <q-input
            outlined
            v-model="newCampi.acronym"
            label="Acronym"/>
          <q-input
            outlined
            v-model="newCampi.geolocation_latitude"
            label="Latitude"/>
          <q-input
            outlined
            v-model="newCampi.geolocation_longitude"
            label="Longitude"/>
          <q-input
            outlined
            v-model="newCampi.zoom_ratio"
            label="Map Zoom"/>
          <div class="text-center q-mt-lg">
            <q-btn
              size="1rem"
              label="Enviar"
              type="submit"
              color="primary"/>
          </div>
        </q-form>
      </div>
      <div class="campi-info" v-if="isSelectedCampi">
        <h3 class="login-text">
          Editar dados
        </h3>
        <p>Id: {{campi.id}}</p>
        <p>Transductors: {{campi.transductors}}</p>
        <q-form
        class="q-gutter-md"
        @submit="putCampi()"
        >
        <q-input
          outlined
          v-model="campi.name"
          label="Nome do Campi"/>
        <q-input
          outlined
          v-model="campi.acronym"
          label="Acronym"/>
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Salvar"
            type="submit"
            color="primary"/>
          <q-btn
            size="1rem"
            label="Deletar"
            @click="deleteCampi(campi.id)"
            color="primary"/>
        </div>
      </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import MASTER from '../services/masterApi/http-common'
// import { mapActions } from 'vuex'

export default {
  name: 'Campis',
  data () {
    return {
      campis: [],
      campi: {},
      isSelectedCampi: false,
      isCreatingNew: false,
      newCampi: {}
    }
  },
  created () {
    this.getCampis()
  },
  methods: {
    handlePressButton (type, id = null) {
      const options = {
        new: () => {
          this.isSelectedCampi = false
          this.isCreatingNew = !this.isCreatingNew
        },
        show: () => {
          this.isSelectedCampi = true
          this.isCreatingNew = false
          this.getCampi(id)
        }
      }
      if (options[type]) options[type]()
    },
    getCampis () {
      MASTER
        .get('campi/', {})
        .then(res => {
          console.log(res.data)
          this.campis = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    },
    getCampi (id) {
      MASTER
        .get('campi/' + id, {})
        .then(res => {
          console.log(res.data)
          this.campi = res.data
          this.isSelectedCampi = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    putCampi () {
      const { id } = this.campi
      MASTER
        .put('campi/' + id + '/', this.campi)
        .then(res => {
          this.campi = res.data
          this.campis = this.campis.map((campi) => {
            if (campi.id === id) return res.data
            return campi
          })
          this.$q.notify({
            type: 'positive',
            message: 'Seus dados foram atualizados.'
          })
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao editar seus dados. Tente novamente.'
          })
        })
    },
    deleteCampi (id) {
      MASTER
        .delete('campi/' + id, {})
        .then(res => {
          this.campis = this.campis.filter((campi) => campi.id !== id)
          this.$q.notify({
            type: 'positive',
            message: 'Campi deletado com sucesso.'
          })
          this.isSelectedCampi = false
          this.campi = {}
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    postCampi () {
      MASTER
        .post('campi/', this.newCampi)
        .then(res => {
          this.campis.push(res.data)
          this.newCampi = {}
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
.container {
  display               : grid;
  font-size: 25px;
  grid-template-columns : 30% 1fr;
  gap                   : 10px;
  height                : 100vh;
  max-width             : 100vw;
  padding               : 10px;;
}
.campi-info {
  padding: 20px;
}

</style>
