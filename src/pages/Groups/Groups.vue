<template>
  <div>
    <h3 class="title">Lista de Agrupamentos </h3>
    <div class="btn q-px-md">
      <q-btn
        size="1rem"
        label="Adicionar"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container">
      <div class="info" v-if="isCreatingNew">
        <h3 class="title">
          Novo Grupo
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postGroup()"
          >
          <div class="inputDiv">
            <label>Nome do Grupo: </label>
            <q-input
              class="inputField"
              outlined
              v-model="newGroup.name"/>
          </div>
          <div class="inputDiv">
            <label>Tipo do Grupo: </label>
            <q-select
              class="inputField"
              outlined
              v-model="newGroup.type"
              label="Tipo do Grupo"
              :options="groupTypes"
              option-value="url"
              option-label="name"
              emit-value
              map-options/>
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
      <div class="info" v-if="isSelectedGroup">
        <h3 class="login-text">
          Editar dados
        </h3>
        <q-form
        class="q-gutter-md"
        @submit="putGroup()"
        >
        <div class="inputDiv">
          <label>Nome do Grupo: </label>
          <q-input
            class="inputField"
            outlined
            v-model="group.name"/>
        </div>
        <div class="inputDiv">
            <label>Tipo do Grupo: </label>
            <q-select
              class="inputField"
              outlined
              v-model="group.type"
              label="Tipo do Grupo"
              :options="groupTypes"
              option-value="url"
              option-label="name"
              emit-value
              map-options/>
          </div>
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Cancelar"
            @click="handlePressButton('cancel')"
            color="primary"/>
          <q-btn
            size="1rem"
            label="Salvar"
            type="submit"
            color="primary"/>
        </div>
      </q-form>
      </div>
      <div class="q-pa-md">
        <q-table
          title="Agrupamentos"
          :data="groups"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">{{ props.row.id }}</q-td>
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="type" :props="props">{{ props.row.type }}</q-td>
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
  name: 'Groups',
  data () {
    return {
      groups: [],
      group: {},
      isSelectedGroup: false,
      isCreatingNew: false,
      newGroup: {},
      groupTypes: [],
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: row => row.id, sortable: true, style: 'width: 55px' },
        { name: 'name', label: 'Nome', align: 'left', field: row => row.name, sortable: true },
        { name: 'type', label: 'Tipo', align: 'left', field: row => row.type, sortable: true },
        { name: 'edit', label: 'Editar', align: 'center', format: () => 'Editar', sortable: false, style: 'width: 55px' },
        { name: 'delete', label: 'Excluir', align: 'center', format: () => 'Excluir', sortable: false, style: 'width: 55px' }
      ]
    }
  },
  created () {
    this.getGroups()
    this.getGroupTypes()
  },
  methods: {
    handlePressButton (type, id = null) {
      const options = {
        new: () => {
          this.isSelectedGroup = false
          this.isCreatingNew = !this.isCreatingNew
        },
        show: () => {
          this.isSelectedGroup = true
          this.isCreatingNew = false
          this.getGroup(id)
            .then()
        },
        cancel: () => {
          this.isSelectedGroup = false
        },
        delete: () => {
          this.deleteGroup(id)
        }
      }
      if (options[type]) options[type]()
    },
    getGroups () {
      MASTER
        .get('groups/', {})
        .then(res => {
          console.log(res.data)
          this.groups = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    },
    getGroup (id) {
      MASTER
        .get('groups/' + id, {})
        .then(res => {
          console.log(res.data)
          this.group = res.data
          this.isSelectedGroups = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    putGroup () {
      const { id } = this.group
      MASTER
        .put('groups/' + id + '/', this.group)
        .then(res => {
          this.group = res.data
          this.groups = this.groups.map((group) => {
            if (group.id === id) return res.data
            return group
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
    deleteGroup (id) {
      MASTER
        .delete('groups/' + id, {})
        .then(res => {
          this.groups = this.groups.filter((group) => group.id !== id)
          this.$q.notify({
            type: 'positive',
            message: 'Groups deletado com sucesso.'
          })
          this.isSelectedGroup = false
          this.group = {}
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    postGroup () {
      MASTER
        .post('groups/', this.newGroup)
        .then(res => {
          this.groups.push(res.data)
          this.newGroup = {}
        })
        .catch(err => {
          console.log(err)
        })
    },
    getGroupTypes () {
      MASTER
        .get('group-types/', this.groupTypes)
        .then(res => {
          this.groupTypes = res.data
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
