<template>
  <q-page class="flex flex-start row q-pa-md">
    <div
      class="col-md-3 col-sm-6 col-lg-3 q-pa-sm"
      v-for="item in graphData"
      :key="item.name"
    >
      <a :href="item.link" style="text-decoration: none">
        <q-card>
          <img :src=item.image>
          <q-card-section>
            <div class="card-text">{{ item.name }}</div>
          </q-card-section>
        </q-card>
      </a>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
      graphData: [
        {
          image: require('../statics/Medidores.png'),
          link: '/transductor_list',
          name: 'Medidores'
        },
        {
          image: require('../statics/CustoTotal.png'),
          link: '/total_cost',
          name: 'Custo Total'
        },
        {
          image: require('../statics/CurvaDeCarga.png'),
          link: '/tenergy_consumption',
          name: 'Curva de Carga'
        },
        {
          image: require('../statics/Relatorios.png'),
          link: '/treports',
          name: 'Relatórios'
        }
      ]
    }
  },
  created () {
    this.changePage('Início')
  },
  methods: {
    ...mapActions('userStore', ['changePage'])
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
