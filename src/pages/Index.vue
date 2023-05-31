<template>
  <section>
    <div class="home-options-div">
      <q-card
        v-for="item in graphData"
        :key="item.name"
        class="home-options-card"
        @click="selectHomeOption(item.link)"
      >
        <img :src=item.image>
        <q-card-section>
            <div class="card-text">{{ item.name }}</div>
        </q-card-section>
      </q-card>      
    </div>
  </section>
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
          link: '/energy_consumption',
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
    ...mapActions('userStore', ['changePage']),
    
    selectHomeOption(link) {
      this.$router.push(link)
    },
  },
}
</script>

<style>

.home-options-div {
  width: 100%;
  margin-top: 100px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.home-options-card {
  width: 300px;
  margin: 20px;

  cursor: pointer;
  border-radius: 10px;
}

.home-options-card:hover {
  background-color: #f2f2f2;
}

.card-text {
  font-size: 20px;
  font-weight: 300;
  line-height: normal;
  text-align: center;
  color: #000000;
}
</style>
