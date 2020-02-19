<template>
  <q-card
    flat
    class="card-bg"
  >
    <q-card-section class="text-center card-title">
      Carga no campus hoje
    </q-card-section>
    <charge-bar-chart/>
  </q-card>
</template>

<script>
import ChargeBarChart from '../../charts/ChargeBarChart.vue'
export default {
  components: {
    ChargeBarChart
  }
}
</script>

<style lang="scss" scoped>

</style>
