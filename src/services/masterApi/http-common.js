import axios from 'axios'

const MASTER = axios.create({
  baseURL: 'http://0.0.0.0:8001/'
})

export default MASTER
