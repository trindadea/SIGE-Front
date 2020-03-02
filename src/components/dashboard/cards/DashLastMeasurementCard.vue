<template>
  <q-card
    flat
    class="card-bg">
    <q-card-section class="q-pt-xs q-pb-none text-center card-title">
      {{ transductor.name[0].toUpperCase() + transductor.name.slice(1) }}
    </q-card-section>

    <q-card-section class="q-py-xs">
      <table class="readings">
        <tr class="row">
          <th class="col h4">
            Tensão
          </th>
          <th class="col h4">
            Corrente
          </th>
          <th class="col h4">
            Potência
          </th>
          <th class="col h4">
            Últimas 72h
          </th>
        </tr>
        <tr class="row">
          <td class="col">A - {{ 123 }}V</td>
          <td class="col">A - {{ 123 }}A</td>
          <td class="col">A - {{ 123 }}W</td>
          <td class="col">
            {{ 0 }} <q-icon :style="{opacity: 0.5}" :name="'img:statics/icons/ic_ocorrencia_critica_mono.svg'"/>
          </td>
        </tr>
        <tr class="row">
          <td class="col">B - {{ 123 }}V</td>
          <td class="col">B - {{ 123 }}A</td>
          <td class="col">R - {{ 123 }}kVAr</td>
          <td class="col">
            {{ 0 }} <q-icon :style="{opacity: 0.5}" :name="'img:statics/icons/ic_ocorrencia_precaria_mono.svg'"/>
          </td>

        </tr>
        <tr class="row">
          <td class="col">C - {{ 123 }}V</td>
          <td class="col">C - {{ 123 }}A</td>
          <td class="col">T - {{ 123 }}kVa</td>
          <td class="col"></td>
        </tr>
      </table>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'DashLastMeasurementCard',

  data () {
    return {

    }
  },

  props: {
    transductor: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .readings{
    width: 100%;
    text-align: center;
  }

  .h4 {
    font-weight: 600;
    color: #339cff;
    line-height: 36px;
    size: 24px;
    text-transform: uppercase;
  }

  .title {

  }

  td {
    font-size: 20px;
  }

</style>
