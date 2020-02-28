<template>
  <div class="base" v-if="eventTypes!==[]">
    <div class="row q-px-md q-col-gutter-md base size" v-if="commsFailed !== []">
      <dash-event-card
        class="col"
        v-for="ev in eventTypes"
        :key="ev.id"
        :name="ev.name"
        :active-class="ev.activeClass"
        :eventsList="ev.eventsList"
        :icon="ev.icon"/>
    </div>
    {{eventTypes}}
    {{commsFailed}}
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
          eventsList: this.commsFailed,
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
    commsFailed () {
      let arr = []
      this.otherEvents.slave_connection_fail.forEach(element => {
        arr.push(element)
      })
      this.otherEvents.transductor_connection_fail.forEach(element => {
        arr.push(element)
      })
      return arr
      // return [
      //   ...this.otherEvents.slave_connection_fail,
      //   ...this.otherEvents.transductor_connection_fail
      // ]
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
