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
      }
    },
    mutations: {
      changeTransductorFilter (state, filter) {
        console.log('changed ', filter)
        state.transductorFilter = filter
        console.log('state ', state.transductorFilter)
      }
    },
    getters: {
      transductorFilter: state => state.transductorFilter
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
