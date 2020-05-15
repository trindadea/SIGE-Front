<template>
  <div class="q-pa-sm row">
    <div
      class="col-md-4 col-lg-3 col-sm-6 col-12 q-pa-sm"
      v-for="item in graphData"
      :key="item.name"
    >
      <a :href="item.link" style="text-decoration: none">
        <q-card class="my-card">
          <img :src="item.image">
          <q-card-section>
            <div class="card-text">{{ item.name }}</div>
          </q-card-section>
        </q-card>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

let graphData = [
  {
    image: 'statics/CustoTotal.png',
    link: '/total_cost',
    name: 'Custo Total'
  },
  {
    image: 'statics/Medidores.png',
    link: '/transductor_list',
    name: 'Medidores'
  }
]
export default {
  created () {
    this.changePage('Início')
  },
  data () {
    return {
      graphData
    }
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
