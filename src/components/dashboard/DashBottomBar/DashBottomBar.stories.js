import DashBottomBar from './DashBottomBar.vue'
import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)

export default {
  component: DashBottomBar,
  title: 'Components/DashBottomBar'
}

const Template = (args, { argTypes, alerts = 2 }) => ({
  props: Object.keys(argTypes),
  components: { DashBottomBar },
  template: '<DashBottomBar v-bind=$props />'
})

export const DashBottomBarComponent = Template.bind({})
DashBottomBarComponent.args = {
  alerts: 3,
}
