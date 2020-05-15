<template>
  <div class="row justify-center q-pa-md">
    <div class="col-md-4 col-lg-5 q-pa-sm">
      <q-img
        contain
        :src="unbenergia"
        style="max-height: 300px; max-width: 100%; min-width: 100px"
      />
      <div class="driver-text q-mb-sm">
        Projeto de Eficiência Energética CEB/FUB/FINATEC
      </div>
      <div class="primary-text q-mb-lg">
        Eficiência energética em prédios públicos da Universidade de Brasília
      </div>
      <div class="secondary-text">
        Sistema de monitoramento e gestão energética de edificações da Universidade de Brasília
        <br><br>
        Monitora, em tempo real, mais de 30 pontos da rede elétrica de UnB. Incluindo a produção de energia dos sistemas de geração fotovoltaica implantados na Universidade.
        <br><br>
        Fornece informações de consumo, nível de tensão, fator de potência, demanda, dentre outros.
      </div>
      <span
        class="bg-grey-1 text-grey-9"
        bordered
      >
        <div class="row q-mb-lg q-pr-md" id="partners">
          <div
            v-for="partner in partners" :key="partner.id"
            class="col-6 col-md-3">
            <q-img
              contain
              :src="partner"
              style="height: 180px;"
            />
          </div>
        </div>
      </span>
    </div>
    <div class="col-md-4 col-lg-5 q-pa-lg">
      <q-form
        class="q-gutter-md q-pa-lg shadow-1 form-box"
        @validation-success="login()"
        @submit.prevent>
        <h3 class="login-text">
          Entre seus dados para acessar
        </h3>
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
<!--         <div class="text-right">
          <a href="/users/forgotten-password/">
            Esqueceu sua senha?
          </a>
        </div> -->
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Entrar"
            type="submit"
            color="primary"/>
        </div>
      </q-form>
      <div class="col-12 q-pa-md text-center">
        Não possui uma conta?
        <a href="/users/register/">Cadastre-se</a>
      </div>
    </div>
  </div>
</template>

<script>
import MASTER from '../../services/masterApi/http-common'
import { mapActions } from 'vuex'
export default {
  created () {
    this.changePage('Login')
  },
  data () {
    return {
      email: '',
      password: '',
      partners: [
        'https://www.infoescola.com/wp-content/uploads/2016/02/unb.png',
        'statics/ceb_partner.jpg',
        'statics/transparents/logo_PED_vertical_com_sigla.png',
        'statics/transparents/logo_finatec@3x.png'
      ],
      unbenergia: 'statics/transparents/proj_trans_l.png'
    }
  },
  methods: {
    ...mapActions('userStore', ['changePage', 'saveUserInfo']),
    login () {
      MASTER
        .post('login/', {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.saveUserInfo({
            'userToken': res.data.token,
            'userID': res.data.user.id,
            'username': res.data.user.name,
            'useremail': res.data.user.email
          })
          this.$q.notify({
            type: 'positive',
            message: `Voce está autenticado.`
          })
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: `Falha ao acessar sua conta. Tente novamente.`
          })
        })
    }
  }
}
</script>

<style lang="scss">
  .secondary-text {
    font-family: Roboto;
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: 0.25px;
    color: rgba(0, 0, 0, 0.87);
  }
  .primary-text {
    font-family: Roboto;
    font-size: 25px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: 0.15px;
    text-align: center;
    color: rgba(0, 64, 126, 100%);
  }
  .driver-text {
    color: rgba(0, 64, 126, 100%);
    font-family: Roboto;
    font-size: 30px;
    font-weight: 300;
    font-stretch: normal;
    font-style: italic;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
  }
  .login-text {
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
