<template>
  <div>
    <h3 class="title">Lista de Tipos de Agrupamentos </h3>
    <div class="btn q-px-md">
      <q-btn
        size="1rem"
        label="Adicionar"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container">
      <div class="groupType-info" v-if="isCreatingNew">
        <h3 class="title">
          Novo GroupType
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postGroupType()"
          >
          <div class="inputDiv">
            <label>Nome: </label>
            <q-input
              class="inputField"
              outlined
              v-model="newGroupType.name"/>
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
      <div class="groupType-info" v-if="isSelectedGroupType">
        <h3 class="title">
          Editar dados
        </h3>
        <q-form
        class="q-gutter-md"
        @submit="putGroupType()"
        >
        <div class="inputDiv">
          <label>Nome: </label>
          <q-input
              class="inputField"
              outlined
              disabled
              v-model="groupType.name"/>
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
          title="GroupTypes"
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
// import { mapActions } from 'vuex'

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
    this.getGroupTypes()
  },
  methods: {
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
          console.log(res.data)
          this.groupTypes = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    },
    getGroupType (id) {
      MASTER
        .get('group-types/' + id, {})
        .then(res => {
          console.log(res.data)
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
        .put('group-types/' + id + '/', this.groupType)
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
        .delete('group-types/' + id, {})
        .then(res => {
          this.groupTypes = this.groupTypes.filter((groupType) => groupType.id !== id)
          this.$q.notify({
            type: 'positive',
            message: 'GroupType deletado com sucesso.'
          })
          this.isSelectedGroupType = false
          this.groupType = {}
          console.log(res.data)
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
