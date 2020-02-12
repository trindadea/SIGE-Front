<template>
  <div
    class="q-ma-none q-py-none q-pr-none"
  >
    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <dash-consumption-generation-card style="min-height: 100%"/>
      </div>
      <div class="col-6">
        <dash-last-72h-card></dash-last-72h-card>
      </div>
    </div>
    <dash-charge-bar-card></dash-charge-bar-card>
    <dash-last-measurement-card></dash-last-measurement-card>
  </div>
</template>

<script>
import DashChargeBarCard from './DashChargeBarCard'
import DashConsumptionGenerationCard from './DashConsumptionGenerationCard'
import DashLast72hCard from './DashLast72hCard'
import DashLastMeasurementCard from './DashLastMeasurementCard'

export default {
  name: 'DashCampusInfo',

  components: {
    DashChargeBarCard,
    DashConsumptionGenerationCard,
    DashLast72hCard,
    DashLastMeasurementCard
  }
}
</script>

<style scoped>

</style>
