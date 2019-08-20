<template>
  <div
    class="q-pa-md q-ma-md text-white rounded-borders"
    :class="'bg-' + color">
    <div class="row">
      <div class="col-4">
        <q-circular-progress
          show-value
          :value="percent"
          size="4rem"
          color="white"
          class="">
          <!-- {{ percent }}% -->
          {{ value }}/{{ maxValue }}
        </q-circular-progress>
      </div>
      <div class="col-8 vertical-middle text-h5 text-left">
        {{ title }} ativos
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'maxValue': Number,
    'value': Number,
    'title': String
  },

  computed: {
    percent () {
      return this.value * 100 / this.maxValue
    },
    color () {
      const colorChoices = {
        good: 'green-6',
        average: 'amber-7',
        bad: 'red-4'
      }

      if (this.percent <= 100 && this.percent > 80) {
        return colorChoices.good
      } else if (this.percent <= 80 && this.percent > 50) {
        return colorChoices.average
      }
      return colorChoices.bad
    }
  }
}
</script>

<style scoped>

</style>
