<template>
  <div class="col">
    <q-card
      flat
      class="card-base"
      :class="otherEvents.precarious_tension.length == 0 ? 'card-inactive' : 'card-active-warning'">
      <q-card-section
        class="text-center card-title">
        <span>
          <q-icon name="img:statics/icons/ic_ocorrencia_precaria_badge.svg"/>
        </span> Tensão precária
      </q-card-section>
      <q-card-section
        v-if="!otherEvents.precarious_tension.length == 0">

      </q-card-section>
      <q-card-section
        v-else
        class="absolute-center">
        <h6 class="text-center">
          Nenhum ponto
        </h6>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'DashEventCard',

  props: {
    eventType: Object
  }
}
</script>

<style lang="scss" scoped>

</style>
