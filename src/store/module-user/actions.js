const saveUserInfo = ({ commit }, loginInfo) => {
  commit('saveUserInfo', loginInfo)
}

const logout = ({ commit }) => {
  commit('logout')
}

const changePage = ({ commit }, page) => {
  commit('changePage', page)
}
export {
  saveUserInfo,
  logout,
  changePage
}
