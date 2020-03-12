import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      openMap: false,
      chartOptions: {
        phase_a: [],
        phase_b: [],
        phase_c: [],
        unit: '',
        dimension: '',
        status: false
      }
    },
    mutations: {
      changeMapStatus (state) {
        state.openMap = !state.openMap
      },
      updateChartPhase (state, options) {
        state.chartOptions.phase_a = options.phase_a
        state.chartOptions.phase_b = options.phase_b
        state.chartOptions.phase_c = options.phase_c
        state.chartOptions.unit = options.unit
        state.chartOptions.dimension = options.dimension
        state.chartOptions.status = options.status
      }
    },
    getters: {
      openMap: state => state.openMap,
      chartOptions: state => state.chartOptions
    },

    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
