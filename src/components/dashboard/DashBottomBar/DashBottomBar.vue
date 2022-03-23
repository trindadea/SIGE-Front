<template>
  <q-bar class="dash-bottom-bar-container">
      <img src="statics/logo_smi.svg" style="height: 28px;"/>
    <div
      id="alerts"
      >
      {{ alerts }} ocorrências em andamento
    </div>
    <div
      id="datetime"
      >
      {{ date }}
    </div>
  </q-bar>
</template>

<script>
export default {
  name: 'DashBottomBar',

  data () {
    return {
    }
  },

  props: {
    alerts: {
      type: Number,
      required: true
    }
  },

  computed: {
    date () {
      const currentDate = new Date()
      return currentDate.toLocaleDateString('pt-BR')
    }
  }

}
</script>

<style lang="scss" scoped src='./styles.scss'/>
