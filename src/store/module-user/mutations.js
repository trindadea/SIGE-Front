const saveUserInfo = (state, loginInfo) => {
  if (loginInfo.userToken) {
    state.userToken = loginInfo.userToken
  }
  if (loginInfo.userID) {
    state.userID = loginInfo.userID
  }
  if (loginInfo.username) {
    state.username = loginInfo.username
  }
  if (loginInfo.useremail) {
    state.useremail = loginInfo.useremail
  }
}

const logout = (state) => {
  state.userToken = ''
  state.userID = ''
  state.username = ''
  state.useremail = ''
  state.page = ''
  state.userAuth = false
}

const changePage = (state, page) => {
  state.currentPage = page
}

export {
  saveUserInfo,
  logout,
  changePage
}
