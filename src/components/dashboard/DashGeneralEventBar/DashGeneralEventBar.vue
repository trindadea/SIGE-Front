<template>
  <div class="base">
    <div class="row q-px-md q-col-gutter-md base">
      <div
        v-for="ev in eventTypes"
        :key="ev.name"
        class="col-12 col-sm-6 col-md-4 col-lg">
        <dash-event-card
          v-if="ev.eventsList !== undefined"
          :eventTile="ev.name"
          :cardTypeStyle="ev.activeClass"
          :campusEvents="ev.eventsList"
          :icon="ev.icon"/>
      </div>
    </div>
  </div>
</template>

<script>
import DashEventCard from '../../DashEventCard'

export default {
  name: 'DashGeneralEventBar',

  components: {
    DashEventCard
  },

  data() {
    return {
      eventTypes: [
        {
          name: 'Tensão Crítica',
          activeClass: 'card-active-critical',
          eventsList: this.otherEvents.critical_tension,
          icon: 1
        },
        {
          name: 'Queda de Fase',
          activeClass: 'card-active-critical',
          eventsList: this.otherEvents.phase_drop,
          icon: 2
        },
        {
          name: 'Tensão Precária',
          activeClass: 'card-active-warning',
          eventsList: this.otherEvents.precarious_tension,
          icon: 3
        },
        {
          name: 'Falha de Comunicação',
          activeClass: 'card-active-warning',
          eventsList: [...this.otherEvents.slave_connection_fail, ...this.otherEvents.transductor_connection_fail],
          icon: 4
        },
        {
          name: 'Máximo Consumo',
          activeClass: 'card-active-warning',
          eventsList: [],
          icon: 5
        }
      ]
    }
  },

  props: {
    otherEvents: Object
  }
}
</script>

<style>
@import "./styles.scss";
</style>
