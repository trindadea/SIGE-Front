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
      return new Promise((resolve, reject) => {
        MASTER
          .get('campi/', this.campi)
          .then(res => {
            this.campi = res.data
            resolve()
          })
          .catch(err => {
            console.log(err)
            resolve()
          })
      })
    },
    getGroups () {
      return new Promise((resolve, reject) => {
        MASTER
          .get('groups/')
          .then(res => {
            this.groups = res.data
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
<style>
.container {
  font-size             : 25px;
  max-width             : 100vw;
  padding               : 10px;
}
.transductor-info {
  padding   : 20px;
}

.title {
  padding-left: 20px;
}

.btn {
  margin-top  : 24px;
  margin-right : 25px;
  text-align  : right;
}

.icon {
  font-size: 20px;
}

.icon-green {
  color: #00b341;
}

.icon-red {
  color: #b30000;
}

.q-table__top, thead tr:first-child th {
  background-color: #014082;
  color: white;
}

</style>
