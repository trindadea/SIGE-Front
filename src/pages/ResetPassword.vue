<template>
  <q-page class="flex flex-center">
    <div class="row justify-center q-pa-xl">
      <div class="col-12 col-lg-12 bg-white q-pa-md shadow-1">
        <div v-if="!validToken"
          class="text-center helper-text">
          Não é possível resetar sua senha: Token inválido ou expirado.
        </div>
        <q-form
          v-else
          class="q-gutter-md form-box"
          @validation-success="register()"
          @submit.prevent>
          <div class="text-center helper-text">
            Olá {{ userEmail }}! Por favor, cadastre uma nova senha:
          </div>
          <q-input
            outlined
            v-model="password"
            label="Senha"
            password
            type="password"
            lazy-rules
            :rules="[  val => val && val.length >= 8 || 'Insira uma senha com no mínimo 8 caracteres.']"/>
          <q-input
            outlined
            v-model="password_confirmation"
            label="Confirme a senha"
            password
            type="password"
            lazy-rules
            :rules="[  val => val && val.length >= 8 || 'Insira uma senha com no mínimo 8 caracteres.',
            val => val === this.password || 'Confirmação deve ser igual à senha original']"/>
          <div class="text-center q-mt-lg">
            <q-btn
              size="1rem"
              label="Cadastrar"
              type="submit"
              color="primary"/>
          </div>
        </q-form>
      </div>
  </div>
  </q-page>
</template>

<script>
import ResetPasswordService from 'src/services/ResetPasswordService'

import { mapActions } from 'vuex'

const resetPasswordService = new ResetPasswordService()

export default {
  name: 'Reset Password',
  data () {
    return {
      password: '',
      password_confirmation: '',
      user_type: 'general_user',
      userName: '',
      userEmail: '',
      validToken: false,
      token: ''
    }
  },
  methods: {
    ...mapActions('userStore', ['changePage', 'saveUserInfo']),
    register () {
      this.$q.loading.show()
      resetPasswordService
        .resetPassword({
          token: this.token,
          password: this.password
        })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Senha resetada com sucesso.'
          })
          this.$router.push('/login')
        })
        .catch((err) => {
          const errorDetails = JSON.stringify(err.response.data)
          this.$q.notify({
            type: 'negative',
            message: 'Erro ao resetar sua senha' + `: ${errorDetails}`
          })
        })
        .finally(() => (this.$q.loading.hide()))
    }
  },
  created () {
    this.$q.loading.show()
    this.userEmail = this.$route.query.email
    this.token = this.$route.params.token

    this.changePage('Resetar senha')

    resetPasswordService
      .validateResetPasswordToken({ token: this.token })
      .then(() => (this.validToken = true))
      .catch(() => (this.validToken = false))
      .finally(() => (this.$q.loading.hide()))
  }
}
</script>

<style lang="scss" scoped>
  .secondary-text {
    font-size: 1.3em;
  }
  .primary-text {
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
  .helper-text {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.25px;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
  }
</style>
