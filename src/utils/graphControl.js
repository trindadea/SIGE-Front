// import MASTER from '../services/master/http-common'

export async function getGraphInformation (filters, typeGraph) {
  if (typeGraph === 'energy_consumption') {
    return [{
      name: 'Consumo (Wh)',
      data: [150, 30]
    }]
  }

  return []
}
