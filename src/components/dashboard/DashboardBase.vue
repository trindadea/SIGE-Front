<template>
  <div class="base" id="base">
    <div v-if="!requestsError">
      <dash-campus-tab
        v-if="campiList"
        :campi="campiList"/>

      <dash-general-event-bar
        v-if="eventsInProgress"
        class="q-pb-sm"
        :other-events="eventsInProgress"/>

      <dash-bottom-bar v-if="eventsInProgress" :alerts="alerts"/>
    </div>
    <div v-else>
      CHECK YOUR API
    </div>
  </div>
</template>

<script>
import HTTP from '../../services/masterApi/http-common'

import DashTopBar from 'components/dashboard/DashTopBar'
import DashCampusTab from 'components/dashboard/DashCampusTab'
import DashGeneralEventBar from 'components/dashboard/DashGeneralEventBar'

export default {
  name: 'DashboardBase',
  components: {
    'dash-bottom-bar': DashTopBar,
    DashCampusTab,
    DashGeneralEventBar
  },

  data () {
    return {
      campiList: undefined,
      eventsInProgress: undefined,
      requestsError: false
    }
  },

  computed: {
    alerts () {
      return this.eventsInProgress.count || 0
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

  created () {
    this.getAPIInfo()
  }
}
</script>

<style lang="scss">
  .base {
    background-color: #00080f;
    color: rgba($color: white, $alpha: .6);
    .active {
      color: white;
    }
  }

  #base {
    min-height: 100vh;
    max-height: 100vh;
  }

  .card-bg {
    background-color: #00101f;
    color: white;
  }

  .card-base {
    min-height: 100%;
  }

  .card-title {
    font-size: 24px;
  }
</style>
