import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from 'quasar'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    state: {
      page: '',
      userAuth: false,
      authStatus: () => {
        let userToken = LocalStorage.getItem('userToken')
        if (userToken == null) userToken = ''
        let userID = LocalStorage.getItem('userID')
        if (userID == null) userID = ''
        return !!(userToken && userID)
      }
    },
    mutations: {
      changePage (state, page) {
        state.page = page
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
