<template>
  <div>
    <div class="container">
      <div class="btn q-px-md">
        <q-btn
          size="1rem"
          label="Adicionar"
          color="primary"
          @click="handlePressButton('new')"/>
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
              <q-td key="type" :props="props">{{ showTypeName(props.row.type) }}</q-td>
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
    <group-dialog
      :dialog="dialog"
      :types="groupTypes"
      :group="group"
      @close="dialog = false"
      @updateGroup="updateGroup"
      @createGroup="createGroup"/>
  </div>
</template>

<script>
import MASTER from '../../services/masterApi/http-common'
import { mapActions } from 'vuex'
import GroupDialog from '../../components/dialogs/GroupsDialog/GroupsDialog.vue'

export default {
  name: 'Groups',
  components: {
    'group-dialog': GroupDialog
  },
  data () {
    return {
      groups: [],
      group: {},
      dialog: false,
      isSelectedGroup: false,
      isCreatingNew: false,
      newGroup: {},
      dialogProps: {
        title: '',
        type: ''
      },
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
  async created () {
    this.changePage('Gerenciar instalações > Agrupamentos')
    await this.getGroupTypes()
    await this.getGroups()
  },
  methods: {
    ...mapActions('userStore', ['changePage']),
    showTypeName (type) {
      return this.groupTypes.find(value => value.url === type).name
    },
    createGroup (payload) {
      this.newGroup = payload
      this.postGroup()
      this.dialog = false
    },
    updateGroup (payload) {
      this.group = payload
      this.putGroup()
      this.dialog = false
    },
    handlePressButton (type, id = null) {
      const options = {
        new: () => {
          this.dialog = true
          this.group = {
            title: '',
            type: ''
          }
        },
        show: async () => {
          await this.getGroup(id)
          this.dialog = true
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
    async getGroups () {
      await MASTER
        .get('groups/', {})
        .then(res => {
          this.groups = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    },
    getGroup (id) {
      MASTER
        .get(`groups/${id}/`, {})
        .then(res => {
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
        .put(`groups/${id}/${this.group}/`)
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
        .delete(`groups/${id}/`, {})
        .then(res => {
          this.groups = this.groups.filter((group) => group.id !== id)
          this.$q.notify({
            type: 'positive',
            message: 'Groups deletado com sucesso.'
          })
          this.isSelectedGroup = false
          this.group = {}
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
    async getGroupTypes () {
      await MASTER
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
