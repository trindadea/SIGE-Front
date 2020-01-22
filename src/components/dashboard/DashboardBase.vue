<template>
  <div class="odin">
    <dash-top-bar/>
    <dash-campus-bar/>
    <dash-general-event-bar/>
  </div>
</template>

<script>
import DashTopBar from 'components/dashboard/DashTopBar'
import DashCampusBar from 'components/dashboard/DashCampusBar'
import DashGeneralEventBar from 'components/dashboard/DashGeneralEventBar'

export default {
  name: 'DashboardBase',
  components: {
    DashTopBar,
    DashCampusBar,
    DashGeneralEventBar
  },

  data () {
    return {}
  },

  methods: {

  },

  computed: {

  }
}
</script>

<style lang="scss" scoped>
  .odin {
    background-color: #22222f;
  }
</style>
