<template>
  <div class="base">
    <div class="row q-px-md q-col-gutter-md base" v-if="commsFailed !== []">
      <div
        v-for="ev in eventTypes"
        :key="ev.id"
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
          eventsList: [
            {
              id: 1,
              location: 'somewhere in the distance',
              campus: '',
              transductor: '',
              data: '',
              start_time: '',
              end_time: ''
            },
            {
              id: 1,
              location: 'somewhere in the distance',
              campus: '',
              transductor: '',
              data: '',
              start_time: '',
              end_time: ''
            },
            {
              id: 1,
              location: 'somewhere in the distance',
              campus: '',
              transductor: '',
              data: '',
              start_time: '',
              end_time: ''
            }
          ],
          // eventsList: this.otherEvents.critical_tension,
          icon: 'critica'
        },
        {
          name: 'Queda de Fase',
          activeClass: 'card-active-critical',
          eventsList: [
            {
              id: 1,
              location: 'somewhere in the distance',
              campus: '',
              transductor: '',
              data: '',
              start_time: '',
              end_time: ''
            },
            {
              id: 1,
              location: 'somewhere in the distance',
              campus: '',
              transductor: '',
              data: '',
              start_time: '',
              end_time: ''
            },
            {
              id: 1,
              location: 'somewhere in the distance',
              campus: '',
              transductor: '',
              data: '',
              start_time: '',
              end_time: ''
            }
          ],
          // eventsList: this.otherEvents.phase_drop,
          icon: 'critica'
        },
        {
          name: 'Tensão Precária',
          activeClass: 'card-active-warning',
          eventsList: [
            {
              id: 1,
              location: 'somewhere in the distance',
              campus: '',
              transductor: '',
              data: '',
              start_time: '',
              end_time: ''
            },
            {
              id: 1,
              location: 'somewhere in the distance',
              campus: '',
              transductor: '',
              data: '',
              start_time: '',
              end_time: ''
            },
            {
              id: 1,
              location: 'somewhere in the distance',
              campus: '',
              transductor: '',
              data: '',
              start_time: '',
              end_time: ''
            }
          ],
          // eventsList: this.otherEvents.precarious_tension,
          icon: 'precaria'
        },
        {
          name: 'Falha de Comunicação',
          activeClass: 'card-active-warning',
          eventsList: [...this.otherEvents.slave_connection_fail, ...this.otherEvents.transductor_connection_fail],
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
