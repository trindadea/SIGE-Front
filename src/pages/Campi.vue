<template>
  <div>
    <h3 class="title">Lista de Campi </h3>
    <div class="btn">
      <q-btn
        size="1rem"
        label="Novo"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container">
      <div class="lst-campus">
        <ul>
          <li v-for="(campus,index) in campi" :key="index">
            <p class="lst-item">
              {{index}} - {{campus.name}} - {{campus.acronym}}
            <q-btn
              size="1rem"
              label="show"
              @click="handlePressButton('show', campus.id)"
              color="primary"/>
              </p>
          </li>
        </ul>
      </div>
      <div class="campus-info" v-if="isCreatingNew">
        <h3 class="login-text">
          Novo Campus
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postCampi()"
          >
          <q-input
            outlined
            v-model="newCampi.name"
            label="Nome do Campus"/>
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
      <div class="campus-info" v-if="isSelectedCampi">
        <h3 class="login-text">
          Editar dados
        </h3>
        <p>Id: {{campus.id}}</p>
        <p>Transductors: {{campus.transductors}}</p>
        <q-form
        class="q-gutter-md"
        @submit="putCampi()"
        >
        <q-input
          outlined
          v-model="campus.name"
          label="Nome do Campus"/>
        <q-input
          outlined
          v-model="campus.acronym"
          label="Acronym"/>
        <q-input
          outlined
          v-model="campus.geolocation_latitude"
          label="Latitude"/>
        <q-input
          outlined
          v-model="campus.geolocation_longitude"
          label="Longitude"/>
        <q-input
          outlined
          v-model="campus.zoom_ratio"
          label="Map Zoom"/>
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Salvar"
            type="submit"
            color="primary"/>
          <q-btn
            size="1rem"
            label="Deletar"
            @click="deleteCampi(campus.id)"
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
  name: 'Campi',
  data () {
    return {
      campi: [],
      campus: {},
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
          this.campi = res.data
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
          this.campus = res.data
          this.isSelectedCampi = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    putCampi () {
      const { id } = this.campus
      MASTER
        .put('campi/' + id + '/', this.campus)
        .then(res => {
          this.campus = res.data
          this.campi = this.campi.map((campus) => {
            if (campus.id === id) return res.data
            return campus
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
          this.campi = this.campi.filter((campi) => campi.id !== id)
          this.$q.notify({
            type: 'positive',
            message: 'Campus deletado com sucesso.'
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
          this.campi.push(res.data)
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
  font-size             : 25px;
  grid-template-columns : 30% 1fr;
  gap                   : 10px;
  height                : 100vh;
  max-width             : 100vw;
  padding               : 10px;;
}
.campi-info {
  padding   : 20px;
}
.title {
  padding-left: 20px;
}
.btn {
  padding   : 20px;
}

</style>
