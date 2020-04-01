import axios from 'axios'

if (typeof window === 'undefined') {
  global.window = {
    location: {
      replace: () => {},
      protocol: 'https'
    },
    navigator: {
      userAgent: '',
      appVersion: ''
    },
    scrollTo: () => {},
    open: () => {},
    localStorage: {}
  }
}

const HTTP = axios.create({
  baseURL: `http://0.0.0.0:8001/`
})

export default HTTP
