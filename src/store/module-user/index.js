import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

const state = {
  userToken: '',
  userID: '',
  username: '',
  useremail: '',
  page: '',
  userAuth: false
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
