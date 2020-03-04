<template>
  <div class="row">
    <div class="col-9">
      <div class="row">
        <measurements-box class="col-8" :id="id"/>
        <active-box class="col-3" :id="id"/>
      </div>
      <!-- graph -->
    </div>
    <occurences :id="id" class="col-3"/>
  </div>
</template>

<script>
import measurementsBox from '../components/transductor/measurementsBox'
import activeBox from '../components/transductor/activeBox'
import occurences from '../components/transductor/occurences'

export default {
  name: 'Transductor',
  components: {
    measurementsBox: measurementsBox,
    activeBox: activeBox,
    occurences: occurences
  },
  data () {
    return {
      id: this.$router.currentRoute.params.id
    }
  }
}
</script>

<style lang="scss" scopped>

</style>
