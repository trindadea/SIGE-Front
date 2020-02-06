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
          dense
          v-for="campus in campi" :key="campus.id"
          :name="campus.name">
          {{ campus }}
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DashCampusTab',

  data () {
    return {
      activeTab: ''
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
    autoChangeTabs () {}
  }

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
