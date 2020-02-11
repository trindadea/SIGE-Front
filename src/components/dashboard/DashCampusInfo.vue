<template>
  <q-card
    class="q-pa-sm q-ma-none"
  >
    <div class="q-row">
      <div class="q-col">
        <dash-consumption-generation-card/>
      </div>
      <div class="q-col">
        dfsdsfadf
      </div>
      <div class="q-col-6">
        <dash-last-72h-card></dash-last-72h-card>
      </div>
    </div>
    <dash-charge-bar-card></dash-charge-bar-card>
    <dash-last-measurement-card></dash-last-measurement-card>
  </q-card>
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
