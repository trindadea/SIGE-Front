<template>
  <div class="q-pa-sm row">
    <div
      class="col-md-4 col-lg-3 col-sm-6 col-12 q-pa-sm"
      v-for="item in graphData"
      :key="item"
    >
      <a :href="item.link" style="text-decoration: none">
        <q-card class="my-card">
          <img src="https://cdn.quasar.dev/img/mountains.jpg">
          <q-card-section>
            <div class="card-text">{{ item.name }}</div>
          </q-card-section>
        </q-card>
      </a>
    </div>
  </div>
</template>

<script>
let graphData = [
  {
    graph: '',
    link: '',
    name: 'Medidores'
  },
  {
    graph: '',
    link: '',
    name: 'Custo Total'
  },
  {
    graph: '',
    link: '',
    name: 'Demanda e Geração'
  },
  {
    graph: '',
    link: '',
    name: 'Curva de Carga'
  },
  {
    graph: '',
    link: '',
    name: 'Fator de Potência'
  }
]
export default {
  created () {
    this.$store.commit('changePage', 'Início')
  },
  data () {
    return {
      graphData
    }
  }
}
</script>

<style>
.card-text {
  font-family: Roboto;
  font-size: 24px;
  font-weight: 300;
  font-stretch: normal;
  font-style: italic;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
}
</style>
