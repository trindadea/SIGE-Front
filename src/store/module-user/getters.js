const authStatus = (state) => {
  return state.userToken && state.userID
}

const getUser = (state) => {
  let user = {
    name: state.username,
    email: state.useremail,
    id: state.userID,
    token: state.userToken
  }
  return user
}

export {
  authStatus,
  getUser
}
