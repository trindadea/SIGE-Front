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
          <td class="col">A - {{ rtm.tension_a }}V</td>
          <td class="col">A - {{ rtm.current_a }}A</td>
          <td class="col">A - {{ rtm.active_power_a }}W</td>
          <td class="col">
            {{ 0 }} <q-icon :style="{opacity: 0.5}" :name="'img:statics/icons/ic_ocorrencia_critica_mono.svg'"/>
          </td>
        </tr>

        <tr class="row">
          <td class="col">B - {{ rtm.tension_b }}V</td>
          <td class="col">B - {{ rtm.current_b }}A</td>
          <td class="col">B - {{ rtm.active_power_b }}kVAr</td>
          <td class="col">
            {{ 0 }} <q-icon :style="{opacity: 0.5}" :name="'img:statics/icons/ic_ocorrencia_precaria_mono.svg'"/>
          </td>
        </tr>

        <tr class="row">
          <td class="col">C - {{ rtm.tension_c }}V</td>
          <td class="col">C - {{ rtm.current_c }}A</td>
          <td class="col">T - {{ rtm.active_power_c }}kVa</td>
          <td class="col"></td>
        </tr>
      </table>
    </q-card-section>

    <q-card-section v-if="transductor.name" class="q-pt-xs">
      <h6 class="text-center" style="color: rgba(255, 255, 255, 0.6)">
        Última medida não disponível
      </h6>
    </q-card-section>
  </q-card>
</template>

<script>
import HTTP from '../../../services/masterApi/http-common'

export default {
  name: 'DashLastMeasurementCard',

  data () {
    return {
      rtm: [],
      transductor_occurences: {}
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
      HTTP
        .get(`/realtime-measurements/?serial_number=${this.transductor.id}`)
        .then((res) => {
          this.rtm = res.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getTransductorsLast72h () {
      HTTP
        .get(`/occurences/?type=period&serial_number=${this.transductor.id}`)
        .then((res) => {
          this.transductor_occurences = res.data
        })
        .catch((err) => {
          console.error(err)
        })
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
