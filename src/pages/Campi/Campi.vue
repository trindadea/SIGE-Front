<template>
  <div>
    <h3 class="title">Lista de Campi </h3>
    <div class="btn q-px-md">
      <q-btn
        size="1rem"
        label="Adicionar"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container">
      <div class="info" v-if="isCreatingNew">
        <h3 class="login-text">
          Novo Campus
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postCampus()"
          >
          <div class="inputDiv">
            <label>Nome: </label>
            <q-input
            outlined
            v-model="newCampus.name"
            label="Nome do Campus"/>
          </div>
          <div class="inputDiv">
            <label>Acronimo: </label>
            <q-input
            class="inputField"
            outlined
            v-model="newCampus.acronym"
            label="Acronym"/>
          </div>
          <div class="inputDiv">
            <label>Latitude: </label>
            <q-input
            class="inputField"
            outlined
            v-model="newCampus.geolocation_latitude"
            label="Latitude"/>
          </div>
          <div class="inputDiv">
            <label>Longitude: </label>
            <q-input
            class="inputField"
            outlined
            v-model="newCampus.geolocation_longitude"
            label="Longitude"/>
          </div>
          <div class="inputDiv">
            <label>Longitude: </label>
            <q-input
            class="inputField"
            outlined
            v-model="newCampus.zoom_ratio"
            label="Map Zoom"/>
          </div>
          <div class="inputDiv">
            <label>Data de início das tarifas: </label>
            <q-input
            class="inputField"
            outlined
            v-model="newCampus.tariff_start_date"
            label="Tariff Start Date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="newCampus.tariff_start_date" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="inputDiv">
            <label>Tarifa Regular: </label>
            <q-input
            class="inputField"
            outlined
            v-model="newCampus.regular_tariff"
            label="Regular Tariff"/>
          </div>
          <div class="inputDiv">
            <label>Tarifa de Ponta: </label>
            <q-input
            class="inputField"
            outlined
            v-model="newCampus.high_tariff"
            label="High Tariff"/>
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
      <div class="info" v-if="isSelectedCampus">
        <h3 class="login-text">
          Editar dados
        </h3>
        <q-form
        class="q-gutter-md"
        @submit="putCampus()"
        >
        <div class="inputDiv">
            <label>Nome: </label>
            <q-input
            class="inputField"
            outlined
            v-model="campus.name"
            label="Nome do Campus"/>
          </div>
          <div class="inputDiv">
            <label>Acronimo: </label>
            <q-input
            class="inputField"
            outlined
            v-model="campus.acronym"
            label="Acronym"/>
          </div>
          <div class="inputDiv">
            <label>Latitude: </label>
            <q-input
            class="inputField"
            outlined
            v-model="campus.geolocation_latitude"
            label="Latitude"/>
          </div>
          <div class="inputDiv">
            <label>Longitude: </label>
            <q-input
            class="inputField"
            outlined
            v-model="campus.geolocation_longitude"
            label="Longitude"/>
          </div>
          <div class="inputDiv">
            <label>Longitude: </label>
            <q-input
            class="inputField"
            outlined
            v-model="campus.zoom_ratio"
            label="Map Zoom"/>
          </div>
        <div class="text-center q-mt-lg">
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
          title="Campi"
          :data="campi"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">{{ props.row.id }}</q-td>
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="latitude" :props="props">{{ props.row.geolocation_latitude }}</q-td>
              <q-td key="longitude" :props="props">{{ props.row.geolocation_longitude }}</q-td>
              <q-td key="zoom" :props="props">{{ props.row.zoom_ratio }}</q-td>
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
// import { mapActions } from 'vuex'

export default {
  name: 'Campi',
  data () {
    return {
      campi: [],
      campus: {},
      isSelectedCampus: false,
      isCreatingNew: false,
      newCampus: {},
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: row => row.id, sortable: true, style: 'width: 55px' },
        { name: 'name', label: 'Nome', align: 'left', field: row => row.name, sortable: true },
        { name: 'latitude', label: 'Latitude', align: 'center', field: row => row.latitude, sortable: true },
        { name: 'longitude', label: 'Longitude', align: 'center', field: row => row.longitude, sortable: true },
        { name: 'zoom', label: 'Zoom Ratio', align: 'center', field: row => row.zoom_ratio, sortable: true },
        { name: 'edit', label: 'Editar', align: 'center', format: () => 'Editar', sortable: false, style: 'width: 55px' },
        { name: 'delete', label: 'Excluir', align: 'center', format: () => 'Excluir', sortable: false, style: 'width: 55px' }
      ]
    }
  },
  created () {
    this.getCampi()
  },
  methods: {
    handlePressButton (type, id = null) {
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
    getCampi () {
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
    getCampus (id) {
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
    putCampus () {
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
    deleteCampus (id) {
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
          console.log(err)
        })
    },
    postCampus () {
      console.log(this.newCampus)
      MASTER
        .post('campi/', this.newCampus)
        .then(res => {
          const data = res.data

          MASTER
            .post(`campi/${data.id}/tariffs/`, {
              campus: data.url,
              start_date: this.newCampus.tariff_start_date,
              regular_tariff: parseInt(this.newCampus.regular_tariff),
              high_tariff: parseInt(this.newCampus.high_tariff)
            })
            .then(res => {
              this.campi.push(data)
              this.newCampus = {}
            }).catch(err => {
              console.log(err)
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
  padding-left  : 10px
}

</style>
