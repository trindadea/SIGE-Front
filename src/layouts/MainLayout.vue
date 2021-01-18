<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <Header />
      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"

        :width="200"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <div v-for="item in menuItems" :key="item.name">
              <a :href="item.link" style="text-decoration: none" class="text-grey-10">
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon class="icon" :name="item.icon" />
                  </q-item-section>
                  <q-item-section>{{ item.name }}</q-item-section>
                </q-item>
              </a>
              <q-separator v-if="item.separator" />
            </div>
          </q-list>
        </q-scroll-area>
        <div class="absolute-bottom">
          <q-separator />
          <a style="text-decoration: none" class="text-grey-10">
            <q-item clickable v-ripple @click="logout">
              <q-item-section avatar>
                <q-icon class="icon" name="img:/statics/ic_sair.svg" />
              </q-item-section>
              <q-item-section>Sair</q-item-section>
            </q-item>
          </a>
        </div>
      </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from '../components/Header'
import logoutHelper from '../mixins/logoutHelper.js'

export default {
  name: 'MainLayout',
  mixins: [logoutHelper],
  components: {
    Header: Header
  },

  data () {
    return {
      drawer: false,
      miniState: true,
      menuItems: [
        {
          name: 'Início',
          link: '/',
          icon: 'home',
          separator: true
        },
        {
          name: 'Medidores',
          link: '/transductor_list',
          icon: 'mdi-gauge',
          separator: false
        },
        {
          name: 'Custo Total',
          link: '/total_cost',
          icon: 'equalizer',
          separator: false
        },
        {
          name: 'Curva de Carga',
          link: '/energy_consumption',
          icon: 'show_chart',
          separator: false
        },
        {
          name: 'Relatórios',
          link: '/reports',
          icon: 'subject',
          separator: true
        },
        {
          name: 'Sobre o Projeto',
          link: '/about',
          icon: 'img:statics/ic_sobre.svg',
          separator: false
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon {
    color: #757575
  }
</style>
