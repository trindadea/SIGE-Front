import axios from 'axios'

export default async ({ Vue, ssrContext }) => {
  Vue.prototype.$axios = axios
}
