const changePage = ({ commit }, page) => {
  commit('changePage', page)
}

const saveUserInfo = ({ commit }, loginInfo) => {
  commit('saveUserInfo', loginInfo)
}

const logout = ({ commit }) => {
  commit('logout')
}

export {
  changePage,
  saveUserInfo,
  logout
}
