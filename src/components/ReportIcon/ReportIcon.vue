<template>
  <q-card-section
    v-if="reports"
    >
    <div
      class="col text-center ReportIconAlignCenter"
      :class="countReports(reports) === 0 ? 'ReportIconInactive' : ''">
      <p class="ReportIconCounter q-mb-none" id="ReportIconEvents">
        {{ countReports(reports) }}
        <q-icon :name="selectIcon(reports)"/>
      </p>
      <small class="text-center q-mb-none">
        {{this.label}}
      </small>
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: 'ReportIcon',
  props: {
    reports: Object,
    label: String,
    critical: Boolean
  },
  methods: {
    countReports (occurrences) {
      if (this.critical) return (occurrences.critical_tension.length + occurrences.phase_drop.length) || 0
      return (occurrences.precarious_tension.length + occurrences.transductor_connection_fail.length + occurrences.slave_connection_fail.length) || 0
    },
    selectIcon (reports) {
      const path = 'img:/statics/ic_ocorrencia_'
      const iconName = this.critical ? 'critica' : 'precaria'
      return this.countReports(reports) > 0 ? `${path}${iconName}_color.svg` : `${path}${iconName}_mono.svg`
    }
  }
}
</script>

<style>
  @import './ReportIcon.css';
</style>
