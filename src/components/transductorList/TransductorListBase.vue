<template>
  <div>
    <q-layout view="hhh lpR fff">
      <Header/>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Header from 'components/transductorList/TransductorListHeader'

export default {
  name: '',

  components: {
    Header
  }
}
</script>

<style lang="scss">

</style>
