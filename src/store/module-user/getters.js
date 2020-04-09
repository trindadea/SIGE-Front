const authStatus = (state) => {
  let userToken = state.userToken
  if (userToken == null) userToken = ''
  let userID = state.userID
  if (userID == null) userID = ''
  console.log(!!(userToken && userID), state.userToken, state.userID)
  return !!(userToken && userID)
}

const getUser = (state) => {
  let user = {
    name: state.username,
    email: state.useremail,
    id: state.userID,
    token: state.userToken
  }
  console.log(user)
  return user
}

export {
  authStatus,
  getUser
}
