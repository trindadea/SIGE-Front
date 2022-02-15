import MASTER from './masterApi/http-common'

class ResetPasswordService {
  constructor () {
    this.client = MASTER
  }

  async requestResetPasswordEmail ({ email }) {
    return await this.client.post('password_reset/reset_password/', { email })
  }

  async validateResetPasswordToken ({ token }) {
    return await this.client.post('password_reset/validate_token/', { token })
  }

  async resetPassword ({ token, password }) {
    return await this.client.post('password_reset/confirm/', { token, password })
  }
}

export default ResetPasswordService
