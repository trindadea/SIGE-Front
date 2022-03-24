
<template>
  <div class="base" id="DashEventCard">
    <q-card
      flat
      class="evt-card-size card-overflow"
      :class="isActive ? activeClass : 'card-inactive'">

      <q-card-section class="text-center card-title q-px-none">
        <span v-if="isActive">
          <q-icon :name="`${ICON_PATH}${icon}.svg`"/>
        </span> 
        <strong class="card-title">{{name}}</strong>
      </q-card-section>

      <q-card-section class="text-center q-px-xs q-pt-none" v-if="isActive">
        <p v-for="event in eventsList.slice(0, MAX_LOCATION_POSSIBLE)" :key="event.id" class="q-my-xs">
          {{ formatText(event) }}
        </p>
        <p v-if="eventsList.length > MAX_LOCATION_POSSIBLE" class="bottom q-mt-sm">
          <strong>
            E mais {{ eventsList.length - MAX_LOCATION_POSSIBLE }} outro(s)
          </strong>
        </p>
      </q-card-section>

      <q-card-section v-else class="absolute-center">
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
      isActive: this.eventsList.length !== 0,
      MAX_LOCATION_POSSIBLE: 8,
      ICON_PATH: "img:statics/ic_ocorrencia_"
    }
  },

  props: {
    name: String,
    activeClass: String,
    eventsList: Array,
    icon: Number
  },

  methods: {
    formatText (eventObj) {

      const {location, campus} = eventObj

      if (location === '') return 'Sem localização'

      const lineBreaker = 15
      const locationFormated = location.length > lineBreaker ? location.slice(0, lineBreaker) + '...' + location.slice(-lineBreaker) : location
     
      const finalLocationFormat = `${locationFormated[0].toUpperCase() + locationFormated.slice(1)} (${campus})`
      
      if(this.name !== "Falha de Comunicação") return finalLocationFormat + ` - ${this.concatVoltageTypes(eventObj)}`
      else return finalLocationFormat;
    },

    concatVoltageTypes (event) {
      const voltageKey = Object.keys(event.data);
      
      const voltageTypes = []
      
      if(voltageKey.includes('voltage_a')) voltageTypes.push('A')
      if(voltageKey.includes('voltage_b')) voltageTypes.push('B')
      if(voltageKey.includes('voltage_c')) voltageTypes.push('C')

      return voltageTypes
    }
  }

}
</script>

<style>
  @import './DashEventCard.css';
</style>
