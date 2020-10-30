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
  const graphOptions = await getGraphOptions(filter.dimension)
  const startDate = await getDate(filter.startDate)
  const endDate = await getDate(filter.endDate)
  const type = graphOptions.url === 'cost-consumption' ? 'daily' : 'hourly'
  const url = `/graph/${graphOptions.url}/?id=${filter.transductor}&start_date=${startDate}&end_date=${endDate}&type=${type}`
  const graph = {
    unit: graphOptions.unit,
    dimension: filter.dimension,
    // Linechart options
    phase_a: [],
    phase_b: [],
    phase_c: [],

    // Barchart options
    values: [],
    min: 0,
    max: 0,

    status: false,
    graphType: graphOptions.graphType
  }
  if (hasAllData(filter, graphOptions)) {
    switch (graphOptions.graphType) {
      case 'linechart':
        await MASTER
          .get(url)
          .then((res) => {
            const measurements = res.data[0]
            graph.phase_a = measurements.phase_a
            graph.phase_b = measurements.phase_b
            graph.phase_c = measurements.phase_c
            graph.status = true
          })
          .catch((err) => {
            console.log('catch', err)
          })
        break

      case 'barchart':
        await MASTER
          .get(url)
          .then((res) => {
            graph.values = res.data[graphOptions.nameValue]
            graph.min = res.data.min
            graph.max = res.data.max
            graph.status = true
          })
          .catch((err) => {
            console.log('catch', err)
          })
        break

      default:
        break
    }
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
  if (date !== '' && date !== undefined) {
    const dateParts = date.split('/')
    const res = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' ' + '00:00:00'

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
        graphType: 'barchart',
        nameValue: 'cost'
      }
    case dimensions[2]: // Consumo
      return {
        url: 'quarterly-total-consumption',
        unit: 'kWh',
        graphType: 'barchart',
        nameValue: 'consumption'
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
        url: 'quarterly-total-capacitive-power',
        unit: 'kVArh',
        graphType: 'barchart',
        nameValue: 'capacitive_power'
      }
    case dimensions[6]: // Energia Indutiva
      return {
        url: 'quarterly-total-inductive-power',
        unit: 'kVArh',
        graphType: 'barchart',
        nameValue: 'inductive_power'
      }
    case dimensions[7]: // Fator de Potencia
      return {
        url: 'minutely-power-factor',
        unit: ' ', // Não possui unidade, é uma grandeza adimensional
        graphType: 'linechart'
      }
    case dimensions[8]: // Geração
      return {
        url: 'quarterly-total-generation',
        unit: 'kWh',
        graphType: 'barchart',
        nameValue: 'generation'
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
