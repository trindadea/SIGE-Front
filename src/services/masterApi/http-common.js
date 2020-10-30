import axios from 'axios'

const MASTER = axios.create({
  baseURL: 'http://164.41.98.3:8001/'
})

export default MASTER
