<template>
  <div class="row q-col-gutter-md">
    <div class="col">
      <q-card flat class="card-base card-bg">
        <q-card-section class="q-py-xs text-center card-title">
          Consumo
        </q-card-section>
        <q-card-section>
          <triangular-consumption-chart/>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card flat class="card-base card-bg">
        <q-card-section class="q-py-xs text-center card-title">
          Geração mês
        </q-card-section>

        <q-card-section class="q-mt-sm q-pb-none">
          <p class="custom-h2 text-center">{{ generated }} kW</p>
          <div class="vertical-middle text-center q-pb-none">
            <small>{{ transductor.name }}</small>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import TriangularConsumptionChart from '../../charts/TriangularConsumptionChart'

export default {
  components: {
    TriangularConsumptionChart
  },

  props: {
    transductor: {
      type: Object,
      // required: true
      default: () => {
        return {}
      }
    }
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
