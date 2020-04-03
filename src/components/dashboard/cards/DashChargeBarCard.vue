<template>
  <q-card
    flat
    class="card-bg">
    <q-inner-loading dark :showing="transductor === undefined">
      <q-spinner-ios size="50px" color="grey-4" thickness="7"/>
    </q-inner-loading>

    <q-card-section
      v-if="transductor"
      class="text-center card-title q-px-sm q-py-xs">
      <charge-bar-chart
        :selectedCampus="campus"/>
    </q-card-section>
  </q-card>
</template>

<script>
import ChargeBarChart from '../../charts/ChargeBarChart.vue'

export default {
  components: {
    ChargeBarChart
  },

  props: {
    transductor: Object,
    campus: Object
  }
}
</script>

<style lang="scss" scoped>
</style>
