<template>
  <div class="campus-bar base">
    <template v-if="campi.length == 0">
      <div class="row q-py-md">
        <q-skeleton type="rect" class="col q-mx-md q-py-sm"/>
        <q-skeleton type="rect" class="col q-mx-md q-py-sm"/>
        <q-skeleton type="rect" class="col q-mx-md q-py-sm"/>
        <q-skeleton type="rect" class="col q-mx-md q-py-sm"/>
        <q-skeleton type="rect" class="col q-mx-md q-py-sm"/>
        <q-skeleton type="rect" class="col q-mx-md q-py-sm"/>
      </div>
    </template>

    <template v-else>
      <q-tabs
        v-model="activeTab"
        align="justify"
        class="row q-py-none q-mt-none disabledTab">
        <q-tab
          dense
          v-for="campus in campi" :key="campus.id"
          class="col-12 col-sm-3 q-mx-md tabs"
          :class="activeTab === campus.name ? 'q-tab--active': ''">
          {{ campus.name }}
        </q-tab>
      </q-tabs>

      <q-tab-panels
        v-model="activeTab"
        class="q-pt-none"
      >
        <q-tab-panel
          animated
          class="base q-py-md panel-wrapper disabledTab"
          v-for="campus in campi" :key="campus.id"
          :name="campus.name">
          <dash-panel
            v-if="currentCampus"
            :selectedCampus="currentCampus"
            @transductor-cycle-completed="changeTabJob"
          />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </div>
</template>

<script>
import DashPanel from './DashPanel'

export default {
  name: 'DashCampusTab',

  components: {
    DashPanel
  },

  data () {
    return {
      activeTab: '',
      campiName: [],
      currentCampus: undefined
    }
  },

  props: {
    campi: {
      type: Array,
      required: true
    }
  },

  mounted () {
    this.setNames()
    this.changeTabJob()
  },

  methods: {
    setNames () {
      this.campi.forEach(campus => {
        this.campiName.push(campus.name)
      })
    },

    changeTabJob () {
      if (this.activeTab === '') {
        this.activeTab = this.campi[0].name
        this.currentCampus = this.campi[0]
      } else {
        const a = this.campiName.indexOf(this.activeTab)
        this.activeTab = (a < this.campi.length - 1) ? this.campiName[a + 1] : this.campiName[0]
        this.currentCampus = (a < this.campi.length - 1) ? this.campi[a + 1] : this.campi[0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .tabs {
    border-radius: 0px 0px 5px 5px;
    border: transparent solid 1px;
  }

  .campus-bar {
    font-size: 1.45em;
    .q-tab--active {
      color: white !important;
      background-color: #00101f;
    }
  }

  .panel-wrapper {
    min-height: 50vh;
  }

  .disabledTab{
      pointer-events: none;
  }
</style>
