import MASTER from './http-common'

const ChartService = {
<<<<<<< HEAD
  getQuartelyDailyConsumption: function (id) {
    const date = new Date()
    const startDate = [date.getFullYear() + 1, date.getMonth(), date.getDate()].join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
    return MASTER.get(`/graph/quarterly-daily-consumption/?campus=${id}&start_date=${startDate}`)
=======
  getQuartelyDailyConsumption: function () {
    return MASTER.get(`/graph/quarterly-daily-consumption/?campus=${this.selectedCampus.id}`)
>>>>>>> 08273da (#53 - 'ChargeBarChart' component refactoring)
  }
}

export default ChartService
