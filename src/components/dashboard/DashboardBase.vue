<template>
  <div class="odin">
    <div v-if="!requestsError">
      <!-- <dash-top-bar/> -->
      <dash-campus-tab :campi="campiList"/>
      <dash-general-event-bar/>

    </div>
    <div v-else>
      WTF
    </div>
  </div>
</template>

<script>
import HTTP from '../../services/masterApi/http-common'
// import DashTopBar from 'components/dashboard/DashTopBar'
import DashCampusTab from 'components/dashboard/DashCampusTab'
import DashGeneralEventBar from 'components/dashboard/DashGeneralEventBar'

export default {
  name: 'DashboardBase',
  components: {
    // DashTopBar,
    DashCampusTab,
    DashGeneralEventBar
  },

  data () {
    return {
      campiList: [1, 2, 3],
      eventsInProgress: [1, 2, 3],
      requestsError: false
    }
  },

  methods: {
    getAllCampi () {
      HTTP.get('campi/')
        .then((res) => {
          this.campiList = res.data
        })
        .catch(err => {
          console.log(err)
          this.requestsError = true
        })
        .then(() => {
          console.log(this.campiList)
        })
    },

    getEventsInProgress () {
      HTTP.get('occurences/')
        .then((res) => {
          this.eventsInProgress = res.data
        })
        .catch(err => {
          console.log(err)
          this.requestsError = true
        })
        .then(() => {
          console.log('getEventsInPro' + this.eventsInProgress)
        })
    },

    async getAPIInfo () {
      await this.getAllCampi()
      await this.getEventsInProgress()
    }
  },

  mounted () {
    this.getAPIInfo()
  },

  computed: {

  }
}
</script>

<style lang="scss" scoped>
  .odin {
    // background-color: #22222f;
  }
</style>
