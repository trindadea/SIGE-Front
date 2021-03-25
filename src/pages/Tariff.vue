<template>
  <div>
    <h3 class="title">Tarifas</h3>
    <div class="container">
      <div class="btn q-px-md">
        <q-btn
          size="1rem"
          label="Adicionar"
          color="primary"
          @click="handleAction('togglePostModal')"/>
      </div>
      <div class="q-pa-md">
        <q-table
          title="Tarifas"
          :data="tariffs"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                <q-td key="regular_tariff" :props="props">{{ props.row.regular_tariff }}</q-td>
                <q-td key="high_tariff" :props="props">{{ props.row.high_tariff }}</q-td>
                <q-td key="start_date" :props="props">{{ props.row.start_date }}</q-td>
                <q-td key="edit" :props="props">
                  <q-btn
                    flat
                    round
                    icon="edit"
                    size="1rem"
                    @click="handleAction('togglePutModal', props.row.id)"
                    color="primary"/>
                  </q-td>
                <q-td key="delete" :props="props">
                  <q-btn
                    flat
                    round
                    icon="delete"
                    size="1rem"
                    @click="handleAction('toggleDeleteModal', props.row.id)"
                    color="primary"/>
                </q-td>
              </q-tr>
          </template>
        </q-table>
      </div>
    </div>

    <q-dialog v-model="postModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Adicionar Tarifa</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            class="q-gutter-md"
            @submit="postTariff()"
            id="post-form"
            >
            <div class="inputDiv">
              <label>Data de início: </label>
              <q-input
              class="inputField"
              outlined
              v-model="newTariff.start_date"
              label="Tariff Start Date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="newTariff.start_date" mask="YYYY-MM-DD">
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
              v-model="newTariff.regular_tariff"
              label="Regular Tariff"/>
            </div>
            <div class="inputDiv">
              <label>Tarifa de Ponta: </label>
              <q-input
              class="inputField"
              outlined
              v-model="newTariff.high_tariff"
              label="High Tariff"/>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="btn"
            size="1rem"
            label="Salvar"
            color="primary"
            form="post-form"
            type="submit"/>
          <q-btn
            class="btn"
            size="1rem"
            label="Cancelar"
            color="primary"
            v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="putModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Tarifa</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            class="q-gutter-md"
            @submit="putTariff()"
            id="put-form"
            >
            <div class="inputDiv">
              <label>Data de início: </label>
              <q-input
              class="inputField"
              outlined
              v-model="tariff.start_date"
              label="Tariff Start Date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="tariff.start_date" mask="YYYY-MM-DD">
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
              v-model="tariff.regular_tariff"
              label="Regular Tariff"/>
            </div>
            <div class="inputDiv">
              <label>Tarifa de Ponta: </label>
              <q-input
              class="inputField"
              outlined
              v-model="tariff.high_tariff"
              label="High Tariff"/>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="btn"
            size="1rem"
            label="Salvar"
            color="primary"
            form="put-form"
            type="submit"/>
          <q-btn
            class="btn"
            size="1rem"
            label="Cancelar"
            color="primary"
            v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          Você tem certeza que quer deletar essa tarifa?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="btn"
            size="1rem"
            label="Confirmar"
            color="primary"
            @click="deleteTariff()"
            v-close-popup/>
          <q-btn
            class="btn"
            size="1rem"
            label="Cancelar"
            color="primary"
            v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import MASTER from '../services/masterApi/http-common'

export default {
  data () {
    return {
      tariffs: [],
      tariff: {},
      newTariff: {},
      campus: {},
      postModal: false,
      putModal: false,
      deleteModal: false,
      targetId: null,
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: row => row.id, sortable: true, style: 'width: 55px' },
        { name: 'regular_tariff', label: 'Tarifa Regular', align: 'center', field: row => row.regular_tariff, sortable: true },
        { name: 'high_tariff', label: 'Tarifa de Ponta', align: 'center', field: row => row.high_tariff, sortable: true },
        { name: 'start_date', label: 'Data de início', align: 'center', field: row => row.start_date, sortable: true },
        { name: 'edit', label: 'Editar', align: 'center', format: () => 'Editar', sortable: false, style: 'width: 55px' },
        { name: 'delete', label: 'Deletar', align: 'center', format: () => 'Deletar', sortable: false, style: 'width: 55px' }
      ]
    }
  },
  created () {
    this.getTariffs()
    this.getCampus()
  },
  methods: {
    getTariffs () {
      MASTER
        .get(`campi/${this.$route.params.id}/tariffs`, {})
        .then(res => {
          this.tariffs = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    },
    getTariff (id) {
      MASTER
        .get(`campi/${this.$route.params.id}/tariffs/${id}/`)
        .then(res => {
          this.tariff = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    postTariff () {
      MASTER
        .post(`campi/${this.$route.params.id}/tariffs/`, {
          campus: this.campus.url,
          start_date: this.newTariff.start_date,
          regular_tariff: parseFloat(this.newTariff.regular_tariff),
          high_tariff: parseFloat(this.newTariff.high_tariff)
        })
        .then(res => {
          this.newTariff = {}
          this.getTariffs()
          this.handleAction('togglePostModal')
          this.$q.notify({
            type: 'positive',
            message: 'Tarifa adicionada com sucesso.'
          })
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao adicionar tarifa. Verifique o console para mais detalhes.'
          })
        })
    },
    putTariff () {
      MASTER
        .put(`campi/${this.$route.params.id}/tariffs/${this.tariff.id}/`, this.tariff)
        .then(res => {
          this.getTariffs()
          this.handleAction('togglePutModal')
          this.$q.notify({
            type: 'positive',
            message: 'Tarifa editada com sucesso.'
          })
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao editar tarifa. Verifique o console para mais detalhes.'
          })
        })
    },
    deleteTariff () {
      MASTER
        .delete(`campi/${this.$route.params.id}/tariffs/${this.targetId}/`)
        .then(res => {
          this.getTariffs()
          this.$q.notify({
            type: 'positive',
            message: 'Tarifa deletada com sucesso.'
          })
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao deletar tarifa. Verifique o console para mais detalhes.'
          })
        })
    },
    handleAction (action, actionInfo = null) {
      switch (action) {
        case 'togglePostModal':
          this.postModal = !this.postModal
          break

        case 'togglePutModal':
          this.putModal = !this.putModal
          if (actionInfo) {
            this.getTariff(actionInfo)
          }
          break

        case 'toggleDeleteModal':
          this.deleteModal = !this.deleteModal
          this.targetId = actionInfo
          break

        default:
          break
      }
    },
    getCampus () {
      MASTER
        .get(`campi/${this.$route.params.id}`, {})
        .then(res => {
          this.campus = res.data
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
