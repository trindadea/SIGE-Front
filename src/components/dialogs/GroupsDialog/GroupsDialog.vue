<template>
  <q-dialog
    :value="dialog"
    persistent
    id="groups-dialog"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="text-white">
      <q-bar class="bg-primary">
        <h5 class="title">
          {{ group.id ? 'Editar grupo' : 'Novo grupo' }}
        </h5>
        <q-space />
        <q-btn dense flat icon="close" @click="close">
          <q-tooltip content-class="bg-white text-primary">Fechar</q-tooltip>
        </q-btn>
      </q-bar>
      <div class="info">
        <q-form @submit="handleGroup">
          <div class="inputDiv">
            <q-input
              label="Nome do grupo"
              class="inputField"
              outlined
              v-model="name"
            />
          </div>
          <div class="inputDiv">
            <label>Tipo do Grupo: </label>
            <q-select
              class="inputField"
              outlined
              v-model="type"
              label="Tipo do Grupo"
              :options="types"
              option-value="url"
              option-label="name"
              emit-value
              map-options
            />
          </div>
          <div class="btn">
            <q-btn
              size="1rem"
              :label="group.id ? 'Editar' : 'Salvar'"
              type="submit"
              color="primary"
            />
            <q-space />
            <q-btn size="1rem" label="Fechar" @click="close" color="primary" />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: false
    },
    types: {
      type: Array,
      required: true
    },
    group: {
      type: Object,
      required: false,
      default: () => ({
        id: '',
        name: '',
        type: '',
        url: ''
      })
    }
  },
  data () {
    return {
      name: '',
      type: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    handleGroup () {
      if (this.group.id) {
        this.$emit('updateGroup', {
          ...this.group,
          type: this.type,
          name: this.name
        })
      } else {
        this.$emit('createGroup', {
          ...this.group,
          type: this.type,
          name: this.name
        })
      }
    }
  },
  watch: {
    'group.name': function (val) {
      this.name = val
      this.type = this.group.type
    }
  }
}
</script>

<style>
  @import './style.scss';
</style>
