<template>
  <div class="dash-content">
    <dash-map
      v-if="transductors !== []"
      class="dash-map"
      :transductors="transductors"
      :occurences="occurences"
      :unifilarDiagram="unifilarDiagram"
      :selected-transductor="selectedTransductor"
      :current-campus="selectedCampus"/>

    <dash-campus-info
      class="dash-campus"
      v-if="selectedTransductor"
      :selected-transductor="selectedTransductor"
      :current-campus="selectedCampus"
      :transductorCycleProgress="transductorCycleProgress"/>

  </div>
</template>

<style lang="scss">
  .dash-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 53.9vh;
  }

  .dash-map {
    width: 70%;
  }

  .dash-campus {
    width: 50%;
  }

  @media screen and (max-width: 800px) {
    .dash-content {
      flex-direction: column;
    }

    .dash-map {
      width: 100%;
    }

    .dash-campus {
      width: 100%;
      padding-right: 0 !important;
    }

    .q-pr-md .q-ma-none  {
      padding-right: 0 !important;
    }
  }
</style>

<script>
import DashMap from './DashMap'
import DashCampusInfo from './DashCampusInfo'
import MASTER from '../../services/masterApi/http-common'

export default {
  name: 'DashPanel',

  components: {
    DashMap,
    DashCampusInfo
  },

  props: {
    selectedCampus: Object
  },

  data () {
    return {
      cycleTime: 5000,
      transductorCycleProgress: 0,
      transductors: [],
      occurences: [],
      unifilarDiagram: [],
      selectedTransductor: undefined,
      interval: undefined
    }
  },

  created () {
    this.getInfo()
  },

  mounted () {
    this.selectTransductor()
    this.interval = setInterval(this.selectTransductor, this.cycleTime)
  },

  methods: {
    getTransductors () {
      MASTER
        .get(`/energy-transductors/?campus_id=${this.selectedCampus.id}`)
        .then((res) => {
          this.transductors = res.data
          this.selectedTransductor = this.transductors[0]
        })
        .catch((err) => { console.error(err) })
    },

    getUnifilarDiagram () {
      MASTER
        .get(`/lines/?campus=${this.selectedCampus.id}`)
        .then((res) => {
          this.unifilarDiagram = res.data
        })
        .catch((err) => { console.error(err) })
    },

    getCampusOccurences () {
      MASTER
        .get(`/occurences/?type=active&campi_id=${this.selectedCampus.id}`)
        .then((res) => {
          this.occurences = [res.data.transductor_connection_fail, res.data.precarious_tension, res.data.phase_drop, res.data.critical_tension]
        })
        .catch((err) => {
          console.error(err)
        })
    },

    selectTransductor () {
      const currentItem = this.selectedTransductor
      const listSize = this.transductors.length
      let index = 0

      if (!currentItem || currentItem === {}) {
        this.selectedTransductor = this.transductors[index]
      } else {
        index = this.transductors.indexOf(currentItem)

        if (index < listSize - 1) {
          index = index + 1
          this.selectedTransductor = this.transductors[index]
        } else {
          this.selectedTransductor = this.transductors[0]
          this.$emit('transductor-cycle-completed')
        }
      }
      this.transductorCycleProgress = index ? index / (listSize - 1) : 0
    },

    async getInfo () {
      await this.getTransductors()
      await this.getCampusOccurences()
      await this.getUnifilarDiagram()
    }
  },

  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
