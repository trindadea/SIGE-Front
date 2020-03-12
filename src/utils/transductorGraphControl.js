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
    status: false,
    graphType: graphOptions.graphType
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

export function getGraphOptions (dimension) {
  switch (dimension) {
    case dimensions[0]: // Corrente
      return {
        url: 'minutely-threephase-current',
        unit: 'A',
        graphType: 'linechart'
      }
    case dimensions[1]: // Custo
      return {
        url: 'cost-consumption',
        unit: 'R$',
        graphType: 'linechart'
      }
    case dimensions[2]: // Consumo
      return {
        url: '',
        unit: '',
        graphType: ''
      }
    case dimensions[3]: // DHT Corrente
      return {
        url: 'minutely-dht-current',
        unit: 'A',
        graphType: 'linechart'
      }
    case dimensions[4]: // DHT Tensão
      return {
        url: 'minutely-dht-voltage',
        unit: 'V',
        graphType: 'linechart'
      }
    case dimensions[5]: // Energia Captativa
      return {
        url: '',
        unit: '',
        graphType: ''
      }
    case dimensions[6]: // Energia Indutiva
      return {
        url: '',
        unit: '',
        graphType: ''
      }
    case dimensions[7]: // Fator de Potencia
      return {
        url: 'minutely-power-factor',
        unit: ' ',
        graphType: 'linechart'
      }
    case dimensions[8]: // Geração
      return {
        url: '',
        unit: '',
        graphType: ''
      }
    case dimensions[9]: // Potencia Aparente
      return {
        url: 'minutely-apparent-power',
        unit: 'kVA',
        graphType: 'linechart'
      }
    case dimensions[10]: // Potencia Ativa
      return {
        url: 'minutely-active-power',
        unit: 'W',
        graphType: 'linechart'
      }
    case dimensions[11]: // Potencia Reativa
      return {
        url: 'minutely-reactive-power',
        unit: 'kVAr',
        graphType: 'linechart'
      }
    case dimensions[12]: // Tensão
      return {
        url: 'minutely-threephase-voltage',
        unit: 'V',
        graphType: 'linechart'
      }
    default:
      return {
        url: '',
        unit: '',
        graphType: ''
      }
  }
}
