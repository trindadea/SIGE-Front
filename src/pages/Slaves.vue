<template>
  <div>
    <h3 class="title">Lista de Slaves </h3>
    <div class="btn">
      <q-btn
        size="1rem"
        label="Novo"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container">
      <div class="lst-slave">
        <ul>
          <li v-for="(slave,index) in slaves" :key="index">
            <p class="lst-item">
              {{index}} - {{slave.name}} - {{slave.acronym}}
            <q-btn
              size="1rem"
              label="show"
              @click="handlePressButton('show', slave.id)"
              color="primary"/>
              </p>
          </li>
        </ul>
      </div>
      <div class="slave-info" v-if="isCreatingNew">
        <h3 class="login-text">
          Novo Slave
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postSlave()"
          >
          <q-input
            outlined
            v-model="newSlave.ip_address"
            label="Endereço IP"/>
          <q-input
            outlined
            v-model="newSlave.port"
            label="Porta de Acesso IP"/>
          <q-input
            outlined
            v-model="newSlave.name"
            label="Endereço"/>
          <div class="text-center q-mt-lg">
            <q-btn
              size="1rem"
              label="Enviar"
              type="submit"
              color="primary"/>
          </div>
        </q-form>
      </div>
      <div class="slave-info" v-if="isSelectedSlave">
        <h3 class="login-text">
          Editar dados
        </h3>
        <p>Id: {{slave.id}}</p>
        <q-form
        class="q-gutter-md"
        @submit="putSlave()"
        >
        <q-input
          outlined
          v-model="slave.ip_address"
          label="Endereço IP"/>
        <q-input
          outlined
          v-model="slave.port"
          label="Porta de Acesso IP"/>
        <q-input
          outlined
          v-model="slave.name"
          label="Endereço"/>
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Salvar"
            type="submit"
            color="primary"/>
          <q-btn
            size="1rem"
            label="Deletar"
            @click="deleteSlave(slave.id)"
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
  name: 'Slaves',
  data () {
    return {
      slaves: [],
      slave: {},
      isSelectedSlave: false,
      isCreatingNew: false,
      newSlave: {}
    }
  },
  created () {
    this.getSlaves()
  },
  methods: {
    handlePressButton (type, id = null) {
      const options = {
        new: () => {
          this.isSelectedSlave = false
          this.isCreatingNew = !this.isCreatingNew
        },
        show: () => {
          this.isSelectedSlave = true
          this.isCreatingNew = false
          this.getSlave(id)
        }
      }
      if (options[type]) options[type]()
    },
    getSlaves () {
      MASTER
        .get('slave/', {})
        .then(res => {
          console.log(res.data)
          this.slaves = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    },
    getSlave (id) {
      MASTER
        .get('slave/' + id, {})
        .then(res => {
          console.log(res.data)
          this.slave = res.data
          this.isSelectedSlave = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    putSlave () {
      const { id } = this.slave
      MASTER
        .put('slave/' + id + '/', this.slave)
        .then(res => {
          this.slave = res.data
          this.slaves = this.slaves.map((slave) => {
            if (slave.id === id) return res.data
            return slave
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
    deleteSlave (id) {
      MASTER
        .delete('slave/' + id, {})
        .then(res => {
          this.slaves = this.slaves.filter((slave) => slave.id !== id)
          this.$q.notify({
            type: 'positive',
            message: 'Slave deletado com sucesso.'
          })
          this.isSelectedSlave = false
          this.slave = {}
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    postSlave () {
      MASTER
        .post('slave/', this.newSlave)
        .then(res => {
          this.slaves.push(res.data)
          this.newSlaves = {}
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
.slave-info {
  padding   : 20px;
}
.title {
  padding-left: 20px;
}
.btn {
  padding   : 20px;
}

</style>
