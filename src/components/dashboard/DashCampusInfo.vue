<template>
  <div class="q-ma-none q-py-none q-pr-none">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-12 col-lg-6">
        <dash-consumption-generation-card
          class="height-conf"
          :transductor="selectedTransductor"/>
      </div>

      <div class="col-12 col-sm-12 col-lg-6">
        <dash-last-72h-card
          class="height-conf"
          :last72hEvents="last72hEvents"/>
      </div>
    </div>

    <div>
      <dash-charge-bar-card
        class="q-mb-md height-conf"
        :transductor="selectedTransductor"
        :campus="currentCampus"/>

      <div>
        <q-linear-progress
          class="transductor-cycle-progess"
          dark
          size="10px"
          :value="transductorCycleProgress"
        />
        <dash-last-measurement-card
          class="q-mb-none height-conf"
          :realTimeMeasurements="this.realTimeMeasurements"
          :measurementsCallback="measurementsFromTransductor"
          :transductor="selectedTransductor"
          :transductor_occurences="this.transductor_occurences"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DashConsumptionGenerationCard from './cards/DashConsumptionGenerationCard'
import DashLast72hCard from './cards/DashLast72hCard'
import DashChargeBarCard from './cards/DashChargeBarCard'
import DashLastMeasurementCard from '../DashLastMeasurementCard'
import { getCampusLast72hEvents, getTransductorsLast72h } from '../../services/api/occurences'
import { getRealTimeMeasurement } from '../../services/api/realTimeMeasurements'

export default {
  name: 'DashCampusInfo',

  components: {
    DashConsumptionGenerationCard,
    DashLast72hCard,
    DashChargeBarCard,
    DashLastMeasurementCard
  },

  props: {
    currentCampus: Object,
    selectedTransductor: Object,
    transductorCycleProgress: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      last72hEvents: undefined,
      transductor_occurences: {},
      realTimeMeasurements: []
    }
  },

  watch: {
    currentCampus: function () {
      this.getApiInfo()
    },
  },

  mounted () {
    this.getApiInfo()
  },

  methods: {
    async getApiInfo () {
      this.last72hEvents = await getCampusLast72hEvents(this.currentCampus);
    },

    async measurementsFromTransductor () {
      this.realTimeMeasurements = await getRealTimeMeasurement(this.selectedTransductor.id)
      this.transductor_occurences = await getTransductorsLast72h(this.selectedTransductor.id)
    }
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

  .transductor-cycle-progess {
    color: #339cff;
  }

  @media screen and (max-width: 1440px) {
    .height-conf {
      min-height: 170px !important;
      max-height: 100% !important;
    }
  }
</style>
