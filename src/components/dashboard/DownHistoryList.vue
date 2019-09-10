<template>
  <q-list
    :dark="allowDarkness"
    bordered
    separator>
    <q-item
      v-ripple
      v-for="d in data"
      :key="d.id">

      <q-item-section>
        <q-item-label>
          <b>Nº série:</b> {{ d.serial_number }}
        </q-item-label>
        <q-item-label caption>
          <b>Localização:</b> {{ d.physical_location }}
        </q-item-label>
      </q-item-section>

      <q-item-section class="side text-right">
        <!-- <q-icon name=""></q-icon> -->
        Última queda: <span class="text-negative">{{ d.date }} 31/02/2012</span>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'DownHistoryList',

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

<style>

</style>
