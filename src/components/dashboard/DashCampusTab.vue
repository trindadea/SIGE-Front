<template>
  <div
    class="campus-bar">
    <template v-if="!campi.length == 0">
      <q-skeleton type="rect"/>
    </template>
    <template v-else>
      <q-tabs
          active-color="primary"
          indicator-color="transparent"
          align="justify"
          class="row q-py-sm">
        <q-tab
          dense
          no-caps
          v-for="campus in campi" :key="campus.id"
          class="col-3 q-mx-sm iku text-capitalize">
          <!-- <q-btn outline>{{ campus.name }}</q-btn> -->
          {{ campus.name }}
        </q-tab>
      </q-tabs>
      <!-- <div
        v-for="campus in campi" :key="campus.id"
        class="col q-py-sm">
        {{ campus.name }}
      </div> -->

    </template>
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
    campi: {
      type: Array,
      default: () => { return [] }
    }
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
