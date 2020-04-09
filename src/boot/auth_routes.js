const tokenIsValid = (store) => {
  if (store.getters['userStore/authStatus']) {
    return true
  }
  return false
}

export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !tokenIsValid(store)) {
      next({ path: '/users/login' })
    }
    next()
  })
}
