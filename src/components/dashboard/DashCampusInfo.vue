<template>
  <div
    class="q-ma-none q-py-none q-pr-none"
  >
    {{selectedTransductor}}
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <dash-consumption-generation-card
          class="height-conf"
          :transductor="selectedTransductor"
      />
      </div>
      <div class="col-6">
        <dash-last-72h-card
          class="height-conf"
          :transductor="selectedTransductor"
        />
      </div>
    </div>
    <div>
      <dash-charge-bar-card
        class="q-mb-md height-conf"
        :transductor="selectedTransductor"
      />
      <dash-last-measurement-card
        class="q-mb-none height-conf"
        :transductor="selectedTransductor"
      />
    </div>
  </div>
</template>

<script>
import DashLast72hCard from './cards/DashLast72hCard'
import DashChargeBarCard from './cards/DashChargeBarCard'
import DashLastMeasurementCard from './cards/DashLastMeasurementCard'
import DashConsumptionGenerationCard from './cards/DashConsumptionGenerationCard'

export default {
  name: 'DashCampusInfo',

  components: {
    DashChargeBarCard,
    DashConsumptionGenerationCard,
    DashLast72hCard,
    DashLastMeasurementCard
  },

  data () {
    return {
    }
  },

  props: {
    campus_id: {
      type: Number,
      required: true
    },
    selectedTransductor: Object
  }
}
</script>

<style lang="scss">
  .height-conf {
    min-height: 17.5vh;
    max-height: 17.5vh;
  }

  small {
    font-size: 16px;
    font-weight: normal;
    color: rgba(255, 255, 255, 0.6);
  }

</style>
