<template>
  <div class="row">
    <dash-map
      class="col-7"
      :transductors="transductors"
      :campus_id="selectedCampus"
    />
    <dash-campus-info
      class="col-5"
      :selected-transductor="selectedTransductor"
      :campus_id="selectedCampus"
    />
    {{ selectedTransductor }}
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
      selectedCampus: 0,
      selectedTransductor: {}
    }
  },

  methods: {
    getTransductors () {
      HTTP
        .get(`/energy-transductors?campi_id=${this.selectedCampus}`)
        .then((res) => {
          this.transductors = res.data
        })
        .catch((err) => { console.error(err) })
    },

    selectTransductor () {
      console.log(this.selectedTransductor)
      const currentItem = this.selectedTransductor
      if (this.selectedTransductor === {}) {
        this.selectedTransductor = this.transductors[0]
      } else {
        this.selectedTransductor = (this.transductors.indexOf(currentItem) < this.transductors.length - 1) ? this.transductors[this.transductors.indexOf(currentItem) + 1] : this.transductors[0]
      }
    },

    async getInfo () {
      await this.getTransductors()
      this.selectedTransductor = this.transductors[0]
    }
  },

  created () {
    this.getInfo()
    setInterval(this.selectTransductor, 200)
  }
}
</script>
