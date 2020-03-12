export const dimensions = [
  'Corrente',
  'Custo',
  'Consumo',
  'DHT Corrente',
  'DHT Tensão',
  'Energia Captativa',
  'Energia Indutiva',
  'Fator de Potência',
  'Geração',
  'Potência Aparente',
  'Potência Ativa',
  'Potência Reativa',
  'Tensão'
]
import MASTER from '../services/masterApi/http-common'

export async function getGraph (filter) {
  let graphOptions = await getGraphOptions(filter.dimension)
  let startDate = await getDate(filter.startDate)
  let endDate = await getDate(filter.endDate)
  let url = `/graph/${graphOptions.url}/?serial_number=${filter.transductor}&start_date=${startDate}&end_date=${endDate}&is_filtered=True`
  let graph = {
    unit: graphOptions.unit,
    dimension: filter.dimension,
    phase_a: [],
    phase_b: [],
    phase_c: [],
    status: false
  }
  if (await hasAllData(filter, graphOptions)) {
    await MASTER
      .get(url)
      .then((res) => {
        const measurements = res.data[0]
        console.log('entrou no then', res)
        graph.phase_a = measurements['phase_a']
        graph.phase_b = measurements['phase_b']
        graph.phase_c = measurements['phase_c']
        graph.status = true
      })
      .catch((err) => {
        console.log('catch', err)
      })
  }
  return graph
}

export function hasAllData (filter, options) {
  if (options.url !== '' &&
    filter.transductor !== undefined &&
    filter.startDate !== undefined &&
    filter.endDate !== undefined) {
    return true
  } else {
    return false
  }
}

export function getDate (date) {
  console.log('date', date)
  if (date !== '') {
    let dateParts = date.split('/')
    let res = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' ' + '00:00:00'

    return res
  } else {
    return undefined
  }
}
export function graphType (dimension) {
  if (dimension === dimensions[0] || dimension === dimensions[3] ||
    dimension === dimensions[4] || dimension === dimensions[6] ||
    dimension === dimensions[7] || dimension === dimensions[9] ||
    dimension === dimensions[10] || dimension === dimensions[11] ||
    dimension === dimensions[12]) {
    return 'linechart'
  } else {
    return ''
  }
}
export function getGraphOptions (dimension) {
  switch (dimension) {
    case dimensions[0]:
      return {
        url: '',
        unit: ''
      }
    case dimensions[1]:
      return {
        url: '',
        unit: ''
      }
    case dimensions[2]:
      return {
        url: '',
        unit: ''
      }
    case dimensions[3]:
      return {
        url: 'minutely-dht-current',
        unit: 'A'
      }
    case dimensions[4]:
      return {
        url: 'minutely-dht-voltage',
        unit: 'V'
      }
    case dimensions[5]:
      return {
        url: '',
        unit: ''
      }
    case dimensions[6]:
      return {
        url: '',
        unit: ''
      }
    case dimensions[7]:
      return {
        url: '',
        unit: ''
      }
    case dimensions[8]:
      return {
        url: '',
        unit: ''
      }
    case dimensions[9]:
      return {
        url: 'minutely-apparent-power',
        unit: 'kVA'
      }
    case dimensions[10]:
      return {
        url: 'minutely-active-power',
        unit: 'W'
      }
    case dimensions[11]:
      return {
        url: 'minutely-reactive-power',
        unit: 'kVAr'
      }
    case dimensions[12]:
      return {
        url: '',
        unit: ''
      }
    default:
      return {
        url: '',
        unit: ''
      }
  }
}
