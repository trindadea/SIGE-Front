<template>
  <div>
    <div class="btn">
      <q-btn
        size="1rem"
        label="Adicionar"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container">

      <div class="q-pa-md table">
        <q-table
          title="Medidores"
          :data="transductors"
          :columns="columns"
          row-key="name">

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="campus" :props="props">{{ props.row.campus }}</q-td>
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="group" :props="props">{{ props.row.grouping }}</q-td>
              <q-td key="active" :props="props">
                <i v-if="props.row.active" class="fas fa-bolt icon icon-green"></i>
                <i v-else class="fas fa-bolt icon icon-green"></i>
              </q-td>
              <q-td key="model" :props="props">{{ props.row.model }}</q-td>
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
                  icon="delete"
                  size="1rem"
                  @click="handlePressButton('delete', props.row.id)"
                  color="primary"/>
              </q-td>
            </q-tr>
          </template>

        </q-table>
      </div>

      <q-dialog v-model="isCreatingNew" class="dialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Novo Medidor</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form
            class="q-gutter-md"
            @submit="postTransductor()"
            id="post-form"
            >
              <div class="inputDiv">
                <label>Número de Série: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newTransductor.serial_number"
                label="Número de Série"/>
              </div>

              <div class="inputDiv">
                <label>Endereço IP: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newTransductor.ip_address"
                label="Endereço IP"/>
              </div>

              <div class="inputDiv">
                <label>Porta: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newTransductor.port"
                label="Porta"/>
              </div>

              <div class="inputDiv">
                <label>Latitude: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newTransductor.geolocation_latitude"
                label="Latitude"/>
              </div>

              <div class="inputDiv">
                <label>Longitude: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newTransductor.geolocation_longitude"
                label="Longitude"/>
              </div>

              <div class="inputDiv">
                <label>Campus: </label>
                <q-select
                class="inputField"
                outlined
                :options="campi"
                option-value="url"
                option-label="name"
                emit-value
                map-options
                v-model="newTransductor.campus"
                label="Campus"/>
              </div>

              <div class="inputDiv">
                <label>Versão do Firmware: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newTransductor.firmware_version"
                label="Versão do Firmware"/>
              </div>

              <div class="inputDiv">
                <label>Nome: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newTransductor.name"
                label="Nome"/>
              </div>

              <div class="inputDiv">
                <label>Modelo: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newTransductor.model"
                label="Modelo"/>
              </div>

              <div class="inputDiv">
                <label>Grupo: </label>
                <q-select
                class="inputField"
                outlined
                v-model="newTransductor.grouping"
                :options="groups"
                option-value="url"
                option-label="name"
                emit-value
                map-options
                label="Grupo"/>
              </div>

              <div class="inputDiv">
                <label>Servidor Distribuído: </label>
                <q-select
                class="inputField"
                outlined
                v-model="newTransductor.slave_server"
                :options="slaves"
                option-value="url"
                option-label="name"
                emit-value
                map-options
                label="Servidor Distribuído"/>
              </div>

              <div class="inputDiv">
                <label>History: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newTransductor.history"
                label="History"/>
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

      <q-dialog v-model="isSelectedTransductor" class="dialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Editar Medidor</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form
            class="q-gutter-md"
            @submit="putTransductor()"
            id="put-form"
            >
              <div class="inputDiv">
                <label>Número de Série: </label>
                <q-input
                class="inputField"
                outlined
                v-model="transductor.serial_number"
                label="Número de Série"/>
              </div>

              <div class="inputDiv">
                <label>Endereço IP: </label>
                <q-input
                class="inputField"
                outlined
                v-model="transductor.ip_address"
                label="Endereço IP"/>
              </div>

              <div class="inputDiv">
                <label>Porta: </label>
                <q-input
                class="inputField"
                outlined
                v-model="transductor.port"
                label="Porta"/>
              </div>

              <div class="inputDiv">
                <label>Latitude: </label>
                <q-input
                class="inputField"
                outlined
                v-model="transductor.geolocation_latitude"
                label="Latitude"/>
              </div>

              <div class="inputDiv">
                <label>Longitude: </label>
                <q-input
                class="inputField"
                outlined
                v-model="transductor.geolocation_longitude"
                label="Longitude"/>
              </div>

              <div class="inputDiv">
                <label>Campus: </label>
                <q-select
                class="inputField"
                outlined
                :options="campi"
                option-value="url"
                option-label="name"
                emit-value
                map-options
                v-model="transductor.campus"
                label="Campus"/>
              </div>

              <div class="inputDiv">
                <label>Versão do Firmware: </label>
                <q-input
                class="inputField"
                outlined
                v-model="transductor.firmware_version"
                label="Versão do Firmware"/>
              </div>

              <div class="inputDiv">
                <label>Nome: </label>
                <q-input
                class="inputField"
                outlined
                v-model="transductor.name"
                label="Nome"/>
              </div>

              <div class="inputDiv">
                <label>Modelo: </label>
                <q-input
                class="inputField"
                outlined
                v-model="transductor.model"
                label="Modelo"/>
              </div>

              <div class="inputDiv">
                <label>Grupo: </label>
                <q-select
                class="inputField"
                outlined
                v-model="transductor.grouping"
                :options="groups"
                option-value="url"
                option-label="name"
                emit-value
                map-options
                label="Grupo"/>
              </div>

              <div class="inputDiv">
                <label>Servidor Distribuído: </label>
                <q-select
                class="inputField"
                outlined
                v-model="transductor.slave_server"
                :options="slaves"
                option-value="url"
                option-label="name"
                emit-value
                map-options
                label="Servidor Distribuído"/>
              </div>

              <div class="inputDiv">
                <label>History: </label>
                <q-input
                class="inputField"
                outlined
                v-model="transductor.history"
                label="History"/>
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
    </div>
  </div>
