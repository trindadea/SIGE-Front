export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (store.getters['userStore/authStatus'] && (to.path === '/users/login' || to.path === '/users/register')) {
      return next('/')
    }
    if (requiresAuth && !store.getters['userStore/authStatus']) {
      return next({ path: '/users/login' })
    }

    next()
  })
}
