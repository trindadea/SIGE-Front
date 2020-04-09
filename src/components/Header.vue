<template>
  <q-header class="q-pa-none unb-blue">
    <q-toolbar class="text-white">
      <a href="/">
        <q-img
          src="../statics/icons/logo_smi_horizontal_header.svg"
          style="height: 30px; width: 140px"
        />
      </a>
      <q-toolbar-title class="text-bold text-center">{{ this.$store.state.page }}</q-toolbar-title>
      <q-icon name="mdi-account-circle" class="float-right" size="sm">
        <q-popup-edit content-class="bg-white text-black q-mr-sm q-mt-sm" v-model="username">
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
import { mapGetters, mapActions } from 'vuex'
import MASTER from '../services/masterApi/http-common'

export default {
  data () {
    return {
      userLogged: '',
      username: '',
      useremail: ''
    }
  },
  computed: {
    ...mapGetters('userStore', ['getUser', 'authStatus'])
  },
  methods: {
    ...mapActions('userStore', ['saveUserInfo']),
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

    async loadUserData () {
      if (await this.authStatus) {
        this.userLogged = true
      } else {
        return
      }
      let user = this.getUser
      let userName = user.username
      if (userName === null) userName = ''
      let userEmail = user.useremail
      if (userEmail === null) userEmail = ''
      if (userName && userEmail) {
        this.username = userName
        this.useremail = userEmail
      }
      MASTER
        .get('users/' + user.id + '/', {
          headers: {
            authorization: 'Token ' + user.token
          }
        })
        .then(res => {
          this.username = res.data.name
          this.useremail = res.data.email
          this.saveUserInfo({
            'username': this.username,
            'useremail': this.useremail
          })
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
