<template>
  <q-page class="flex flex-start row q-pa-md">
    <div
      class="col-md-2 col-sm-8 col-lg-2 q-pa-sm"
      v-for="item in graphData"
      :key="item.name"
    >
      <a :href="item.link" style="text-decoration: none">
        <q-card>
          <q-list>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="primary" name="settings" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </a>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ManageInstallations',
  data () {
    return {
      graphData: [
        {
          image: 'statics/campus.png',
          icon: 'AccountBalance',
          link: '/campi',
          name: 'Campi'
        },
        {
          image: 'statics/Relatorios.png',
          link: '/group_type',
          name: 'Tipos de Agrupamento'
        },
        {
          image: 'statics/Relatorios.png',
          link: '/groups',
          name: 'Agrupamentos'
        },
        {
          image: 'statics/Relatorios.png',
          link: '/slaves',
          name: 'Servidores Distribuídos'
        },
        {
          image: 'statics/Relatorios.png',
          link: '/transductors',
          name: 'Medidores'
        },
        {
          image: 'statics/Relatorios.png',
          link: '/tariffs',
          name: 'Tarifas'
        }
      ]
    }
  },
  created () {
    this.changePage('Gerenciar Instalações')
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
