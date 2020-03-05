<template>
  <div>
    <q-layout view="hhh lpR fff" style="background-color:#fafafa">
      <user-header/>
      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import UserHeader from 'components/users/Header.vue'

export default {
  name: '',
  components: {
    UserHeader
  }
}
</script>

<style lang="scss">
  .black-test-border {
    border: 1em black solid;
  }

  .container-header {
    // quasar breakpoints: https://quasar.dev/style/breakpoints
    @media (min-width: 1024px) {
      padding-right: 5%;
      padding-left: 5%;

      h1, h2, h3, h4, h5, h6 {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }
  .container {
    // quasar breakpoints: https://quasar.dev/style/breakpoints
    @media (min-width: 1024px) {
      margin-right: 5%;
      margin-left: 5%;

      h1, h2, h3, h4, h5, h6 {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }
  .form-box {
    background-color: white;
  }
  .main-tile {
    // margin-top: 2.5em;
    // margin-bottom: 2.5em;
    margin-top: .5em;
    margin-bottom: .5em;
  }

  .unb-blue {
    background-color: rgba(0, 64, 126, 100%);
  }

  a {
    text-decoration: none;
    color: rgba(0, 64, 126, 100%);
  }
</style>
