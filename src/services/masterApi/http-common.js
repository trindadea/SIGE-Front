import axios from 'axios'

const MASTER = axios.create({
  baseURL: 'http://localhost:8001/'
})

export default MASTER
