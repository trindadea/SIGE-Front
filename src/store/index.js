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
      transductorFilter: {
        dimension: '',
        vision: '',
        startDate: '',
        endDate: ''
      },
      openMap: false
    },
    mutations: {
      changeTransductorFilter (state, filter) {
        state.transductorFilter = filter
      },
      changeMapStatus (state) {
        state.openMap = !state.openMap
      }
    },
    getters: {
      transductorFilter: state => state.transductorFilter,
      openMap: state => state.openMap
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
