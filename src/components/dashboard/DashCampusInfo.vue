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
          :transductor="selectedTransductor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DashConsumptionGenerationCard from './cards/DashConsumptionGenerationCard'
import DashLast72hCard from './cards/DashLast72hCard'
import DashChargeBarCard from './cards/DashChargeBarCard'
import DashLastMeasurementCard from './cards/DashLastMeasurementCard'
import MASTER from '../../services/masterApi/http-common'

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
      last72hEvents: undefined
    }
  },

  watch: {
    currentCampus: function () {
      this.getApiInfo()
    }
  },

  mounted () {
    this.getApiInfo()
  },

  methods: {
    getLast72hEvents (campus) {
      MASTER
        .get(`/occurences/?type=period&campus=${campus.id}`)
        .then((res) => {
          this.last72hEvents = res.data
          this.last72hEvents.campus_name = this.currentCampus.name
        })
        .catch((err) => { console.error(err) })
    },

    async getApiInfo () {
      await this.getLast72hEvents(this.currentCampus)
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
