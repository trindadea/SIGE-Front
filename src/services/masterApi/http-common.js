import axios from 'axios'

const HTTP = axios.create({
  baseURL: `http://${window.location.hostname}:8001/`
})

export default HTTP
