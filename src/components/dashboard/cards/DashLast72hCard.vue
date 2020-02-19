<template>
<div class="row q-pb-md">
  <q-card
    flat
    class="col card-base card-bg"
  >
    <q-card-section
      class="q-py-xs card-title text-center"
    >
      Últimas 72h
    </q-card-section>
    <q-card-section
      class="row q-col-gutter-none q-pt-lg"
    >
      <div class="col text-center">
        <p class="counter q-mb-none">
          {{666}}
          <q-icon name="img:statics/icons/ic_ocorrencia_critica_color.svg"/>
        </p>
        <small class="text-center">Graves</small>
      </div>
      <div class="col text-center">
        <p class="counter q-mb-none">
          {{666}}
          <q-icon name="img:statics/icons/ic_ocorrencia_precaria_color.svg"/>
        </p>
        <small class="text-center">Leves</small>
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
  }
}
</script>

<style lang="scss" scoped>
  .counter {
    font-size: 42px;
    font-weight: bold;
    line-height: 3px;
  }

</style>
