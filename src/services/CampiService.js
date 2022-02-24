import MASTER from './masterApi/http-common'

class CampiService {
  constructor () {
    this.api = MASTER
  }

  async getAllCampiInfo () {
    try {
      const { data: campiData } = await this.api.get('campi/')
      return campiData
    } catch (error) {
      return []
    }
  }
}

export default CampiService
