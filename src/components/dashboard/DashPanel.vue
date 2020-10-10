<template>
  <div class="row">
  <!-- <div class="row" style="max-height: 55vh!important"> -->

    <dash-map
      v-if="transductors !== []"
      class="col-7"
      :transductors="transductors"
      :occurences="occurences"
      :selected-transductor="selectedTransductor"
      :current-campus="selectedCampus"/>

    <dash-campus-info
      class="col-5"
      v-if="selectedTransductor !== {}"
      :selected-transductor="selectedTransductor"
      :current-campus="selectedCampus"/>

  </div>
</template>

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
