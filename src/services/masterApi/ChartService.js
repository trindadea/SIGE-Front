import MASTER from './http-common'

const ChartService = {
  getQuartelyDailyConsumption: function () {
    return MASTER.get(`/graph/quarterly-daily-consumption/?campus=${this.selectedCampus.id}`)
  }
}

export default ChartService
