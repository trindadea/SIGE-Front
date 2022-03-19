import DashBottomBar from './DashBottomBar.vue'
import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)

export default {
  component: DashBottomBar,
  title: 'Components/DashBottomBar'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DashBottomBar },
  // template: '<transducer-alert :occurrence="occurrence" :serious="serious" />'
  template: '<DashBottomBar />'
})
export const DashBottomBarComponent = Template.bind({})
DashBottomBarComponent.args = {
  alerts: 3,
}
