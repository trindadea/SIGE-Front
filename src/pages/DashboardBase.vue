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

      <dash-bottom-bar
        v-if="eventsInProgress"
        :alerts="alerts"/>
    </div>

    <div v-else class="text-center" id="conn-error">
      <h1><q-icon name="cloud_off"/></h1>
      <h2>Falha na conexão com o servidor central</h2>
      <q-btn outline label="Tentar novamente" @click="getAPIInfo()"/>
    </div>
  </div>
</template>

<script>
import MASTER from '../services/masterApi/http-common'

import DashBottomBar from 'components/dashboard/DashBottomBar'
import DashCampusTab from 'components/dashboard/DashCampusTab'
import DashGeneralEventBar from 'components/dashboard/DashGeneralEventBar'

export default {
  name: 'DashboardBase',
  components: {
    'dash-bottom-bar': DashBottomBar,
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
      MASTER.get('campi/')
        .then((res) => {
          this.campiList = res.data
        })
        .catch(err => {
          console.error(err)
          this.requestsError = true
        })
        .then(() => {
          // console.log(this.campiList)
        })
    },

    getEventsInProgress () {
      MASTER.get('occurences/')
        .then((res) => {
          this.eventsInProgress = res.data
        })
        .catch(err => {
          console.error(err)
          this.requestsError = true
        })
        .then(() => {
          // console.log('getEventsInPro' + this.eventsInProgress)
        })
    },

    async getAPIInfo () {
      await this.getAllCampi()
      await this.getEventsInProgress()
    }
  },

  created () {
    this.getAPIInfo()
    setInterval(this.getAPIInfo, 62000) // updates data aprox. every minute
  }
}
</script>

<style lang="scss">
  html {
    background-color: #00080f;
  }

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
    max-height: 100%;
  }

  .card-title {
    font-size: 24px;
  }

  #conn-error {
    margin-top: 30vh;
  }
</style>
