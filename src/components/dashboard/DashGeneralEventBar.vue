<template>
  <div class="row q-px-md q-col-gutter-md base size">
    <div class="col">
      <q-card
        flat
        class="card-base"
        :class="events.critical_tension.length == 0 ? 'card-inactive' : 'card-active-critical'"
      >
        <q-card-section
          class="text-center card-title"
        >
          Tensão crítica
        </q-card-section>
        <q-card-section
          v-if="!events.critical_tension.length == 0"
        >

        </q-card-section>
        <q-card-section
          v-else
          class="absolute-center"
        >
          <h6
            class="text-center"
          >
            Nenhum ponto
          </h6>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card
        flat
        class="card-base"
        :class="events.phase_drop.length == 0 ? 'card-inactive' : 'card-active-critical'"
      >
        <q-card-section
          class="text-center card-title"
        >
          Queda de fase
        </q-card-section>
        <q-card-section
          v-if="!events.phase_drop.length == 0"
        >

        </q-card-section>
        <q-card-section
          v-else
          class="absolute-center"
        >
          <h6
            class="text-center"
          >
            Nenhum ponto
          </h6>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card
        flat
        class="card-base"
        :class="events.precarious_tension.length == 0 ? 'card-inactive' : 'card-active-warning'"
      >
        <q-card-section
          class="text-center card-title"
        >
          Tensão precária
        </q-card-section>
        <q-card-section
          v-if="!events.precarious_tension.length == 0"
        >

        </q-card-section>
        <q-card-section
          v-else
          class="absolute-center"
        >
          <h6
            class="text-center"
          >
            Nenhum ponto
          </h6>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card
        flat
        class="card-base"
        :class="comms_failed.length == 0 ? 'card-inactive' : 'card-active-warning'"
      >
        <q-card-section
          class="text-center card-title"
        >
          Falha de Comunicação
        </q-card-section>
        <q-card-section
          v-if="!comms_failed.length == 0"
        >

        </q-card-section>
        <q-card-section
          v-else
          class="absolute-center"
        >
          <h6
            class="text-center"
          >
            Nenhum ponto
          </h6>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card
        flat
        class="card-base"
        :class="events.length == 0 ? 'card-inactive' : 'card-active-warning'"
      >
        <q-card-section
          class="text-center card-title"
        >
          Máxima Demanda
        </q-card-section>
        <q-card-section
          v-if="!events.length == 0"
        >

        </q-card-section>
        <q-card-section
          v-else
          class="absolute-center"
        >
          <h6
            class="text-center"
          >
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

  props: {
    events: {
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
      return [...this.events.slave_connection_fail, ...this.events.transductor_connection_fail]
    }
  }

}
</script>

<style lang="scss" scoped>
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
