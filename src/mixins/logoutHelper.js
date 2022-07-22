import { Notify } from 'quasar'

const logoutHelper = {
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$store.dispatch('userStore/logout')
      Notify.create({
        type: 'positive',
        message: 'Você saiu da sua conta.'
      })
      this.$router.push('/login')
    }
  }
}

export default logoutHelper
