<template>
  <q-layout
    view="hHh LpR fFf">

    <q-header
      class="bg-grey-10 text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          :icon="!left ? 'menu' : 'close'"
          @click="left = !left"/>

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar> -->
          <span>
            Sistema de Monitoramento de Insumos
          </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      side="left"
      behavior="desktop"
      bordered>
      <q-scroll-area
        class="fit bg-grey-9 text-white">
        <q-list
          padding
          class="menu-list">
          <q-item-label
            header
            class="text-grey-5">
            Menu do dashboard
          </q-item-label>
          <!-- <q-separator spaced dark/> -->
          <div
            v-for="menuItem in menuItems"
            :key="menuItem.id">
            <q-item
              clickable
              v-ripple
              class="item-link"
              :to="menuItem.to">
              <q-item-section
                avatar
                v-if="menuItem.icon">
                <q-icon :name="menuItem.icon"/>
              </q-item-section>
              <q-item-section>
                {{ menuItem.name }}
              </q-item-section>
            </q-item>
            <!-- <q-separator spaced dark/> -->
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <transition>
        <router-view />
      </transition>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'Dashboard',

  data () {
    return {
      left: true,

      menuItems: [
        // FIX: a aba de status do sistema está sempre ativa
        { name: 'Estado do sistema', icon: 'healing', to: '/dashboard/' },
        { name: 'Tensão', icon: 'bolt', to: '/dashboard/tension' },
        { name: 'Corrente', icon: 'power', to: '/dashboard/current' },
        { name: 'Frequência', icon: 'swap_calls', to: '/dashboard/frequency' }
      ],

      something: [
        { name: 'Low - 2013', data: [12, 11, 14, 18, 17, 13, 13] },
        { name: 'Mid - 2013', data: [20, 26, 22, 29, 22, 23, 30] },
        { name: 'High - 2013', data: [28, 29, 33, 36, 32, 32, 33] }
      ],

      data: {
        categories: [],
        title: {
          text: 'placeholder'
        }
      },

      series: [
        {
          name: 'Placeholder',
          data: []
        }
      ]
    }
  },

  components: {
  },

  computed: {
  }
}
</script>

<style lang="scss">
  .q-item.q-router-link--active {
    font-weight: bolder;
    color: white !important;
  }
</style>
