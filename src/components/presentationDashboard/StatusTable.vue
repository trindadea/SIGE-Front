<template>
  <q-list
    :dark="allowDarkness"
    bordered
    separator
    class="t-rsp q-mt-lg">
    <q-item
      v-ripple
      v-for="d in data"
      :key="d.id"
      :to="`${d.serial_number}/detail`">

      <q-item-section>
        <q-item-label class="text-h4">
          {{ d.location }}
        </q-item-label>
        <q-item-label caption>
          <b>Nº série:</b> {{ d.serial_number }}
        </q-item-label>
      </q-item-section>

      <q-item-section class="side text-right">
        Status: <span :class="d.active ? 'text-positive' : 'text-negative'">{{ d.active ? 'Ativo' : 'Desativado'}}</span>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'StatusTable',

  data () {
    return {}
  },

  computed: {
    allowDarkness () {
      return this.dark || false
    }
  },

  props: {
    data: Array,
    dark: Boolean
  }

}
</script>

<style lang="scss">

  .t-rsp {
    font-size: 1.4rem;
  }

</style>
