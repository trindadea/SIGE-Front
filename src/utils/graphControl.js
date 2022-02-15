import MASTER from '../services/masterApi/http-common'
import moment from 'moment'

export async function getGraphInformation (filters) {
  const typeGraph = window.location.pathname.replace('/', '')
  if (typeGraph === 'energy_consumption') {
    let url = `graph/consumption-curve/?period=${filters.periodicity}`

    if (filters.campus) {
      url += `&campus=${filters.campus}`
    }

    if (filters.group) {
      url += `&group=${filters.group}`
    }

    if (filters.startDate) {
      const date = moment(filters.startDate)
      url += `&start_date=${date.year()}-${date.month() + 1}-${date.date()} 00:00:00`
    }

    if (filters.endDate) {
      const date = moment(filters.endDate)
      url += `&end_date=${date.year()}-${date.month() + 1}-${date.date()} 23:59:00`
    }

    const resp = await MASTER.get(url)
    return resp.data
  }
}
