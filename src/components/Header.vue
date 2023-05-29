<template>
  <q-header class="q-pa-none unb-blue" elevated>
    <q-toolbar class="text-white">
      <a href="/">
        <q-img
          src="statics/logo_smi_horizontal_header.svg"
          style="height: 30px; width: 140px"
        />
      </a>
      <q-toolbar-title class="text-bold text-center">{{ getPage }}</q-toolbar-title>
      <div style="padding-left: 8%">
      <q-icon name="account_circle" class="float-right" size="sm">
        <q-popup-edit content-class="bg-white text-black q-mr-sm q-mt-sm popup" v-model="username">
          <div v-if="userIsLogged" class="col text-center">
            <div class="text-bold" style="font-size:1.3em">{{ username }}</div>
            <div>{{ useremail }}</div>
            <div class="q-pa-sm">
              <q-btn outline style="color: #0055aa;" @click="goToEdit">Alterar dados</q-btn>
            </div>
            <div class="q-pa-sm">
              <q-btn outline style="color: #0055aa;" @click="logout">Sair</q-btn>
            </div>
          </div>
          <div v-else class="col text-center">
            <div class="text-bold" style="font-size: 1.3em">Você não está autenticado1</div>
            <div class="q-pa-sm">
              <q-btn outline style="color: #0055aa;" @click="goToLogin">Login</q-btn>
            </div>
            <div class="q-pa-sm">
              <q-btn outline style="color: #0055aa;" @click="goToRegister">Registro</q-btn>
            </div>
          </div>
        </q-popup-edit>
      </q-icon>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MASTER from '../services/masterApi/http-common'
import logoutHelper from '../mixins/logoutHelper.js'

export default {
  mixins: [logoutHelper],
  data () {
    return {
      userIsLogged: false,
      username: '',
      useremail: ''
    }
  },
  computed: {
    ...mapGetters('userStore', ['getUser', 'authStatus', 'getPage'])
  },
  methods: {
    ...mapActions('userStore', ['saveUserInfo']),
    goToEdit () {
      this.$router.push({ path: '/edit' })
    },
    goToLogin () {
      this.$router.push('/login')
    },
    goToRegister () {
      this.$router.push('/register')
    },
    getUsers (user) {
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
            username: this.username,
            useremail: this.useremail
          })
        })
        .catch(err => {
          this.userIsLogged = false
          console.log(err)
        })
    },
    async loadUserData () {
      if (await this.authStatus) {
        this.userIsLogged = true
      } else {
        return
      }
      const user = this.getUser
      let userName = user.username
      if (userName === null) userName = ''
      let userEmail = user.useremail
      if (userEmail === null) userEmail = ''
      if (userName && userEmail) {
        this.username = userName
        this.useremail = userEmail
      }
      this.getUsers(user)
    }
  },
  created () {
    this.loadUserData()
  },
  watch: {
    '$route.path': 'loadUserData'
  }
}
</script>

<style scoped lang="scss">
.unb-blue {
  background-color: rgba(0, 64, 126, 100%);
}
.popup {
  min-width: '30%';
  min-height: '10%';
}
</style>
