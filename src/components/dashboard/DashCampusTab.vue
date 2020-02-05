<template>
  <div
    class="campus-bar">
    <q-tabs
        active-color="primary"
        indicator-color="transparent"
        align="justify"
        class="row">
      <q-tab
        dense
        no-caps
        v-for="campus in campi" :key="campus.id"
        class="q-px-sm q-mx-sm">
        <!-- <q-btn outline>{{ campus.name }}</q-btn> -->
        {{ campus.name }}
      </q-tab>
    </q-tabs>
    <!-- <div
      v-for="campus in campi" :key="campus.id"
      class="col q-py-sm">
      {{ campus.name }}
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'DashCampusTab',

  data () {
    return {
      campuses: [
        { name: 'duidshuaifh' },
        { name: 'duidshuaifh' },
        { name: 'duidshuaifh' },
        { name: 'duidshuaifh' },
        { name: 'duidshuaifh' },
        { name: 'duidshuaifh' },
        { name: 'duidshuaifh' }
      ]
    }
  },

  props: {
    campi: Array
  }

}
</script>

<style lang="scss" scoped>

  .campus-bar {
    // background-color: #22222f;
  }

</style>
