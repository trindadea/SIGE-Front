const authStatus = (state) => {
  let userToken = state.userToken
  if (userToken == null) userToken = ''
  let userID = state.userID
  if (userID == null) userID = ''
  return !!(userToken && userID)
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
