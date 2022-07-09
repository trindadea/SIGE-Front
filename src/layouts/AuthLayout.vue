<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from '../components/Header'

export default {
  name: 'AuthLayout',
  components: {
    Header: Header
  },
  data () {
    return {}
  }
}
</script>
