<template>
  <div class="q-ma-none q-py-none q-pr-none">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6">
        <dash-consumption-generation-card
          class="height-conf"
          :transductor="selectedTransductor"/>
      </div>

      <div class="col-12 col-sm-6">
        <dash-last-72h-card
          class="height-conf"
          :last72hEvents="last72hEvents"/>
      </div>
    </div>

        <!-- style="height: 100vh!important" -->
    <div>
      <dash-charge-bar-card
        class="q-mb-md height-conf"
        :transductor="selectedTransductor"
        :campus="currentCampus"/>

      <dash-last-measurement-card
        class="q-mb-none height-conf"
        :transductor="selectedTransductor"/>
    </div>
  </div>
</template>

<script>
import DashLast72hCard from './cards/DashLast72hCard'
import DashChargeBarCard from './cards/DashChargeBarCard'
import DashLastMeasurementCard from './cards/DashLastMeasurementCard'
import DashConsumptionGenerationCard from './cards/DashConsumptionGenerationCard'
import MASTER from '../../services/masterApi/http-common'

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
      last72hEvents: undefined
    }
  },

  props: {
    currentCampus: Object,
    selectedTransductor: Object
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

    // onResize (size) {
    //   console.log(size)
    // },

    async getApiInfo () {
      await this.getLast72hEvents(this.currentCampus)
    }
  },

  mounted () {
    this.getApiInfo()
  },

  updated () {
    this.getApiInfo()
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

  @media screen and (max-width: 800px) {
    .height-conf {
      min-height: 25vh !important;
      max-height: 25vh !important;
    }
  }
</style>
