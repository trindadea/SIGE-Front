import MASTER from './http-common'

const ChartService = {
  getQuartelyDailyConsumption: function (id) {
    const date = new Date()
    const startDate = [date.getFullYear() + 1, date.getMonth(), date.getDate()].join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
    return MASTER.get(`/graph/quarterly-daily-consumption/?campus=${id}&start_date=${startDate}`)
  }
}

export default ChartService
