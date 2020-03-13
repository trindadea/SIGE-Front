<template>
  <div>
    Você está deslogado... Sendo redicionado
  </div>
</template>

<script>
export default {
  created () {
    this.$q.localStorage.set('userID', '')
    this.$q.localStorage.set('userToken', '')
    this.$store.commit('setAuthStatus', false)
    this.$q.notify({
      type: 'positive',
      message: `Voce saiu da sua conta.`
    })
    this.$router.push('/')
  }
}
</script>

<style>

</style>
