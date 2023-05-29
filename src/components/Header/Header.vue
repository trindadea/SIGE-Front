<template>
  <q-header class="q-pa-none unb-blue" elevated>
    <q-toolbar class="text-white">
      <a href="/">
        <img style="height: 30px; width: 140px" src="../../statics/logo_smi_horizontal_header.svg" alt="Minha Figura">
      </a>
      <q-toolbar-title class="text-bold text-center">{{
        getPage
      }}</q-toolbar-title>
      <div style="padding-left: 8%">
        <q-icon name="account_circle" class="float-right" size="sm">
          <q-popup-edit
            content-class="bg-white text-black q-mr-sm q-mt-sm popup"
            v-model="username"
          >
            <div v-if="userIsLogged" class="col text-center">
              <div class="text-bold" style="font-size: 1.3em">
                {{ username }}
              </div>
              <div>{{ useremail }}</div>
              <div class="q-pa-sm">
                <q-btn outline style="color: #0055aa" @click="goToEdit"
                  >Alterar dados</q-btn
                >
              </div>
              <div class="q-pa-sm">
                <q-btn outline style="color: #0055aa" @click="logout"
                  >Sair</q-btn
                >
              </div>
            </div>
            <div v-else class="col text-center">
              <div class="text-bold" style="font-size: 1.3em">
                Você não está autenticado3
              </div>
              <div class="q-pa-sm">
                <q-btn outline style="color: #0055aa" @click="goToLogin"
                  >Login</q-btn
                >
              </div>
              <div class="q-pa-sm">
                <q-btn outline style="color: #0055aa" @click="goToRegister"
                  >Registro</q-btn
                >
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
import MASTER from '../../services/masterApi/http-common'
import logoutHelper from '../../mixins/logoutHelper.js'

export default {
  mixins: [logoutHelper],
  data() {
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
    goToEdit() {
      this.$router.push({ path: '/edit' })
    },
    goToLogin() {
      this.$router.push('/login')
    },
    goToRegister() {
      this.$router.push('/register')
    },
    async getUsers(user) {
      try {
        const response = await MASTER.get('users/' + user.id + '/', {
          headers: {
            authorization: 'Token ' + user.token
          }
        })
        this.username = response.data.name
        this.useremail = response.data.email
        this.saveUserInfo({
          username: this.username,
          useremail: this.useremail
        })
      } catch (error) {
        this.userIsLogged = false
        console.log(error)
      }
    },
    async loadUserData() {
      const authStatus = await this.authStatus

      if (!authStatus) {
        return
      }

      this.userIsLogged = true
      const user = this.getUser

      const { username, useremail } = user
      if (username && useremail) {
        this.username = username
        this.useremail = useremail
      }
      this.getUsers(user)
    }
  },
  created() {
    this.loadUserData()
  },
  watch: {
    '$route.path': 'loadUserData'
  }
}
</script>

<style scoped lang="scss" src="./styles.scss"></style>
