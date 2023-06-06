<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderPage />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'AuthLayout',
  components: {
    HeaderPage: Header
  },
  data () {
    return {}
  }
}
</script>
