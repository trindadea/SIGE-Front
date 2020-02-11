<template>
  <div
    class="campus-bar">
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
        active-color="primary"
        indicator-color="transparent"
        align="justify"
        class="row q-py-sm">
        <q-tab
          dense
          no-caps
          v-for="campus in campi" :key="campus.id"
          :name="campus.name"
          class="col-3 q-mx-sm iku text-capitalize">
          {{ campus.name }} ({{ campus.acronym }})
        </q-tab>
      </q-tabs>
      <q-tab-panels
        v-model="activeTab">

        <q-tab-panel
          animated
          class="q-px-"
          v-for="campus in campi" :key="campus.id"
          :name="campus.name">
          <div class="row">
            <dash-map class="col-7"/>
            <dash-campus-info class="col-5"/>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      {{ transductors }}
    </template>
  </div>
</template>

<script>
import DashMap from './DashMap'
import DashCampusInfo from './DashCampusInfo'

import HTTP from '../../services/masterApi/http-common'

export default {
  name: 'DashCampusTab',

  components: {
    DashMap,
    DashCampusInfo
  },

  data () {
    return {
      activeTab: '',
      transductors: []
    }
  },

  computed: {

  },

  props: {
    campi: {
      type: Array,
      default: () => { return [] }
    }
  },

  methods: {
    getTransductors () {
      HTTP
        .get('energy-transductors/')
        .then((res) => {
          this.transductors = res.data
        })
        .catch((err) => {
          console.err(err)
        })
    }
    // changeTabJob () {
    //   if (this.campi === []) {
    //     console.log(`if (this.campi === []) {`)
    //     this.activeTab = 'non'
    //   } else if ((this.activeTab === 'non' || this.activeTab === '') && this.campi !== []) {
    //     console.log(`} else if ((this.activeTab === 'non' || this.activeTab === '') && this.campi !== []) {`)
    //     this.activeTab = this.campi[0].name
    //   } else if (this.activeTab === this.campi[this.campi.length - 1]) {
    //     console.log(`} else if (this.activeTab === this.campi[this.campi.length - 1]) {`)
    //     this.activeTab = this.campi[0].name
    //   } else {
    //     console.log(`} else {`)
    //     const pos = this.campi.findIndex(campus => campus.name === this.activeTab)
    //     if (pos !== -1) {
    //       this.activeTab = this.campi[pos + 1]
    //     } else {
    //       console.error({
    //         msg: 'An error occurred',
    //         pos: pos,
    //         activeTab: this.activeTab,
    //         campi: this.campi
    //       })
    //     }
    //   }
    // }

  },

  created () {
    this.getTransductors()
  }

  // created () {
  //   let changeTab = this.$crontab.addJob({
  //     name: 'activeTab',
  //     interval: {
  //       minutes: '/1'
  //     },
  //     job: this.changeTabJob
  //   })
  //   console.log(changeTab)
  //   changeTab = this.campi[0]
  // }

}
</script>

<style lang="scss" scoped>

  .iku {
    border-radius: 5px;
    border: #000 solid 1px;
  }

  .campus-bar {
    // background-color: #22222f;
  }

</style>
