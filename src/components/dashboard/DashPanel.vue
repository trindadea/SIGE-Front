<template>
  <div class="row">
    <dash-map
      class="col-7"
      :transductors="transductors"
      :campus_id="selectedCampus"
    />
    <dash-campus-info
      class="col-5"
      :transductors="transductors"
      :campus_id="selectedCampus"
    />
  </div>
</template>

<script>
import DashMap from './DashMap'
import DashCampusInfo from './DashCampusInfo'

export default {
  name: 'DashPanel',

  components: {
    DashMap,
    DashCampusInfo
  },

  data () {
    return {}
  },

  props: {
    selectedCampus: {
      type: Number,
      required: true
    },
    transductors: {
      type: Array,
      required: true
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
