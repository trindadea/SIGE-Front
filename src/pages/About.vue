<template>
  <div class="container">
    <q-icon class="img q-mb-sm" name="img:statics/transparents/logo_smi_horizontal.svg" />
    <div class="text-1">Projeto de Eficiência Energética CEB/FUB/FINATEC</div>
    <div class="subtitle-1">Eficiência energética em prédios públicos   da Universidade de Brasília</div>
    <div class="body-2">Sistema de monitoramento e gestão de energética de edificações da Universidade de Brasília. </div>
    <div class="body-2">Monitora, em tempo real, de 30 pontos da rede elétrica da UnB. Incluindo a produção de energia dos sistemas de geração fotovoltaica implantados na Universidade. </div>
    <div class="body-2">Fornece informações de consumo, nível de tensão, fator de potência, demanda, dentre outros. </div>
    <div class="collaborators">
      <q-icon class="logo-unb" name="img:statics/logo_unb.svg" />
      <q-icon class="logo-unb" name="img:statics/logo_ceb.svg" />
      <q-icon class="logo-unb" name="img:statics/logo_aneel.svg" />
      <q-icon class="logo-unb" name="img:statics/logo_finatec@4x.png" />
    </div>
    <div class="created">
      <p>
        Criação:
      </p>
      <q-icon class="lappis-logo" name="img:statics/logo_lappis.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffffff;
  margin-right: 0;
}
.img {
  height: 100%;
  width: 25%;
  margin-top: 1%;
}
.logo-unb {
  height: auto;
  width: 20%;
}
.text-1 {
  width: 25vw;
  font-family: Roboto;
  font-size: 3.7vh;
  font-weight: 300;
  font-style: italic;
  text-align: center;
  color: $primary;
  margin-bottom: 0.5%;
}
.subtitle-1 {
  width: 23vw;
  font-family: Roboto;
  font-size: 2.4vh;
  line-height: 1.5;
  letter-spacing: 0.15px;
  text-align: center;
  color: $primary;
  margin-bottom: 1%;
}
.body-2 {
  width: 35vw;
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.25px;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 1.5%;
}
.collaborators {
  width: 40vw;
  height: 7vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 1%;
}
.created {
  margin-top: 2%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.created p {
  font-family: Roboto;
  font-size: 2vh;
  line-height: 1.33;
  letter-spacing: 0.4px;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
}
.lappis-logo {
  width: 70%;
  height: 20%;
}
</style>
