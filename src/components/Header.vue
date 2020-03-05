<template>
  <q-header class="q-pa-none unb-blue">
    <q-toolbar class="text-white">
      <a href="/home/">
        <q-img
          src="../statics/icons/logo_smi_horizontal_header.svg"
          style="height: 30px; width: 140px"
        />
      </a>
      <q-toolbar-title class="text-bold text-center">{{ this.$store.state.page }}</q-toolbar-title>
      <q-icon name="mdi-account-circle" class="float-right" size="sm">
        <q-popup-edit content-class="bg-white text-black q-mr-sm q-mt-sm">
          <div v-if="userLogged" class="col text-center">
            <div class="text-bold" style="font-size:1.3em">{{ username }}</div>
            <div>{{ useremail }}</div>
            <div class="q-pa-sm">
              <q-btn outline style="color: #0055aa;" @click="goToEdit">Alterar dados</q-btn>
            </div>
            <div class="q-pa-sm">
              <q-btn outline style="color: #0055aa;" @click="goToLogout">Sair</q-btn>
            </div>
          </div>
          <div v-else class="col text-center">
            <div class="text-bold" style="font-size: 1.3em">Você não está autenticado</div>
            <div class="q-pa-sm">
              <q-btn outline style="color: #0055aa;" @click="goToLogin">Login</q-btn>
            </div>
            <div class="q-pa-sm">
              <q-btn outline style="color: #0055aa;" @click="goToRegister">Registro</q-btn>
            </div>
          </div>
        </q-popup-edit>
      </q-icon>
    </q-toolbar>
  </q-header>
</template>

<script>
import HTTP from '../services/masterApi/http-common'

export default {
  data () {
    return {
      userLogged: false,
      username: '',
      useremail: ''
    }
  },
  methods: {
    goToEdit () {
      this.$router.push({ path: '/users/edit' })
    },
    goToLogin () {
      this.$router.push({ path: '/users/login' })
    },
    goToRegister () {
      this.$router.push({ path: '/users/register' })
    },
    goToLogout () {
      this.$router.push({ path: '/users/logout' })
    },
    loadUserData () {
      let userToken = this.$q.localStorage.getItem('userToken')
      let userID = this.$q.localStorage.getItem('userID')
      if (!userToken || !userID) {
        this.userLogged = false
        return
      } else {
        this.userLogged = true
      }
      let userName = this.$q.localStorage.getItem('userName')
      let userEmail = this.$q.localStorage.getItem('userEmail')
      if (userName && userEmail) {
        this.username = userName
        this.useremail = userEmail
        return
      }
      HTTP
        .get('users/' + this.$q.localStorage.getItem('userID') + '/', {
          headers: {
            authorization: 'Token ' + this.$q.localStorage.getItem('userToken')
          }
        })
        .then(res => {
          console.log(res)
          this.username = res.data.name
          this.useremail = res.data.email
        })
        .catch(err => {
          this.userLogged = false
          console.log(err)
        })
    }
  },
  created () {
    this.loadUserData()
  }
}
</script>

<style scoped lang="scss">
.unb-blue {
  background-color: rgba(0, 64, 126, 100%);
}
</style>
