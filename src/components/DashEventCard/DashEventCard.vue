<template>
  <div class="base" id="DashEventCard">
    <q-card flat class="evt-card-size card-overflow" :class="IS_ACTIVE ? cardTypeStyle : 'card-inactive'">
      <q-card-section class="text-center card-title">
        <span v-if="IS_ACTIVE">
          <q-icon :name="`${ICON_PATH}${icon}.svg`" />
        </span>
        <strong class="card-title">{{ eventTile }}</strong>
      </q-card-section>
      <q-card-section class="text-center q-px-xs" v-if="IS_ACTIVE">
        <p v-for="event in campusEvents.slice(0, MAX_LOCATION_POSSIBLE)" :key="event.id" class="q-my-xs" id="DashEventCardCampus">
          {{ getCampusInformation(event) }}
        </p>
        <p v-if="campusEvents.length > MAX_LOCATION_POSSIBLE" class="bottom q-mt-sm">
          <strong> E mais {{ campusEvents.length - MAX_LOCATION_POSSIBLE }} outro(s) </strong>
        </p>
      </q-card-section>
      <q-card-section v-else class="absolute-center">
        <h6>Nenhum ponto</h6>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'DashEventCard',

  data() {
    return {
      IS_ACTIVE: this.campusEvents.length !== 0,
      MAX_LOCATION_POSSIBLE: 8,
      ICON_PATH: 'img:statics/ic_ocorrencia_',
      ACCEPTED_VOLTAGES: /^voltage_[aAbBcC]/,
      LOCATION_NAME_MAX_CHAR: 15
    }
  },

  props: {
    eventTile: String,
    cardTypeStyle: String,
    campusEvents: Array,
    icon: Number
  },

  methods: {
    getCampusInformation(campusInformation) {
      const voltagesType = this.concatVoltageTypes(campusInformation);
      let locationAndCampus = this.formatLocationName(campusInformation);

      if (voltagesType.length > 0) locationAndCampus += ` - ${voltagesType}`;
      return locationAndCampus;
    },

    formatLocationName(campusInformation) {
      const { location, campus } = campusInformation
      
      if (!location || location === '') return 'Sem localização';

      const _location =
        location.length > this.LOCATION_NAME_MAX_CHAR
          ? location.slice(0, this.LOCATION_NAME_MAX_CHAR) + '...'
          : location

      const _campus = campus ? ` (${campus})` : '';

      return `${_location[0].toUpperCase() + _location.slice(1)}${_campus}`
    },

    concatVoltageTypes(campusInformation) {
      const { data } = campusInformation
      const voltageTypes = []
      
      if(data) {
        Object.keys(data).forEach((voltageType) => {
          const lastChar = voltageType[voltageType.length - 1]
          if (voltageType.match(this.ACCEPTED_VOLTAGES)) voltageTypes.push(lastChar.toUpperCase())
        })
      }

      return voltageTypes
    }
  }
}
</script>

<style>
@import './DashEventCard.css';
</style>
