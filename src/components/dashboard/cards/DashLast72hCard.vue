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
        :class="countCriticalEvents(last72hEvents) === 0 ? 'inactive' : ''">
        <p class="counter q-mb-none">
          {{ countCriticalEvents(last72hEvents) }}
          <q-icon :name="countCriticalEvents(last72hEvents) > 0 ? 'img:statics/icons/ic_ocorrencia_critica_color.svg' : 'img:statics/icons/ic_ocorrencia_critica_mono.svg'"/>
        </p>
        <small class="text-center">
          Graves
        </small>
      </div>
      <div
        class="col text-center"
        :class="countWarningEvents(last72hEvents) === 0 ? 'inactive' : ''">
        <p class="counter q-mb-none">
          {{ countWarningEvents(last72hEvents) }}
          <q-icon :name="countWarningEvents(last72hEvents) > 0 ? 'img:statics/icons/ic_ocorrencia_precaria_color.svg' : 'img:statics/icons/ic_ocorrencia_precaria_mono.svg'"/>
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
  },

  methods: {
    countWarningEvents (occurrences) {
      return occurrences.precarious_tension.length + occurrences.transductor_connection_fail.length + occurrences.slave_connection_fail.length || 0
    },

    countCriticalEvents (occurrences) {
      return occurrences.critical_tension.length + occurrences.phase_drop.length || 0
    }
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
