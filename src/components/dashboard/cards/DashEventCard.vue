<template>
  <div class="base">
    <q-card
      flat
      class="evt-card-size"
      :class="isActive ? activeClass : 'card-inactive'">

      <q-card-section
        class="text-center card-title q-px-none">
        <span v-if="isActive">
          <q-icon :name="`img:statics/icons/ic_ocorrencia_${icon}_badge.svg`"/>
        </span> {{name}}
      </q-card-section>

      <q-card-section
        class="text-center q-px-xs q-pt-none"
        v-if="isActive">

        <div v-if="eventsList.length < 9">
          <p v-for="ev in eventsList" :key="ev.id"
            class="q-my-xs">
            {{ formatText(ev) }}
          </p>
        </div>

        <div v-else>
          <p v-for="ev in eventsList.slice(0, 8)" :key="ev.id"
            class="q-my-none">
            {{ formatText(ev) }}
          </p>
          <p class="bottom q-mt-sm">
            E mais {{ eventsList.length - 9 }} outros...
          </p>
        </div>

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
</template>

<script>
export default {
  name: 'DashEventCard',

  data () {
    return {
      isActive: this.eventsList.length !== 0
    }
  },

  props: {
    name: String,
    activeClass: String,
    eventsList: Array,
    icon: String
  },

  methods: {
    formatText (eventObj) {
      if (eventObj.location === '') {
        return 'Sem localização'
      }

      const strBreakpoint = 100
      let splittedLocation = eventObj.location.length > strBreakpoint ? eventObj.location.slice(0, strBreakpoint) + '...' + eventObj.location.slice(-strBreakpoint) : eventObj.location
      let formattedStr = ''

      switch (this.name) {
        case 'Queda de Fase':
          formattedStr = `${splittedLocation[0].toUpperCase() + splittedLocation.slice(1)} (${eventObj.campus}) - ${Object.keys(eventObj.data)}`

          break

        case 'Falha de Comunicação':
          formattedStr = `${splittedLocation[0].toUpperCase() + splittedLocation.slice(1)} (${eventObj.campus.toUpperCase()})`
          break

        case 'Máximo Consumo':
          // Must be implemented when we can measure this
          break

        default:
          formattedStr = `${splittedLocation[0].toUpperCase() + splittedLocation.slice(1)} (${eventObj.campus}) - ${Object.keys(eventObj.data)}`

          break
      }

      return formattedStr
    },

    formatDrops (obj) {
      let drops = Object.keys(obj.data)
      return drops
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

  p {
    // font-size: 22px;
    font-size: 20px;
  }

  .card-title {
    font-size: 30px;
    // font-size: 32px;
    line-height: 40px;
    letter-spacing: .24px;
  }

</style>
