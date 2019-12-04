import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'https://smi-master.lappis.rocks/'
})

export default HTTP
