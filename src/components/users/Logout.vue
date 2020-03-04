<template>
  <div>
    Você está deslogado... Sendo redicionado
  </div>
</template>

<script>
export default {
  created () {
    this.$q.localStorage.set('userID', null)
    this.$q.localStorage.set('userToken', null)
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
