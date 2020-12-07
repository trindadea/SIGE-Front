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
      <div class="info" v-if="isCreatingNew">
        <h3 class="title">
          Novo Slave
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postSlave()"
          >
          <div class="inputDiv">
            <label>Endereço IP: </label>
            <q-input
            class="inputField"
            outlined
            v-model="newSlave.ip_address"
            label="Endereço IP"/>
          </div>
          <div class="inputDiv">
            <label>Porta: </label>
            <q-input
            class="inputField"
            outlined
            v-model="newSlave.port"
            label="Porta de Acesso IP"/>
          </div>
          <div class="inputDiv">
            <label>Localização: </label>
            <q-input
            class="inputField"
            outlined
            v-model="newSlave.name"
            label="Endereço"/>
          </div>
          <div class="btn">
            <q-btn
              size="1rem"
              label="Salvar"
              type="submit"
              color="primary"/>
          </div>
        </q-form>
      </div>
      <div class="info" v-if="isSelectedSlave">
        <h3 class="title">
          Editar dados
        </h3>
        <p>Id: {{slave.id}}</p>
        <q-form
        class="q-gutter-md"
        @submit="putSlave()"
        >
        <div class="inputDiv">
          <label>Endereço IP: </label>
          <q-input
          class="inputField"
          outlined
          v-model="slave.ip_address"
          label="Endereço IP"/>
        </div>
        <div class="inputDiv">
          <label>Porta: </label>
          <q-input
          class="inputField"
          outlined
          v-model="slave.port"
          label="Porta de Acesso IP"/>
        </div>
        <div class="inputDiv">
          <label>Localização: </label>
          <q-input
          class="inputField"
          outlined
          v-model="slave.name"
          label="Endereço"/>
        </div>
        <div class="text-right q-mt-lg">
          <q-btn
            class="btn"
            size="1rem"
            label="Cancelar"
            color="primary"
            @click="handlePressButton('cancel')"/>
          <q-btn
            class="btn"
            size="1rem"
            label="Salvar"
            type="submit"
            color="primary"/>
        </div>
      </q-form>
      </div>
      <div class="q-pa-md">
        <q-table
          title="Slaves"
          :data="slaves"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">{{ props.row.id }}</q-td>
              <q-td key="ip" :props="props">{{ props.row.ip_address }}</q-td>
              <q-td key="port" :props="props">{{ props.row.port }}</q-td>
              <q-td key="location" :props="props">{{ props.row.name }}</q-td>
              <q-td key="edit" :props="props">
                <q-btn
                  size="1rem"
                  label="show"
                  @click="handlePressButton('show', props.row.id)"
                  color="primary"/>
              </q-td>
              <q-td key="delete" :props="props">
                <q-btn
                  size="1rem"
                  label="Excluir"
                  @click="handlePressButton('delete', props.row.id)"
                  color="primary"/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import MASTER from '../../services/masterApi/http-common'
// import { mapActions } from 'vuex'

export default {
  name: 'Slaves',
  data () {
    return {
      slaves: [],
      slave: {},
      isSelectedSlave: false,
      isCreatingNew: false,
      newSlave: {},
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: row => row.id, sortable: true, style: 'width: 55px' },
        { name: 'ip', label: 'Endereço IP', align: 'left', field: row => row.ip_address, sortable: true },
        { name: 'port', label: 'Porta', align: 'center', field: row => row.port, sortable: true },
        { name: 'location', label: 'Localização', align: 'center', field: row => row.name, sortable: true },
        { name: 'edit', label: 'Editar', align: 'center', format: () => 'Editar', sortable: false, style: 'width: 55px' },
        { name: 'delete', label: 'Excluir', align: 'center', format: () => 'Excluir', sortable: false, style: 'width: 55px' }
      ]
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
        },
        cancel: () => {
          this.isSelectedSlave = false
        },
        delete: () => {
          this.deleteSlave(id)
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
<style lang="scss" scoped>
.container {
  font-size             : 25px;
  grid-template-columns : 30% 1fr;
  gap                   : 10px;
  height                : 100vh;
  max-width             : 100vw;
  padding               : 10px;;
}
.info {
  border      : 1px solid $primary;
  padding     : 20px;
  padding-top : 0px;
}
.title {
  text-align      : center;
  padding-top     : 0px;
  padding-bottom  : 20px;
}
.btn {
  margin-top  : 24px;
  margin-left : 10px;
  text-align  : right;
}
.inputDiv {
  display     : flex;
  align-items : center;
}
.inputField {
  flex          : 1;
  padding-left  : 10px
}

</style>
