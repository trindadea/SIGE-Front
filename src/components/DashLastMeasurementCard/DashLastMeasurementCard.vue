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
          :keyNames="{A:'voltage_a',B:'voltage_b',C:'voltage_c'}"
          :tableData="realTimeMeasurements"
          :unit="'V'"
        />
        <measurements-table 
          :title="'Corrente'" 
          :keyNames="{A:'current_a',B:'current_b',C:'current_c'}"
          :tableData="realTimeMeasurements"
          :unit="'A'"
        />
        <measurements-table 
          :title="'Potência'" 
          :keyNames="{Ativa:'total_active_power',B:'total_reactive_power',C:'total_power_factor'}"
          :tableData="realTimeMeasurements"
          :unit="['W', 'kVAr', 'kVa']"
        />
        <tr class="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
          <span class="row">
            <th class="col-12 h4">
              Últimas 72h
            </th>
            <td class="col-12">
              {{ countCriticalEvents() }}
              <q-icon :style="{opacity: 0.5}" :name="'img:statics/ic_ocorrencia_critica_mono.svg'"/>
            </td>
            <td class="col-12">
              {{ countWarningEvents() }}
              <q-icon :style="{opacity: 0.5}" :name="'img:statics/ic_ocorrencia_precaria_mono.svg'"/>
            </td>
            <td class="col-12"></td>
          </span>
        </tr>
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

<style lang="scss" scoped>
  @import "./DashLastMeasurementCard.css";
</style>
