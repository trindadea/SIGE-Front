<template>
  <div>
    <q-layout view="hhh lpR lff" style="background-color:#fafafa">
      <Header/>
      <q-page-container>
        <router-view/>
      </q-page-container>
      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :width="250"
        :breakpoint="0"
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <div v-for="item in menuItems" :key="item.name">
              <a :href="item.link" style="text-decoration: none" class="text-grey-10">
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon class="text-grey-6" :name="item.icon" />
                  </q-item-section>
                  <q-item-section>
                    {{ item.name }}
                  </q-item-section>
                </q-item>
              </a>
              <q-separator v-if="item.separator"/>
            </div>
          </q-list>
        </q-scroll-area>
        <div class="absolute-bottom">
          <q-separator/>
          <a href="/users/logout" style="text-decoration: none" class="text-grey-10">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon class="text-grey-6" name="img:../../statics/icons/ic_sair.svg" />
                </q-item-section>
                <q-item-section>
                  Sair
                </q-item-section>
              </q-item>
            </a>
        </div>
      </q-drawer>
    </q-layout>
  </div>
</template>

<script>
import Header from 'components/Header.vue'
const menuItems = [
  {
    name: 'Início',
    link: '/',
    icon: 'home',
    separator: false
  },
  {
    name: 'Sobre o Projeto',
    link: '/about',
    icon: 'img:../../statics/icons/ic_sobre.svg',
    separator: false
  },
  {
    name: 'Medidores',
    link: '/transductor_list',
    icon: 'mdi-gauge',
    separator: true
  },
  {
    name: 'Custo Total',
    link: '/total_cost',
    icon: 'equalizer',
    separator: false
  }/* ,
  {
    name: 'Demanda e Geração',
    link: '',
    icon: 'equalizer',
    separator: false
  },
  {
    name: 'Curva de Carga',
    link: '',
    icon: 'equalizer',
    separator: false
  },
  {
    name: 'Relatório de Consumo',
    link: '',
    icon: 'equalizer',
    separator: false
  } */
]
export default {
  components: {
    Header
  },
  data () {
    return {
      drawer: false,
      miniState: true,
      menuItems
    }
  }
}
</script>

<style>
</style>
