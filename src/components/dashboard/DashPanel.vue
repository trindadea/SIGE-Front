<template>
  <div class="dash-content">
  <!-- <div class="row" style="max-height: 55vh!important"> -->

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
      v-if="selectedTransductor !== {}"
      :selected-transductor="selectedTransductor"
      :current-campus="selectedCampus"/>

  </div>
</template>

<style lang="scss">
  .dash-content {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .dash-map {
    width: 50%;
  }

  .dash-campus {
    width: 50%;
  }

  @media screen and (max-width: 800px) {
    .dash-content {
      flex-direction: column-reverse;
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

  data () {
    return {
      transductors: [],
      occurences: [],
      unifilarDiagram: [],
      selectedTransductor: {},
      interval: undefined
    }
  },

  props: {
    selectedCampus: Object
  },

  methods: {
    getTransductors () {
      MASTER
        .get(`/energy-transductors/?campi_id=${this.selectedCampus.id}`)
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
          // in descending priority order
          this.occurences = [res.data.transductor_connection_fail, res.data.precarious_tension, res.data.phase_drop, res.data.critical_tension]
        })
        .catch((err) => {
          console.error(err)
        })
    },

    selectTransductor () {
      const currentItem = this.selectedTransductor

      if (this.selectedTransductor === {}) {
        this.selectedTransductor = this.transductors[0]
      } else {
        this.selectedTransductor = (this.transductors.indexOf(currentItem) < this.transductors.length - 1) ? this.transductors[this.transductors.indexOf(currentItem) + 1] : this.transductors[0]
      }
    },

    async getInfo () {
      await this.getTransductors()
      await this.getCampusOccurences()
      await this.getUnifilarDiagram()
    }
  },

  created () {
    this.getInfo()
  },

  mounted () {
    this.selectTransductor()
    this.interval = setInterval(this.selectTransductor, 10000)
    // setInterval(this.selectTransductor, 10000)
  },

  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
