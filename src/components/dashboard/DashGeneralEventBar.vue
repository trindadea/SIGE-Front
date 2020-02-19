<template>
  <div class="row q-px-md q-col-gutter-md base size">
    <div class="col">
      <q-card
        flat
        class="card-base"
        :class="otherEvents.critical_tension.length == 0 ? 'card-inactive' : 'card-active-critical'">
        <q-card-section
          class="text-center card-title">
          <span>
            <q-icon name="img:statics/icons/ic_ocorrencia_critica_badge.svg"/>
          </span> Tensão crítica
        </q-card-section>
        <q-card-section
          v-if="!otherEvents.critical_tension.length == 0">

        </q-card-section>
        <q-card-section
          v-else
          class="absolute-center">
          <h6
            class="text-center">
            Nenhum ponto
          </h6>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card
        flat
        class="card-base"
        :class="otherEvents.phase_drop.length == 0 ? 'card-inactive' : 'card-active-critical'">
        <q-card-section
          class="text-center card-title">
          <span>
            <q-icon name="img:statics/icons/ic_ocorrencia_critica_badge.svg"/>
          </span> Queda de fase
        </q-card-section>
        <q-card-section
          v-if="!otherEvents.phase_drop.length == 0">

        </q-card-section>
        <q-card-section
          v-else
          class="absolute-center">
          <h6
            class="text-center">
            Nenhum ponto
          </h6>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card
        flat
        class="card-base"
        :class="otherEvents.precarious_tension.length == 0 ? 'card-inactive' : 'card-active-warning'">
        <q-card-section
          class="text-center card-title">
          <span>
            <q-icon name="img:statics/icons/ic_ocorrencia_precaria_badge.svg"/>
          </span> Tensão precária
        </q-card-section>
        <q-card-section
          v-if="!otherEvents.precarious_tension.length == 0">

        </q-card-section>
        <q-card-section
          v-else
          class="absolute-center">
          <h6 class="text-center">
            Nenhum ponto
          </h6>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card
        flat
        class="card-base"
        :class="comms_failed.length == 0 ? 'card-inactive' : 'card-active-warning'">
        <q-card-section
          class="text-center card-title">
          <span>
            <q-icon name="img:statics/icons/ic_ocorrencia_precaria_badge.svg"/>
          </span> Falha de Comunicação
        </q-card-section>
        <q-card-section
          v-if="!comms_failed.length == 0">

        </q-card-section>
        <q-card-section
          v-else
          class="absolute-center">
          <h6
            class="text-center">
            Nenhum ponto
          </h6>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card
        flat
        class="card-base"
        :class="otherEvents.length == 0 ? 'card-inactive' : 'card-active-warning'">
        <q-card-section
          class="text-center card-title">
          <span>
            <q-icon name="img:statics/icons/ic_ocorrencia_precaria_badge.svg"/>
          </span> Máxima Demanda
        </q-card-section>
        <q-card-section
          v-if="!otherEvents.length == 0">

        </q-card-section>
        <q-card-section
          v-else
          class="absolute-center">
          <h6
            class="text-center">
            Nenhum ponto
          </h6>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashGeneralEventBar',

  data () {
    return {
      eventTypes: [
        {
          name: '',
          activeClass: '',
          endpoint: ''
        }
      ]
    }
  },

  props: {
    otherEvents: {
      type: Object,
      default: () => {
        return {
          transductor_connection_fail: [],
          critical_tension: [],
          precarious_tension: [],
          phase_drop: [],
          slave_connection_fail: [],
          count: 0
        }
      }
    }
  },

  computed: {
    comms_failed () {
      return [
        ...this.otherEvents.slave_connection_fail,
        ...this.otherEvents.transductor_connection_fail
      ]
    }
  }

}
</script>

<style lang="scss">
  .card-inactive {
    background-color: #00080f;
    border: 2px solid #001324;
    color: rgba(255, 255, 255, 0.2);
  }

  .card-active-critical {
    background-color: #3d0202;
    color: white;
  }

  .card-active-warning {
    background-color: #4d3e00;
    color: white;
  }

  .size {
    // min-height: 34.8vh;
    // max-height: 34.8vh;
    min-height: 36.3vh;
    max-height: 36.3vh;

  }

</style>
