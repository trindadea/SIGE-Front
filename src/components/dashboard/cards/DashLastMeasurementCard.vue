<template>
  <q-card
    flat
    class="card-bg">

    <q-inner-loading dark :showing="transductor.name === undefined">
      <q-spinner-ios size="50px" color="grey-4" thickness="7"/>
    </q-inner-loading>

    <q-card-section v-if="transductor.name" class="q-pt-xs q-pb-none text-center card-title">
      {{ transductor.name[0].toUpperCase() + transductor.name.slice(1) }}
    </q-card-section>

    <q-card-section v-if="rtm.length !== 0" class="q-pt-none q-pb-xs">

      <table class="readings">
        <tr class="row">
          <th class="col h4">
            Tensão
          </th>
          <th class="col h4">
            Corrente
          </th>
          <th class="col h4">
            Potência
          </th>
          <th class="col h4">
            Últimas 72h
          </th>
        </tr>

        <tr class="row">
          <td class="col">A: {{ rtm.voltage_a.toFixed(0) }}V</td>
          <td class="col">A: {{ rtm.current_a.toFixed(0) }}A</td>
          <td class="col">Ativa: {{ rtm.total_active_power.toFixed(0) }}W</td>
          <td class="col">
            {{ countCriticalEvents() }} <q-icon :style="{opacity: 0.5}" :name="'img:statics/icons/ic_ocorrencia_critica_mono.svg'"/>
          </td>
        </tr>

        <tr class="row">
          <td class="col">B: {{ rtm.voltage_b.toFixed(0) }}V</td>
          <td class="col">B: {{ rtm.current_b.toFixed(0) }}A</td>
          <td class="col">Reativa: {{ rtm.total_reactive_power.toFixed(0) }}kVAr</td>
          <td class="col">
            {{ countWarningEvents() }} <q-icon :style="{opacity: 0.5}" :name="'img:statics/icons/ic_ocorrencia_precaria_mono.svg'"/>
          </td>
        </tr>

        <tr class="row">
          <td class="col">C: {{ rtm.voltage_c.toFixed(0) }}V</td>
          <td class="col">C: {{ rtm.current_c.toFixed(0) }}A</td>
          <td class="col">Total: {{ rtm.total_power_factor.toFixed(0) }}kVa</td>
          <td class="col"></td>
        </tr>
      </table>
    </q-card-section>

    <q-card-section v-if="transductor.name && rtm.length === 0" class="q-pt-xs">
      <h6 class="text-center" style="color: rgba(255, 255, 255, 0.6)">
        Última medida não disponível
      </h6>
    </q-card-section>
  </q-card>
</template>

<script>
import MASTER from '../../../services/masterApi/http-common'

export default {
  name: 'DashLastMeasurementCard',

  data () {
    return {
      rtm: [],
      transductor_occurences: {},
      errors: []
    }
  },

  props: {
    transductor: {
      // type: Object,
      required: true
    }
  },

  methods: {
    getLastMeasurement () {
      MASTER
        .get(`/realtime-measurements/?id=${this.transductor.id}`)
        .then((res) => {
          this.rtm = res.data[0]
        }).toFixed(0)
        .catch((err) => {
          this.errors.push(err)
          console.error(err)
        })
    },
    getTransductorsLast72h () {
      MASTER
        .get(`/occurences/?type=period&id=${this.transductor.id}`)
        .then((res) => {
          this.transductor_occurences = res.data
        })
        .catch((err) => {
          this.errors.push(err)
          console.error(err)
        })
    },

    countWarningEvents () {
      if (this.transductor_occurences.count !== undefined) {
        return this.transductor_occurences.slave_connection_fail.length + this.transductor_occurences.transductor_connection_fail.length
      }

      return 0
    },

    countCriticalEvents () {
      if (this.transductor_occurences.count !== undefined) {
        return this.transductor_occurences.critical_tension.length + this.transductor_occurences.phase_drop.length + this.transductor_occurences.precarious_tension.length
      }

      return 0
    },

    async getApiInfo () {
      await this.getLastMeasurement()
      await this.getTransductorsLast72h()
    }
  },

  mounted () {
    this.getApiInfo()
  },

  async beforeUpdate () {
    this.getApiInfo()
  }
}
</script>

<style lang="scss" scoped>
  .readings{
    width: 100%;
    text-align: center;
  }

  .h4 {
    font-weight: 600;
    color: #339cff;
    line-height: 36px;
    size: 24px;
    text-transform: uppercase;
  }

  td {
    font-size: 20px;
  }

</style>
