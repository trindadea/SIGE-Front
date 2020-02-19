<template>
  <div
    class="q-ma-none q-py-none q-pr-none"
  >
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <dash-consumption-generation-card
          class="height-conf"
          :transductor="currentTransductor"
      />
      </div>
      <div class="col-6">
        <dash-last-72h-card
          class="height-conf"
          :transductor="currentTransductor"
        />
      </div>
    </div>
    <div>
      <dash-charge-bar-card
        class="q-mb-md height-conf"
        :transductor="currentTransductor"
      />
      <dash-last-measurement-card
        class="q-mb-none height-conf"
        :transductor="currentTransductor"
      />
    </div>
  </div>
</template>

<script>
import HTTP from '../../services/masterApi/http-common'
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
      transductors: []
    }
  },

  props: {
    campus_id: {
      type: Number,
      required: true
    }
  },

  methods: {
    getTransductorsForCampi () {
      HTTP
        .get(`/energy_transductors/?campi_id=${this.campus}`)
        .then((res) => {
          this.transductors = res.data
        })
        .catch((err) => { console.error(err) })
    },

    async getInfo () {
      await this.getTransductorsForCampi()
    }
  },

  mounted () {
    this.getInfo()
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
