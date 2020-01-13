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
  baseURL: `http://${window.location.hostname}:8001/`
})

export default HTTP
