<template>
  <div class="row q-col-gutter-md">

    <div class="col">
      <q-card flat class="card-base card-bg">
        <q-card-section class="q-pt-xs q-pb-none text-center card-title">
          Consumo
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-xs q-px-sm text-center">
            <triangular-consumption-chart class="fit q-pt-none q-pb-xs"/>
            <!-- TODO: esse componente deve ser revisado -->
            <small class="overflow-hidden">
              acima do cont.- {{aboveSince}}min
            </small>
        </q-card-section>
      </q-card>
    </div>

    <div class="col">
      <q-card flat class="card-base card-bg">
        <q-card-section class="q-py-xs text-center card-title">
          Geração mês
        </q-card-section>

        <q-card-section class="q-mt-sm q-pb-none" style="height:100%; margin-bottom: auto;">
          <p class="custom-h2 text-center absolute-middle">
            {{ generated }} kW
          </p>

          <div class="vertical-bottom text-center q-pb-xs q-mt-lg">
            <small>{{ formatText(transductor) }}</small>
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

  data () {
    return {
      generated: 0
    }
  },

  props: {
    transductor: Object
  },

  computed: {
    aboveSince () {
      return 1
    }
  },

  methods: {
    formatText (transductorObj) {
      if (transductorObj.name === '') {
        return 'Sem nome'
      }
      const strBreakpoint = 25
      // return transductorObj.name.length > strBreakpoint ? transductorObj.name.slice(0, strBreakpoint) + '...' + transductorObj.name.slice(-(strBreakpoint)) : transductorObj.name
      return transductorObj.name.length > strBreakpoint ? transductorObj.name.slice(0, strBreakpoint) + '...' : transductorObj.name
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
