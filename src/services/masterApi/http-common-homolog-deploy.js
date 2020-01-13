import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'https://smi-master.dev.lappis.rocks/'
})

export default HTTP
