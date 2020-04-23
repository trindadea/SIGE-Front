import Vue from 'vue'
import Vuex from 'vuex'
import { getDateNowSelectFormat } from '../utils/transductorStatus'
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
        console.log('authSTATUS')
        let userToken = LocalStorage.getItem('userToken')
        if (userToken == null) userToken = ''
        let userID = LocalStorage.getItem('userID')
        if (userID == null) userID = ''
        return !!(userToken && userID)
      },
      openMap: false,
      chartOptions: {
        phase_a: [],
        phase_b: [],
        phase_c: [],
        unit: '',
        dimension: '',
        status: false,
        graphType: ''
      },
      filterOptions: {
        dimension: 'Tensão',
        vision: '',
        startDate: getDateNowSelectFormat(1),
        endDate: getDateNowSelectFormat()
      }
    },
    mutations: {
      changePage (state, page) {
        state.page = page
      },
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
        state.chartOptions.graphType = options.graphType
      },
      updateFilter (state, filter) {
        state.filterOptions.dimension = filter.dimension
        state.filterOptions.vision = filter.vision
        state.filterOptions.startDate = filter.startDate
        state.filterOptions.endDate = filter.endDate
      }
    },
    getters: {
      openMap: state => state.openMap,
      chartOptions: state => state.chartOptions,
      filterOptions: state => state.filterOptions,
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
