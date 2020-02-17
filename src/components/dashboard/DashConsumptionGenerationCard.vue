<template>
  <div class="row q-col-gutter-md">
    <div class="col">
      <q-card
        flat
        class="card-base card-bg"
      >
        <q-card-section
          class="q-py-xs text-center card-title"
        >
          Consumo
        </q-card-section>
        <q-card-section>
          <dash-consumption-status-chart/>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card
        flat
        class="card-base card-bg"
      >
        <q-card-section
          class="q-py-xs text-center card-title"
        >
          Geração mês
        </q-card-section>

        <q-card-section>
          <p class="custom-h2 text-center">
            {{ generated || 'XXX'}} kW
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import DashConsumptionStatusChart from './DashConsumptionStatusChart'

export default {
  components: {
    DashConsumptionStatusChart
  }
}
</script>

<style lang="scss">
  .custom-h2 {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: 0.24px;
  }
</style>
