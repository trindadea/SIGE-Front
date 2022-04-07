<template>
  <q-card
    flat
    class="card-bg last-card-info">

    <q-inner-loading dark :showing="transductor.name === undefined">
      <q-spinner-ios size="50px" color="grey-4" thickness="7"/>
    </q-inner-loading>

    <q-card-section v-if="transductor.name" class="q-pt-xs q-pb-none text-center card-title">
      {{ transductor.name[0].toUpperCase() + transductor.name.slice(1) }}
    </q-card-section>

    <q-card-section v-if="realTimeMeasurements.length !== 0" class="q-pt-none q-pb-xs">
      <table class="readings row">
        <measurements-table 
          :title="'Tensão'" 
          :tableObject="{A:'voltage_a',B:'voltage_b',C:'voltage_c'}"
          :realTimeMesure="realTimeMeasurements"
          :unit="'V'"
        />
        <measurements-table 
          :title="'Corrente'" 
          :tableObject="{A:'current_a',B:'current_b',C:'current_c'}"
          :realTimeMesure="realTimeMeasurements"
          :unit="'A'"
        />
        <measurements-table 
          :title="'Potência'" 
          :tableObject="{Ativa:'total_active_power',Reativa:'total_reactive_power',Total:'total_power_factor'}"
          :realTimeMesure="realTimeMeasurements"
          :unit="['W', 'kVAr', 'kVa']"
        />
        <measurements-table 
          :title="'Últimas 72h'" 
          :tableObject="{A: this.countCriticalEvents(), B: this.countWarningEvents()}"
          :icons="[`${IMAGE_PATH}critica_mono.svg`, `${IMAGE_PATH}precaria_mono.svg`]"
        />
      </table>
    </q-card-section>

    <q-card-section v-if="transductor.name && realTimeMeasurements.length === 0" class="q-pt-xs">
      <h6 class="text-center" style="color: rgba(255, 255, 255, 0.6)">
        Última medida não disponível
      </h6>
    </q-card-section>
  </q-card>
</template>

<script>
import MeasurementsTable from './MeasurementsTable'

export default {
  components: { MeasurementsTable },
  name: 'DashLastMeasurementCard',

  props: {
    transductor: {
      type: Object
    },
    transductor_occurences: {
      type: Object
    },
    realTimeMeasurements: {
      type: Array
    },
    measurementsCallback: {
      type: Function
    }
  },

  data() {
    return {
      IMAGE_PATH: 'img:statics/ic_ocorrencia_',
    }
  },

  watch: {
    transductor: function () {
      this.measurementsCallback()
    }
  },

  mounted () {
    this.measurementsCallback()
  },

  methods: {
    countWarningEvents () {
      if (this.transductor_occurences.count) {
        const { slave_connection_fail, transductor_connection_fail } = this.transductor_occurences;
        return slave_connection_fail.length + transductor_connection_fail.length;
      }
      return 0
    },

    countCriticalEvents () {
      if (this.transductor_occurences.count) {
        const {critical_tension, phase_drop, precarious_tension} = this.transductor_occurences;
        return critical_tension.length + phase_drop.length + precarious_tension.length;
      }
      return 0
    },
  }
}
</script>

<style>
  @import "./DashLastMeasurementCard.css";
</style>
