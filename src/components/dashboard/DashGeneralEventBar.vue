<template>
  <div class="base">
    <div class="row q-px-md q-col-gutter-md base">
      <div
        v-for="ev in eventTypes"
        :key="ev.name"
        class="col">
        <dash-event-card
          v-if="ev.eventsList !== undefined"
          :name="ev.name"
          :active-class="ev.activeClass"
          :eventsList="ev.eventsList"
          :icon="ev.icon"/>
      </div>
    </div>
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
          // eventsList: [
          //   {
          //     id: 1,
          //     location: 'somewhere in the distance',
          //     campus: '',
          //     transductor: '',
          //     data: '',
          //     start_time: '',
          //     end_time: ''
          //   },
          // ],
          eventsList: this.otherEvents.critical_tension,
          icon: 1
        },
        {
          name: 'Queda de Fase',
          activeClass: 'card-active-critical',
          // eventsList: [
          //   {
          //     id: 1,
          //     location: 'somewhere in the distance',
          //     campus: '',
          //     transductor: '',
          //     data: '',
          //     start_time: '',
          //     end_time: ''
          //   },
          // ],
          eventsList: this.otherEvents.phase_drop,
          icon: 2
        },
        {
          name: 'Tensão Precária',
          activeClass: 'card-active-warning',
          // eventsList: [
          //   {
          //     id: 1567,
          //     location: 'somewhere in the distance',
          //     campus: '',
          //     transductor: '',
          //     data: '',
          //     start_time: '',
          //     end_time: ''
          //   },
          // ],
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

<style lang="scss">

  .evt-card-size {
    // min-height: 34.8vh;
    // max-height: 34.8vh;
    // min-height: 36.3vh;
    // max-height: 36.3vh;
    min-height: 34.8vh;
    max-height: 34.8vh;

  }

</style>
