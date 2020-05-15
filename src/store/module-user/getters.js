const authStatus = (state) => {
  return !!(state.userToken && state.userID)
}

const getUser = (state) => {
  const user = {
    name: state.username,
    email: state.useremail,
    id: state.userID,
    token: state.userToken
  }
  return user
}

const getPage = (state) => {
  return state.currentPage
}

export {
  authStatus,
  getUser,
  getPage
}
