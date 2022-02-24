import MASTER from './http-common'

const ChartService = {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 763afcc (#53 - Addition of the 'ChargeBarChart' component storybook)
  getQuartelyDailyConsumption: function (id) {
    const date = new Date()
    const startDate = [date.getFullYear() + 1, date.getMonth(), date.getDate()].join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
    return MASTER.get(`/graph/quarterly-daily-consumption/?campus=${id}&start_date=${startDate}`)
<<<<<<< HEAD
=======
  getQuartelyDailyConsumption: function () {
    return MASTER.get(`/graph/quarterly-daily-consumption/?campus=${this.selectedCampus.id}`)
>>>>>>> 08273da (#53 - 'ChargeBarChart' component refactoring)
=======
>>>>>>> 763afcc (#53 - Addition of the 'ChargeBarChart' component storybook)
  }
}

export default ChartService
