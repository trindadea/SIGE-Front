import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from 'quasar'
import VueCrontab from 'vue-crontab'

// import example from './module-example'

import totalCostStore from './module-totalCost'
Vue.use(VueCrontab)

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      totalCostStore
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
    getters: {
      authStatus (state) {
        let userToken = LocalStorage.getItem('userToken')
        if (userToken == null) userToken = ''
        let userID = LocalStorage.getItem('userID')
        if (userID == null) userID = ''
        return !!(userToken && userID)
      },
      user (state) {
        let user = {
          name: LocalStorage.getItem('username'),
          email: LocalStorage.getItem('useremail')
        }
        return user
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
