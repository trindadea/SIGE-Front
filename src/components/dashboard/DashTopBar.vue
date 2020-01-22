<template>
  <q-bar
    dense
    class="q-py-none q-px-sm row">
    <div
      class="col">
      <img src="statics/transparents/proj_trans_s.png" height="30px">
    </div>
    <div
      id="alerts"
      class="col text-center">
      {{ alerts !== [] ? alerts.length : 0 }} ocorrências em andamento
    </div>
    <div
      id="datetime"
      class="col text-right">
      {{Date.now()}}
    </div>
  </q-bar>
</template>

<script>
export default {
  name: 'DashTopBar',

  data () {
    return {
      alerts: []
    }
  }

}
</script>

<style lang="scss" scoped>
  .q-bar {
    background-color: #22222f;
    color: #f3f3f3;
  }

</style>
