import axios from 'axios'

const MASTER = axios.create({
  baseURL: 'https://smi-master.dev.lappis.rocks/'
})

export default MASTER
