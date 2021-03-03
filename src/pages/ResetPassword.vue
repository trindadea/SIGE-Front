<template>
  <q-page class="flex flex-center">
    <div class="row justify-center q-pa-xl">
      <div class="col-9 col-lg-5 bg-white q-pa-md shadow-1">
        <q-form
          class="q-gutter-md form-box"
          @validation-success="register()"
          @submit.prevent>
          <div class="text-center helper-text">
            Cadastre uma nova senha.
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
// import MASTER from '../services/masterApi/http-common'
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  created () {
    this.changePage('Resetar senha')
  },
  data () {
    return {
      fullname: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    ...mapActions('userStore', ['changePage', 'saveUserInfo']),
    register () {
      // TODO
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
