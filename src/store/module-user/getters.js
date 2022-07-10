const authStatus = (state) => {
  return !!(state.userToken && state.userID)
}

const getUser = (state) => {
  console.log(state)
  const user = {
    name: state.username,
    email: state.useremail,
    is_superuser: state.is_superuser,
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
