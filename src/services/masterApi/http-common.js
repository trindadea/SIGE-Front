import axios from 'axios'

const MASTER = axios.create({
  baseURL: 'http://164.41.98.3:443/'
})

export default MASTER
