import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from 'quasar'
import VueCrontab from 'vue-crontab'

// import example from './module-example'

Vue.use(VueCrontab)
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
      },
      dashboard: {
        events: null,
        campi: null,
        active: {
          campus: null,
          transductor: null
        }
      }
    },

    mutations: {
      changePage (state, page) {
        state.page = page
      },
      setDashboardEvents (state, events) {
        state.dashboard.events = events
      },
      setDashboardCampi (state, campiList) {
        state.dashboard.campi = campiList
      },
      setDashboardActiveCampus (state, activeCampus) {
        state.dashboard.active.campus = activeCampus
      },
      setDashboardActiveTransductor (state, activeTransductor) {
        state.dashboard.active.transductor = activeTransductor
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
