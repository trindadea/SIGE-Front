<template>
  <div>
    <div class="btn q-px-md">
      <q-btn size="1rem" label="Adicionar" color="primary" @click="handlePressButton('new')" />
    </div>
    <div class="container">
      <q-dialog v-model="isCreatingNew" class="dialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Novo Campus</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form class="q-gutter-md" @submit="postCampus()" id="post-form">
              <div class="inputDiv">
                <label>Nome: </label>
                <q-input class="inputField" outlined v-model="newCampus.name" label="Nome do Campus" />
              </div>
              <div class="inputDiv">
                <label>Acronimo: </label>
                <q-input class="inputField" outlined v-model="newCampus.acronym" label="Acronym" />
              </div>
              <div class="inputDiv">
                <label>Latitude: </label>
                <q-input class="inputField" outlined v-model="newCampus.geolocation_latitude" label="Latitude" />
              </div>
              <div class="inputDiv">
                <label>Longitude: </label>
                <q-input class="inputField" outlined v-model="newCampus.geolocation_longitude" label="Longitude" />
              </div>
              <div class="inputDiv">
                <label>Nível de Zoom: </label>
                <q-input class="inputField" outlined v-model="newCampus.zoom_ratio" label="Map Zoom" />
              </div>
              <div class="inputDiv">
                <label>Tipo do Contrato: </label>
                <select class="inputField inputSelect" outlined v-model="newCampus.contract_type">
                  <option disabled selected value="">Selecione uma opção</option>
                  <option>Verde</option>
                  <option>Azul</option>
                </select>
              </div>
              <div v-if="newCampus.contract_type == 'Verde'" class="inputDiv">
                <label>Demanda: </label>
                <q-input class="inputField" outlined v-model="newCampus.peak_demand" label="Demanda" />
              </div>
              <div v-if="newCampus.contract_type == 'Azul'" class="inputDiv">
                <label>Demanda de Ponta: </label>
                <q-input class="inputField" outlined v-model="newCampus.peak_demand"
                  label="Demanda de Ponta Contratada" />
              </div>
              <div v-if="newCampus.contract_type == 'Azul'" class="inputDiv">
                <label>Demanda Fora de Ponta: </label>
                <q-input class="inputField" outlined v-model="newCampus.off_peak_demand"
                  label="Demanda Fora de Ponta Contratada" />
              </div>
            </q-form>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn size="1rem" label="Salvar" type="submit" color="primary" form="post-form" />
            <q-btn size="1rem" label="Cancelar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="isSelectedCampus">
        <q-card>
          <q-card-section>
            <div class="text-h6">Editar Dados</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form class="q-gutter-md" @submit="putCampus()" id="put-form">
              <div class="inputDiv">
                <label>Nome: </label>
                <q-input class="inputField" outlined v-model="campus.name" label="Nome do Campus" />
              </div>
              <div class="inputDiv">
                <label>Acronimo: </label>
                <q-input class="inputField" outlined v-model="campus.acronym" label="Acronym" />
              </div>
              <div class="inputDiv">
                <label>Latitude: </label>
                <q-input class="inputField" outlined v-model="campus.geolocation_latitude" label="Latitude" />
              </div>
              <div class="inputDiv">
                <label>Longitude: </label>
                <q-input class="inputField" outlined v-model="campus.geolocation_longitude" label="Longitude" />
              </div>
              <div class="inputDiv">
                <label>Nìvel de Zoom: </label>
                <q-input class="inputField" outlined v-model="campus.zoom_ratio" label="Map Zoom" />
              </div>
              <div class="inputDiv">
                <label>Tipo do Contrato: </label>
                <select class="inputField inputSelect" outlined v-model="campus.contract_type">
                  <option disabled value="">Selecione uma opção</option>
                  <option>Verde</option>
                  <option>Azul</option>
                </select>
              </div>
              <div v-if="campus.contract_type == 'Verde'" class="inputDiv">
                <label>Demanda: </label>
                <q-input class="inputField" outlined v-model="campus.peak_demand" label="Demanda" />
              </div>
              <div v-if="campus.contract_type == 'Azul'" class="inputDiv">
                <label>Demanda de Ponta: </label>
                <q-input class="inputField" outlined v-model="campus.peak_demand" label="Demanda de Ponta Contratada" />
              </div>
              <div v-if="campus.contract_type == 'Azul'" class="inputDiv">
                <label>Demanda Fora de Ponta: </label>
                <q-input class="inputField" outlined v-model="campus.off_peak_demand"
                  label="Demanda Fora de Ponta Contratada" />
              </div>
            </q-form>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn size="1rem" label="Salvar" type="submit" color="primary" form="put-form" />
            <q-btn size="1rem" label="Cancelar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div class="q-pa-md">
        <q-table title="Campi" :data="campi" :columns="columns" row-key="name">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">{{ props.row.id }}</q-td>
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="latitude" :props="props">{{ props.row.geolocation_latitude }}</q-td>
              <q-td key="longitude" :props="props">{{ props.row.geolocation_longitude }}</q-td>
              <q-td key="zoom" :props="props">{{ props.row.zoom_ratio }}</q-td>
              <q-td key="contract_type" :props="props">{{ props.row.contract_type }}</q-td>
              <q-td key="peak_demand" :props="props">{{ props.row.peak_demand }}</q-td>
              <q-td key="off_peak_demand" :props="props">{{ props.row.off_peak_demand }}</q-td>
              <q-td key="edit" :props="props">
                <q-btn flat round icon="edit" size="1rem" @click="handlePressButton('show', props.row.id)"
                  color="primary" />
              </q-td>
              <q-td key="delete" :props="props">
                <q-btn flat round size="1rem" icon="delete" @click="handlePressButton('delete', props.row.id)"
                  color="primary" />
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
  name: 'Campi',
  data() {
    return {
      campi: [],
      campus: {},
      isSelectedCampus: false,
      isCreatingNew: false,
      newCampus: {
        zoom_ratio: 0
      },
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: row => row.id, sortable: true, style: 'width: 55px' },
        { name: 'name', label: 'Nome', align: 'left', field: row => row.name, sortable: true },
        { name: 'latitude', label: 'Latitude', align: 'center', field: row => row.latitude, sortable: true },
        { name: 'longitude', label: 'Longitude', align: 'center', field: row => row.longitude, sortable: true },
        { name: 'zoom', label: 'Zoom do Mapa', align: 'center', field: row => row.zoom_ratio, sortable: true },
        { name: 'contract_type', label: 'Tipo de Contrato', align: 'center', field: row => row.contract_type, sortable: true },
        { name: 'peak_demand', label: 'Demanda de Ponta', align: 'center', field: row => row.peak_demand, sortable: true },
        { name: 'off_peak_demand', label: 'Demanda Fora de Ponta', align: 'center', field: row => row.off_peak_demand, sortable: true },
        { name: 'edit', label: 'Editar', align: 'center', format: () => 'Editar', sortable: false, style: 'width: 55px' },
        { name: 'delete', label: 'Excluir', align: 'center', format: () => 'Excluir', sortable: false, style: 'width: 55px' }
      ]
    }
  },
  created() {
    this.changePage('Gerenciar Instalações - Lista de Campi')
    this.getCampi()
  },
  methods: {
    ...mapActions('userStore', ['changePage']),
    handlePressButton(type, id = null) {
      const options = {
        new: () => {
          this.isSelectedCampus = false
          this.isCreatingNew = !this.isCreatingNew
        },
        show: () => {
          this.isSelectedCampus = true
          this.isCreatingNew = false
          this.getCampus(id)
        },
        cancel: () => {
          this.isSelectedCampus = false
        },
        delete: () => {
          this.deleteCampus(id)
        }
      }
      if (options[type]) options[type]()
    },
    getCampi() {
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
    getCampus(id) {
      MASTER
        .get('campi/' + id, {})
        .then(res => {
          console.log(res.data)
          this.campus = res.data
          this.isSelectedCampus = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    putCampus() {
      if (this.campus.contract_type == "Verde") {
        this.campus.off_peak_demand = this.campus.peak_demand
      }
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
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao editar seus dados. Tente novamente.\n' + err
          })
        })
    },
    deleteCampus(id) {
      MASTER
        .delete('campi/' + id, {})
        .then(res => {
          this.campi = this.campi.filter((campus) => campus.id !== id)
          this.$q.notify({
            type: 'positive',
            message: 'Campus deletado com sucesso.'
          })
          this.isSelectedCampus = false
          this.campus = {}
          console.log(res.data)
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao deletar o campus. Tente novamente.\n' + err
          })
        })
    },
    postCampus() {
      if (this.newCampus.contract_type == "Verde") {
        this.newCampus.off_peak_demand = this.newCampus.peak_demand
      }
      MASTER
        .post('campi/', this.newCampus)
        .then(res => {
          this.campi.push(res.data)
          this.resetNewCampus()
          this.$q.notify({
            type: 'positive',
            message: 'Campus criado com sucesso.'
          })
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao criar o campus. Tente novamente.\n' + err
          })
        })
    },
    resetNewCampus() {
      this.newCampus = {
        zoom_ratio: 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  font-size: 25px;
  grid-template-columns: 30% 1fr;
  gap: 10px;
  height: 100vh;
  max-width: 100vw;
  padding: 10px;
}

.info {
  border: 1px solid $primary;
  padding: 20px;
  padding-top: 0px;
}

.title {
  text-align: center;
  padding-top: 0px;
  padding-bottom: 20px;
}

.btn {
  margin-top: 24px;
  margin-left: 10px;
  text-align: right;
}

.inputDiv {
  display: flex;
  align-items: center;
}

.inputField {
  flex: 1;
  padding-left: 10px;
}

.inputSelect {
  margin-left: 10px;
  height: 55px;
  border-radius: 4px;
  border-color: #BBB;
}

.inputSelect:focus {
  outline: 0;
  border-color: #BBB;
}

.q-card {
  width: 50% !important;
}

.inputDiv label {
  width: 75px;
}
</style>
