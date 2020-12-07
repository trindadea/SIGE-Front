<template>
  <div>
    <h3 class="title">Lista de Medidores </h3>
    <div class="btn">
      <q-btn
        size="1rem"
        label="Novo"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container">
      <div class="lst-transductor">
        <ul>
          <li v-for="(transductor,index) in transductors" :key="index">
            <p class="lst-item">
              {{index}} - {{transductor.name}}
            <q-btn
              size="1rem"
              label="show"
              @click="handlePressButton('show', transductor.id)"
              color="primary"/>
              </p>
          </li>
        </ul>
      </div>
      <div class="transductor-info" v-if="isCreatingNew">
        <h3 class="login-text">
          Novo Medidor
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postTransductor()"
          >
          <q-input
            outlined
            v-model="newTransductor.serial_number"
            label="Número de Série"/>
          <q-input
            outlined
            v-model="newTransductor.ip_address"
            label="Endereço IP"/>
          <q-input
            outlined
            v-model="newTransductor.port"
            label="Porta"/>
          <q-input
            outlined
            v-model="newTransductor.geolocation_latitude"
            label="Latitude"/>
          <q-input
            outlined
            v-model="newTransductor.geolocation_longitude"
            label="Longitude"/>
          <q-select
            outlined
            v-model="newTransductor.campus"
            label="Campus"
            :options="campi"
            option-value="url"
            option-label="name"
            emit-value
            map-options/>
          <q-input
            outlined
            v-model="newTransductor.firmware_version"
            label="Versão do Firmware"/>
          <q-input
            outlined
            v-model="newTransductor.name"
            label="Nome"/>
          <q-input
            outlined
            v-model="newTransductor.model"
            label="Modelo"/>
          <q-input
            outlined
            v-model="newTransductor.grouping"
            label="Grouping"/>
          <q-input
            outlined
            v-model="newTransductor.history"
            label="History"/>
          <div class="text-center q-mt-lg">
            <q-btn
              size="1rem"
              label="Enviar"
              type="submit"
              color="primary"/>
          </div>
        </q-form>
      </div>
      <div class="transductor-info" v-if="isSelectedTransductor">
        <h3 class="login-text">
          Editar dados
        </h3>
        <p>Id: {{transductor.id}}</p>
        <q-form
        class="q-gutter-md"
        @submit="putTransductor()"
        >
          <q-input
            outlined
            v-model="transductor.serial_number"
            label="Número de Série"/>
          <q-input
            outlined
            v-model="transductor.ip_address"
            label="Endereço IP"/>
          <q-input
            outlined
            v-model="transductor.port"
            label="Porta"/>
          <q-input
            outlined
            v-model="transductor.geolocation_latitude"
            label="Latitude"/>
          <q-input
            outlined
            v-model="transductor.geolocation_longitude"
            label="Longitude"/>
          <q-select
            outlined
            v-model="transductor.campus"
            label="Campus"
            :options="campi"
            option-value="url"
            option-label="name"
            emit-value
            map-options/>
          <q-input
            outlined
            v-model="transductor.firmware_version"
            label="Versão do Firmware"/>
          <q-input
            outlined
            v-model="transductor.name"
            label="Nome"/>
          <q-input
            outlined
            v-model="transductor.model"
            label="Modelo"/>
          <q-input
            outlined
            v-model="transductor.grouping"
            label="Grouping"/>
          <q-input
            outlined
            v-model="transductor.history"
            label="History"/>
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Salvar"
            type="submit"
            color="primary"/>
          <q-btn
            size="1rem"
            label="Deletar"
            @click="deleteTransductor(transductor.id)"
            color="primary"/>
        </div>
      </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import MASTER from '../../services/masterApi/http-common'
// import { mapActions } from 'vuex'

export default {
  name: 'Transductors',
  data () {
    return {
      transductors: [],
      transductor: {},
      isSelectedTransductor: false,
      isCreatingNew: false,
      newTransductor: {},
      campi: []
    }
  },
  created () {
    this.getTransductors()
  },
  methods: {
    handlePressButton (type, id = null) {
      const options = {
        new: () => {
          this.isSelectedTransductor = false
          this.isCreatingNew = !this.isCreatingNew
        },
        show: () => {
          this.isSelectedTransductor = true
          this.isCreatingNew = false
          this.getTransductor(id)
        }
      }
      if (options[type]) options[type]()
    },
    getTransductors () {
      MASTER
        .get('energy-transductors/', {})
        .then(res => {
          console.log(res.data)
          this.transductors = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    },
    getTransductor (id) {
      MASTER
        .get('energy-transductors/' + id, {})
        .then(res => {
          console.log(res.data)
          this.transductor = res.data
          this.isSelectedTransductor = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    putTransductor () {
      const { id } = this.transductor
      MASTER
        .put('energy-transductors/' + id + '/', this.transductor)
        .then(res => {
          this.transductor = res.data
          this.transductors = this.transductors.map((transductor) => {
            if (transductor.id === id) return res.data
            return transductor
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
    deleteTransductor (id) {
      MASTER
        .delete('energy-transductors/' + id, {})
        .then(res => {
          this.transductors = this.transductors.filter((transductor) => transductor.id !== id)
          this.$q.notify({
            type: 'positive',
            message: 'Medidor deletado com sucesso.'
          })
          this.isSelectedTransductor = false
          this.transductor = {}
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    postTransductor () {
      MASTER
        .post('energy-transductors/', this.newTransductor)
        .then(res => {
          this.transductors.push(res.data)
          this.newTransductors = {}
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCampi () {
      MASTER
        .get('campi/', this.campi)
        .then(res => {
          this.campi = res.data
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
.transductor-info {
  padding   : 20px;
}
.title {
  padding-left: 20px;
}
.btn {
  padding   : 20px;
}

</style>
