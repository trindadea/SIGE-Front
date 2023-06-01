<template>
  <div>
    <div class="btn q-px-md">
      <q-btn
        size="1rem"
        label="Adicionar"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container">
      <q-dialog
      v-model="isCreatingNew"
      transition-show="slide-up"
      transition-hide="slide-down"
      >
        <q-card class="text-white">
          <q-bar class="bg-primary">
            <h5 class="title">
              Novo Tipo de Agrupamento
            </h5>
            <q-space/>
          </q-bar>
          <q-card-section class="q-pt-none">
            <q-form
            class="q-gutter-md"
            @submit="postGroupType()"
            id="post-form"
            >
              <div class="inputDiv">
                <q-input
                class="inputField"
                outlined
                v-model="newGroupType.name"
                label="Nome do Tipo de Agrupamento"/>
              </div>
            </q-form>
          </q-card-section>
          <div class="btn">
            <q-btn
              size="1rem"
              label="Salvar"
              type="submit"
              form="post-form"
              color="primary"
              v-close-popup/>
            <q-space />
            <q-btn
              size="1rem"
              label="Cancelar"
              color="primary"
              v-close-popup/>
          </div>
        </q-card>
      </q-dialog>

      <q-dialog
      v-model="isSelectedGroupType"
      transition-show="slide-up"
      transition-hide="slide-down"
      >
        <q-card class="text-white">
          <q-bar class="bg-primary">
            <h5 class="title">
              Editar Dados
            </h5>
            <q-space/>
          </q-bar>
          <q-card-section class="q-pt-none">
            <q-form
            class="q-gutter-md"
            @submit="putGroupType()"
            id="put-form"
            >
              <div class="inputDiv">
                <q-input
                class="inputField"
                outlined
                v-model="groupType.name"
                label="Nome do Tipo de Agrupamento"/>
              </div>
            </q-form>
          </q-card-section>
          <div class="btn">
            <q-btn
              size="1rem"
              label="Salvar"
              type="submit"
              form="put-form"
              color="primary"
              v-close-popup/>
            <q-space />
            <q-btn
              size="1rem"
              label="Cancelar"
              color="primary"
              v-close-popup/>
          </div>
        </q-card>
      </q-dialog>

      <div class="q-pa-md">
        <q-table
          title="Tipos de Agrupamentos"
          :data="groupTypes"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">{{ props.row.id }}</q-td>
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
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
  name: 'GroupTypes',
  data () {
    return {
      groupTypes: [],
      groupType: {},
      isSelectedGroupType: false,
      isCreatingNew: false,
      newGroupType: {},
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: row => row.id, sortable: true, style: 'width: 55px' },
        { name: 'name', label: 'Nome', align: 'left', field: row => row.name, sortable: true },
        { name: 'edit', label: 'Editar', align: 'center', format: () => 'Editar', sortable: false, style: 'width: 55px' },
        { name: 'delete', label: 'Excluir', align: 'center', format: () => 'Excluir', sortable: false, style: 'width: 55px' }
      ]
    }
  },
  created () {
    this.changePage('Gerenciar Instalações > Tipos de Agrupamentos')
    this.getGroupTypes()
  },
  methods: {
    ...mapActions('userStore', ['changePage']),
    handlePressButton (type, id = null) {
      const options = {
        new: () => {
          this.isSelectedGroupType = false
          this.isCreatingNew = !this.isCreatingNew
        },
        show: () => {
          this.isSelectedGroupType = true
          this.isCreatingNew = false
          this.getGroupType(id)
        },
        cancel: () => {
          this.isSelectedGroupType = false
        },
        delete: () => {
          this.deleteGroupType(id)
        }
      }
      if (options[type]) options[type]()
    },
    getGroupTypes () {
      MASTER
        .get('group-types/', {})
        .then(res => {
          this.groupTypes = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    },
    getGroupType (id) {
      MASTER
        .get(`group-types/${id}/`, {})
        .then(res => {
          this.groupType = res.data
          this.isSelectedGroupType = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    putGroupType () {
      const { id } = this.groupType
      MASTER
        .put(`group-types/${id}/`, this.groupType)
        .then(res => {
          this.groupType = res.data
          this.groupTypes = this.groupTypes.map((groupType) => {
            if (groupType.id === id) return res.data
            return groupType
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
    deleteGroupType (id) {
      MASTER
        .delete(`group-types/${id}/`, {})
        .then(res => {
          this.groupTypes = this.groupTypes.filter((groupType) => groupType.id !== id)
          this.$q.notify({
            type: 'positive',
            message: 'Tipo de Agrupamento deletado com sucesso.'
          })
          this.isSelectedGroupType = false
          this.groupType = {}
        })
        .catch(err => {
          console.log(err)
        })
    },
    postGroupType () {
      MASTER
        .post('group-types/', this.newGroupType)
        .then(res => {
          this.groupTypes.push(res.data)
          this.newGroupType = {}
          this.$q.notify({
            type: 'positive',
            message: 'Tipo de Agrupamento criado com sucesso.'
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
.groupType-info {
  border      : 1px solid $primary;
  padding     : 20px;
  padding-top : 0px;
}
.btn {
  margin-top   : 24px;
  margin-left  : 10px;
  padding-right: 26px;
  text-align   : right;
}
.inputDiv {
  padding-top : 20px;
  display     : flex;
  align-items : center;
}
.inputField {
  flex        : 1;
}
.inputDiv label {
  width: 75px;
}
.q-card {
  width: 50% !important;
  min-width: 400px;
  .title {
    padding-left: 10px;
    margin: 0;
  }
  .q-bar {
    padding: 10px;
    padding: 10px;
    height: 60px;
    border: 0;
    border-radius: 0;
  }
  .info {
    padding: 15px;
  }
  .btn {
    display: flex;
    margin-top: 1px;
    margin-bottom: 20px;
    padding-left: 5px;
    padding-right: 17px;
  }
}

</style>
