<template>
<div class="row q-pb-md">
  <q-card
    flat
    class="col card-base card-bg">
    <q-inner-loading dark :showing="last72hEvents === undefined">
      <q-spinner-ios size="50px" color="grey-4" thickness="7"/>
    </q-inner-loading>

    <q-card-section
      v-if="last72hEvents"
      class="q-py-xs card-title text-center">
      Últimas 72h
    </q-card-section>

    <q-card-section
      v-if="last72hEvents"
      class="row q-col-gutter-none q-pt-lg">
      <div
        class="col text-center"
        :class="this.last72hEvents.critical_events_count === 0 ? 'inactive' : ''">
        <p class="counter q-mb-none">
          {{ this.last72hEvents.critical_events_count }}
          <q-icon :name="this.last72hEvents.critical_events_count > 0 ? 'img:statics/icons/ic_ocorrencia_critica_color.svg' : 'img:statics/icons/ic_ocorrencia_critica_mono.svg'"/>
        </p>
        <small class="text-center">
          Graves
        </small>
      </div>
      <div
        class="col text-center"
        :class="this.last72hEvents.light_events_count === 0 ? 'inactive' : ''">
        <p class="counter q-mb-none">
          {{ this.last72hEvents.light_events_count }}
          <q-icon :name="this.last72hEvents.light_events_count > 0 ? 'img:statics/icons/ic_ocorrencia_precaria_color.svg' : 'img:statics/icons/ic_ocorrencia_precaria_mono.svg'"/>
        </p>
        <small class="text-center">
          Leves
        </small>
      </div>
    </q-card-section>

  </q-card>
</div>
</template>

<script>
export default {
  name: 'Dash72hCard',

  data () {
    return {
    }
  },

  props: {
    // vuex pras coisas? to acessando de todo lado + tem q fazer o dataset se atualizar
    last72hEvents: Object
  }
}
</script>

<style lang="scss" scoped>
  .counter {
    font-size: 42px;
    font-weight: bold;
    line-height: 3px;
  }

  .inactive {
    opacity: .6;
  }

</style>
