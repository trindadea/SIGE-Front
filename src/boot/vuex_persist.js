import { Cookies } from 'quasar'
import createPersistedState from 'vuex-persistedstate'

export default function ({ store, ssrContext }) {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  createPersistedState({
    key: 'userStore',
    paths: ['userStore'],
    filter ({ type }) {
      return type.startsWith('userStore')
    },
    storage: {
      getItem (key) {
        return JSON.stringify(cookies.get(key))
      },
      setItem (key, value) {
        cookies.set(key, value, { path: '/' })
      },
      removeItem (key) {
        cookies.remove(key)
      }
    }
  })(store)
}
