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
  baseURL: `http://192.168.100.229:8001/`
})

export default HTTP
