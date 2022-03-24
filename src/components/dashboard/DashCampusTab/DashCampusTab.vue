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
import DashPanel from '../DashPanel'

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
        const currentTabIndex = this.campiName.indexOf(this.activeTab)
        const nextTabIndex = (currentTabIndex + 1) % this.campiName.length
        this.activeTab = this.campiName[nextTabIndex]
        this.currentCampus = this.campi[nextTabIndex]
      }
    }
  }
}
</script>

<style lang="scss" scoped src='./styles.scss'/>
