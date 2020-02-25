<template>
  <div class="row q-px-md q-col-gutter-md base size">
    <dash-event-card
      class="col"
      v-for="e in eventTypes"
      :key="e.id"
      :name="e.name"
      :activeClass="e.activeClass"
      :eventsList="e.eventsList"
      :icon="e.icon"/>
  </div>
</template>

<script>
import DashEventCard from './cards/DashEventCard'

export default {
  name: 'DashGeneralEventBar',

  components: {
    DashEventCard
  },

  data () {
    return {
      eventTypes: [
        {
          name: 'Tensão Crítica',
          activeClass: 'card-active-critical',
          eventsList: this.otherEvents.critical_tension,
          icon: 'critica'
        },
        {
          name: 'Queda de Fase',
          activeClass: 'card-active-critical',
          eventsList: this.otherEvents.phase_drop,
          icon: 'critica'
        },
        {
          name: 'Tensão Precária',
          activeClass: 'card-active-warning',
          eventsList: this.otherEvents.precarious_tension,
          icon: 'precaria'
        },
        {
          name: 'Falha de Comunicação',
          activeClass: 'card-active-warning',
          eventsList: this.comms_failed,
          icon: 'precaria'
        },
        {
          name: 'Máximo Consumo',
          activeClass: 'card-active-warning',
          eventsList: [],
          icon: 'precaria'
        }
      ]
    }
  },

  props: {
    otherEvents: Object
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

<style lang="scss" scoped>

  .size {
    // min-height: 34.8vh;
    // max-height: 34.8vh;
    min-height: 36.3vh;
    max-height: 36.3vh;

  }

</style>
