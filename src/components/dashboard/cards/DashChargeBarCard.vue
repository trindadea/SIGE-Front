<template>
  <q-card
    flat
    class="card-bg"
  >
    <q-card-section class="text-center card-title q-px-sm q-py-xs">
      Carga no campus hoje
      <charge-bar-chart/>
    </q-card-section>
  </q-card>
</template>

<script>
// import ChargeBarChart from '../../charts/ChargeBarChart.vue'
export default {
  components: {
    // ChargeBarChart
  }
}
</script>

<style lang="scss" scoped>
</style>
