import axios from 'axios'

const MASTER = axios.create({
  baseURL: 'https://smi-master.lappis.rocks/'
})

export default MASTER
