<template>
  <div class="row justify-center q-pa-md">
    <div class="col-9 col-lg-5 q-pa-lg shadow-1 form-box">
      <q-form
        class="q-gutter-md"
        @validation-success="putUserInfo()">
        <h3 class="login-text">
          Editar dados
        </h3>
        <q-input
          outlined
          v-model="fullname"
          label="Nome completo"
          lazy-rules
          :rules="[  val => !!val || 'Insira seu nome completo.']"/>
        <q-input
          outlined
          v-model="email"
          label="Email"
          lazy-rules
          :rules="[  val => val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Insira um email válido.']"/>
        <q-input
          outlined
          v-model="password"
          label="Senha"
          lazy-rules
          password
          type="password"
          :rules="[ val => val && val.length >= 8 || 'Insira uma senha com ao menos 8 caracteres.']"/>
        <q-input
          outlined
          v-model="password_confirmation"
          label="Confirme a senha"
          lazy-rules
          password
          type="password"
          :rules="[ val => val && val == password || 'Insira uma senha com ao menos 8 caracteres.', val => v === this.password || 'Confirmação deve ser iqual a senha informada']"/>
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Editar"
            type="submit"
            color="primary"/>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import MASTER from '../../services/masterApi/http-common'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: '',
  data () {
    return {
      fullname: '',
      email: '',
      password: '',
      password_confirmation: '',
      user: ''
    }
  },
  created () {
    this.changePage('Editar Dados')
    this.user = this.getUser
    if (!this.user.id ||
        !this.user.token) {
      this.$q.notify({
        type: 'negative',
        message: `Você precisa estar logado na sua conta para editá-la.`
      })
      this.$router.push('/users/login/')
      return
    }
    this.retrieveUserInformation()
  },
  computed: {
    ...mapGetters('userStore', ['getUser'])
  },
  methods: {
    ...mapActions('userStore', ['changePage', 'saveUserInfo']),
    retrieveUserInformation () {
      const { user } = this
      MASTER
        .get('users/' + user.id + '/', {
          headers: {
            authorization: 'Token ' + user.token
          }
        })
        .then(res => {
          console.log(res)
          this.fullname = res.data.name
          this.email = res.data.email
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: `Falha ao recuperar seus dados. Tente novamente.`
          })
        })
    },
    putUserInfo () {
      const { user } = this
      let data = {}
      data.name = this.fullname
      data.email = this.email
      data.password = this.password
      MASTER
        .put('users/' + user.id + '/', data,
          {
            headers: {
              authorization: 'Token ' + user.token
            }
          })
        .then(res => {
          this.saveUserInfo({
            'username': this.fullname,
            'useremail': this.useremail
          })
          console.log(res)
          this.$q.notify({
            type: 'negative',
            message: `Seus dados foram atualizados.`
          })
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: `Falha ao editar seus dados. Tente novamente.`
          })
        })
    }
  }
}
</script>

<style lang="scss">
  .secondary-text {
    font-size: 1.3em;
  }
  .primary-text {
    // font-family: ?
    font-size: 2em;
  }
  .driver-text {
    color: rgba(0, 64, 126, 100%);
    font-size: 2em;
    text-align: center;
    padding-left: 5%;
    padding-right: 5%;
  }
  .login-text {
    color: rgba(100, 100, 100, 100%);
  }
</style>
