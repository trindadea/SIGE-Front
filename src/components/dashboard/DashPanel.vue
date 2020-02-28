<template>
  <div class="row">

    <dash-map
      v-if="transductors !== []"
      class="col-7"
      :transductors="transductors"
      :current-campus="selectedCampus"
    />

    <dash-campus-info
      class="col-5"
      v-if="selectedTransductor !== {}"
      :selected-transductor="selectedTransductor"
      :current-campus="selectedCampus"
    />

  </div>
</template>

<script>
import DashMap from './DashMap'
import DashCampusInfo from './DashCampusInfo'
import HTTP from '../../services/masterApi/http-common'

export default {
  name: 'DashPanel',

  components: {
    DashMap,
    DashCampusInfo
  },

  data () {
    return {
      transductors: [],
      selectedTransductor: {}
    }
  },

  props: {
    selectedCampus: Object
  },

  methods: {
    getTransductors () {
      HTTP
        .get(`/energy-transductors/?campi_id=${this.selectedCampus.id}`)
        .then((res) => {
          this.transductors = res.data
          this.selectedTransductor = this.transductors[0]
        })
        .catch((err) => { console.error(err) })
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
    }
  },

  created () {
    this.getInfo()
  },

  mounted () {
    this.selectTransductor()
    setInterval(this.selectTransductor, 10000)
  }
}
</script>
