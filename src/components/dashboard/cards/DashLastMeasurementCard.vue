<template>
  <q-card
    flat
    class="card-bg">
    <q-btn v-for="transductor in transductors" :key="transductor.id">
      {{ transductor }}
    </q-btn>
  </q-card>
</template>

<script>
export default {
  name: 'DashLastMeasurementCard',

  data () {
    return {
      slide: 1
    }
  },

  props: {
    transductors: {
      default: () => {
        return [1, 2, 3, 4, 5]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
