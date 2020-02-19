<template>
  <div class="row justify-center q-pa-md">
    <div class="col-md-4 col-lg-5 q-pa-sm">
      <q-img
        contain
        :src="unbenergia"
        style="max-height: 300px; max-width: 100%; min-width: 100px"
      />
      <div class="driver-text q-mb-sm primary-text">
        Projeto de Eficiência Energética CEB/FUB/FINATEC
      </div>
      <div class="driver-text q-mb-lg">
        Eficiência energética em prédios públicos da Universidade de Brasília
      </div>
      <div class="secondary-text q-mb-lg">
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
        <div class="q-pt-lg row q-mb-lg" id="partners">
          <div
            v-for="partner in partners" :key="partner.id"
            class="col">
            <q-img
              contain
              :src="partner"
              style="max-height: 300px; max-width: 100%; min-width: 60px"
            />
          </div>
        </div>
      </span>
    </div>
    <div class="col-md-4 col-lg-5 q-pa-lg" style="display: table-cell; vertical-align: middle">
      <q-form
        class="q-gutter-md q-pa-lg shadow-1"
        style="display:inline-block"
        @validation-success="login()">
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
        <div class="text-right">
          <a href="/users/forgotten-password/">
            Esqueceu sua senha?
          </a>
        </div>
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Entrar"
            type="submit"
            color="primary"/>
        </div>
      </q-form>
      <div class="col-12 q-pa-md text-center" style="font-size:1.3em">
        Não possui uma conta?
        <a href="/users/register/">Cadastre-se</a>
      </div>
    </div>
  </div>
</template>

<script>
import HTTP from '../../services/masterApi/http-common'

export default {
  data () {
    return {
      email: '',
      password: '',
      partners: [
        'https://www.infoescola.com/wp-content/uploads/2016/02/unb.png',
        'statics/ceb_partner.jpg',
        'statics/transparents/logo_PED_vertical_com_sigla.png'
      ],
      unbenergia: 'statics/Brand_Apresentacao_NOVA-1.png'
    }
  },
  methods: {
    login () {
      HTTP
        .post('login/', {
          email: this.email,
          password: this.password
        })
        .then(res => {
          console.log(res)
          this.$q.localStorage.set('userToken', res.data.token)
          this.$q.localStorage.set('userID', res.data.user.id)
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
