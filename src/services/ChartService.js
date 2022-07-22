import MASTER from './masterApi/http-common'

class ChartService {
  constructor () {
    this.api = MASTER
  }

  async getChartData (url, unit, dimension) {
    try {
      const { data: chartData } = await this.api.get(url)
      const newChart = {
        values: chartData.cost,
        min: chartData.min,
        max: chartData.max,
        status: true,
        unit,
        dimension
      }
      return newChart
    } catch (error) {
      return {}
    }
  }
}

export default ChartService
