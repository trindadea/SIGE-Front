<template>
  <q-layout view="hHh Lpr fFf">
    <h1>aaa {{ endpoint }}</h1>
    <div class="row">
      <q-form class="col-auto">
        <div v-for="field in fields" :key="field.id">
          <p>{{field.content}}</p>
          <input v-model="field.content" :type="field.type" :id="field.name">
        </div>
      </q-form>
    </div>
  </q-layout>
</template>

<script>
export default {
  props: ['fields', 'endpoint', 'type'],

  data () {
    return {

    }
  },

  methods: {

  },

  created () {
    this.fields = [
      { name: 'asdf', type: 'text', content: '' },
      { name: 'asdf2', type: 'text', content: '' },
      { name: 'asdf3', type: 'text', content: '' },
      { name: 'asdf4', type: 'text', content: '' }
    ]
  }
}
</script>

<style>
</style>
