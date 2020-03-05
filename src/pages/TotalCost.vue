<template>
  <div>
    <q-select v-model="model" :options="options" label="Campus" />
    <q-select v-model="model" :options="options" label="Filtro" />
    <q-btn-toggle
      v-model="model"
      push
      glossy
      toggle-color="primary"
      :options="[
          {label: 'One', value: 'one'},
          {label: 'Two', value: 'two'},
          {label: 'Three', value: 'three'}
        ]"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: null,
      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
    }
  }
}
</script>
