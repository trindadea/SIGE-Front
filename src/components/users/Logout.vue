<template>
  <div>Você está deslogado... Sendo redicionado</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.logout()

    this.$q.notify({
      type: 'positive',
      message: `Voce saiu da sua conta.`
    })
    this.$router.push('/')
  },
  methods: {
    ...mapActions('userStore', ['logout'])
  }
}
</script>

<style>
</style>
