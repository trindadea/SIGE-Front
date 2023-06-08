<template>
  <div>
    <div class="btn q-px-md">
      <q-btn
        size="1rem"
        label="Adicionar"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container q-px-md">
      <q-dialog v-model="isCreatingNew" class="dialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Novo Slave</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form
            class="q-gutter-md"
            @submit="postSlave()"
            id="post-form"
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
            </q-form>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              size="1rem"
              label="Salvar"
              type="submit"
              color="primary"
              form="post-form"/>
            <q-btn
              size="1rem"
              label="Cancelar"
              color="primary"
              v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="isSelectedSlave" class="dialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Novo Slave</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form
            class="q-gutter-md"
            @submit="putSlave()"
            id="put-form"
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
            </q-form>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              size="1rem"
              label="Salvar"
              type="submit"
              color="primary"
              form="put-form"/>
            <q-btn
              size="1rem"
              label="Cancelar"
              color="primary"
              v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div class="q-pa-md">
        <q-table
          title="Servidores"
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
                  flat
                  round
                  icon="edit"
                  size="1rem"
                  @click="handlePressButton('show', props.row.id)"
                  color="primary"/>
              </q-td>
              <q-td key="delete" :props="props">
                <q-btn
                  flat
                  round
                  size="1rem"
                  icon="delete"
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
import { mapActions } from 'vuex'

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
    this.changePage('Gerenciar Instalações - Servidores Distribuídos')
    this.getSlaves()
  },
  methods: {
    ...mapActions('userStore', ['changePage']),
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
          this.slave = res.data
          this.isSelectedSlave = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    putSlave () {
      const that = this
      const { id } = this.slave
      MASTER
        .put('slave/' + id + '/', that.slave)
        .then(res => {
          that.slave = res.data
          that.slaves = that.slaves.map((slave) => {
            if (slave.id === id) return res.data
            return slave
          })
          that.isSelectedSlave = false
          that.$q.notify({
            type: 'positive',
            message: 'Seus dados foram atualizados.'
          })
        })
        .catch(err => {
          console.log(err)
          that.$q.notify({
            type: 'negative',
            message: 'Falha ao editar seus dados. Tente novamente.'
          })
        })
    },
    deleteSlave (id) {
      const that = this
      MASTER
        .delete('slave/' + id, {})
        .then(function () {
          that.slaves = that.slaves.filter((slave) => slave.id !== id)
          that.$q.notify({
            type: 'positive',
            message: 'Slave deletado com sucesso.'
          })
          that.isSelectedSlave = false
          that.slave = {}
        })
        .catch(err => {
          console.log(err)
        })
    },
    postSlave () {
      const that = this
      MASTER
        .post('slave/', that.newSlave)
        .then(res => {
          that.slaves.push(res.data)
          that.newSlaves = {}
          that.isCreatingNew = false
          that.$q.notify({
            type: 'positive',
            message: 'Slave adicionado com sucesso.'
          })
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
  padding-left  : 10px;
}
.q-card {
  width: 50% !important;
}
.inputDiv label {
  width: 75px;
}

</style>
