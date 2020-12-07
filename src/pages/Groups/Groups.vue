<template>
  <div>
    <h3 class="title">Lista de Grupos </h3>
    <div class="btn">
      <q-btn
        size="1rem"
        label="Novo"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container">
      <div class="lst-groups">
        <ul>
          <li v-for="(group,index) in groups" :key="index">
            <p class="lst-item">
              {{index}} - {{group.name}}
            <q-btn
              size="1rem"
              label="show"
              @click="handlePressButton('show', group.id)"
              color="primary"/>
              </p>
          </li>
        </ul>
      </div>
      <div class="groups-info" v-if="isCreatingNew">
        <h3 class="login-text">
          Novo Grupo
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postGroup()"
          >
          <q-input
            outlined
            v-model="newGroup.name"
            label="Nome do Grupo"/>
          <q-select
            outlined
            v-model="newGroup.type"
            label="Tipo do Grupo"
            :options="groupTypes"
            option-value="url"
            option-label="name"
            emit-value
            map-options/>
          <div class="text-center q-mt-lg">
            <q-btn
              size="1rem"
              label="Enviar"
              type="submit"
              color="primary"/>
          </div>
        </q-form>
      </div>
      <div class="group-info" v-if="isSelectedGroup">
        <h3 class="login-text">
          Editar dados
        </h3>
        <p>Id: {{group.id}}</p>
        <q-form
        class="q-gutter-md"
        @submit="putGroup()"
        >
        <q-input
          outlined
          v-model="group.name"
          label="Nome do Group"/>
        <q-select
          outlined
          v-model="group.type"
          label="Tipo do Grupo"
          :options="groupTypes"
          option-value="url"
          option-label="name"
          emit-value
          map-options/>
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Salvar"
            type="submit"
            color="primary"/>
          <q-btn
            size="1rem"
            label="Deletar"
            @click="deleteGroup(group.id)"
            color="primary"/>
        </div>
      </q-form>
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
      groupTypes: []
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
<style>
.container {
  display               : grid;
  font-size             : 25px;
  grid-template-columns : 30% 1fr;
  gap                   : 10px;
  height                : 100vh;
  max-width             : 100vw;
  padding               : 10px;;
}
.groups-info {
  padding   : 20px;
}
.title {
  padding-left: 20px;
}
.btn {
  padding   : 20px;
}

</style>