</template>

<script>
  import MASTER from '../../services/masterApi/http-common'
  import { mapActions } from 'vuex'

  export default {
    name: 'Transductors',
    data () {
      return {
        transductors: [],
        transductor: {},
        isSelectedTransductor: false,
        isCreatingNew: false,
        newTransductor: {},
        campi: [],
        groups: [],
        slaves: [],
        columns: [
          { name: 'campus', label: 'Campus', align: 'left', field: row => row.campus, sortable: true },
          { name: 'name', label: 'Nome', align: 'center', field: row => row.name, sortable: true },
          { name: 'group', label: 'Grupos', align: 'center', field: row => row.grouping, sortable: true },
          { name: 'active', label: 'Ativo', align: 'center', field: row => row.active, sortable: true },
          { name: 'model', label: 'Modelo', align: 'center', field: row => row.model, sortable: true },
          { name: 'edit', label: 'Editar', align: 'center', format: () => 'Editar', sortable: false, style: 'width: 55px' },
          { name: 'delete', label: 'Excluir', align: 'center', format: () => 'Excluir', sortable: false, style: 'width: 55px' }
        ]
      }
    },
    async created () {
      this.changePage('Gerenciar Instalações - Medidores')
      await this.getCampi()
      await this.getGroups()
      await this.getSlaves()
      this.getTransductors()
    },
    methods: {
      ...mapActions('userStore', ['changePage']),
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
            this.transductors = res.data

            this.transductors.forEach((transductor) => {
              const campusId = transductor.campus.match(/campi\/(?<campusId>\d+)/).groups.campusId
              const transductorCampus = this.campi.find(campus => campus.id === parseInt(campusId))

              const groupId = transductor.grouping[0].match(/groups\/(?<groupId>\d+)/).groups.groupId
              const transductorGroup = this.groups.find(group => group.id === parseInt(groupId))

              transductor.campus = transductorCampus.name
              transductor.grouping = transductorGroup.name
            })
          })
          .catch(err => {
            console.log(err)
          })
      },
      getTransductor (id) {
        MASTER
          .get('energy-transductors/' + id, {})
          .then(res => {
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
            this.isSelectedTransductor = false
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
          .then(function () {
            this.transductors = this.transductors.filter((transductor) => transductor.id !== id)
            this.$q.notify({
              type: 'positive',
              message: 'Medidor deletado com sucesso.'
            })
            this.isSelectedTransductor = false
            this.transductor = {}
          })
          .catch(err => {
            console.log(err)
          })
      },
      postTransductor () {
        this.newTransductor.grouping = [this.newTransductor.grouping]
        MASTER
          .post('energy-transductors/', this.newTransductor)
          .then(res => {
            this.transductors.push(res.data)
            this.newTransductors = {}
            this.isCreatingNew = false
            this.$q.notify({
              type: 'positive',
              message: 'Transdutor adicionado com sucesso.'
            })
          })
          .catch(err => {
            this.$q.notify({
              type: 'negative',
              message: 'Falha ao adicionar medidor. Tente novamente.'
            })
            console.log(err)
          })
      },
      getCampi () {
        const that = this
        return new Promise((resolve) => {
          MASTER
            .get('campi/', this.campi)
            .then(res => {
              that.campi = res.data
              resolve()
            })
            .catch(err => {
              console.log(err)
              resolve()
            })
        })
      },
      getGroups () {
        const that = this
        return new Promise((resolve) => {
          MASTER
            .get('groups/')
            .then(res => {
              that.groups = res.data
              resolve()
            })
            .catch(err => {
              console.log(err)
              resolve()
            })
        })
      },
      getSlaves () {
        const that = this
        return new Promise((resolve) => {
          MASTER
            .get('slave/')
            .then(res => {
              that.slaves = res.data
              resolve()
            })
            .catch(err => {
              console.log(err)
              resolve()
            })
        })
      }
    }
  }
</script>

<style lang="scss" scoped src='./styles.scss'/>
