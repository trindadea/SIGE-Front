<template>
  <q-page class="flex flex-center">
    <div class="row justify-center q-pa-xl">
      <div class="col-9 col-lg-5 bg-white q-pa-md shadow-1">
        <q-form
          class="q-gutter-md form-box"
          @validation-success="register()"
          @submit.prevent>
          <div class="text-center helper-text">
            Entre com seu e-mail. Iremos enviar uma mensagem explicando como recuperar sua conta.
          </div>
          <q-input
            outlined
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[  val => val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Insira um email válido.']"/>
          <div class="text-center q-mt-lg">
            <q-btn
              size="1rem"
              label="Recuperar"
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
  name: 'ForgottenPassword',
  created () {
    this.changePage('Esqueci minha senha')
  },
  data () {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions('userStore', ['changePage', 'saveUserInfo']),
    register () {
      this.$q.loading.show()
      resetPasswordService
        .requestResetPasswordEmail({ email: this.email })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Um e-mail será enviado para o endereço especificado, caso o mesmo exista.'
          })
        })
        .catch(console.error)
        .finally(() => (this.$q.loading.hide()))
    }
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
