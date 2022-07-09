<template>
  <div class="q-ma-none q-py-none q-pr-none">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-12 col-lg-6">
        <dash-consumption-generation-card
          class="height-conf"
          :transductor="selectedTransductor"
        />
      </div>

      <div class="col-lg-6 q-pb-md alignCenterColumn">
        <q-card class="col card-base card-bg">
          <q-card-section
            v-if="last72hEvents"
            class="q-py-xs card-title text-center">
            Últimas 72h
          </q-card-section>
          <q-inner-loading dark :showing="last72hEvents === undefined" class="q-mb-none">
            <q-spinner-ios  color="grey-4" thickness="7"/>
          </q-inner-loading>
          <div class="alignCenterRow">
            <report-icon :reports="last72hEvents" critical :label="'Graves'"/>
            <report-icon :reports="last72hEvents" :label="'Leves'"/>
          </div>
        </q-card>
      </div>
    </div>

    <div>
      <dash-charge-bar-card
        class="q-mb-md height-conf"
        :transductor="selectedTransductor"
        :campus="currentCampus"
      />

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
import ReportIcon from '../ReportIcon'
import DashChargeBarCard from './cards/DashChargeBarCard'
import DashLastMeasurementCard from '../DashLastMeasurementCard'
import Occurence from '../../services/api/Occurence'
import RealTimeMeasurement from '../../services/api/RealTimeMeasurement'

export default {
  name: 'DashCampusInfo',

  components: {
    DashConsumptionGenerationCard,
    ReportIcon,
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
    getLast72hEvents (campus) {
      MASTER.get(`/occurences/?type=period&campus=${campus.id}`)
        .then((res) => {
          this.last72hEvents = res.data
          this.last72hEvents.campus_name = this.currentCampus.name
        })
        .catch((err) => {
          console.error(err)
        })
    },

    async measurementsFromTransductor () {
      this.realTimeMeasurements = await RealTimeMeasurement.getRealTimeMeasurements(this.selectedTransductor.id)
      this.transductor_occurences = await Occurence.getTransductorsLast72h(this.selectedTransductor.id)
    }
  }
}
</script>

<style lang="scss">
.height-conf {
  min-height: 17.5vh;
  max-height: 17.5vh;
}

.alignCenterRow {
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: row;
}

.alignCenterColumn {
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: column;
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
