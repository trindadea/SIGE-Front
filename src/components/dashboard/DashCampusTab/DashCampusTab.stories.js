import DashCampusTab from './DashCampusTab.vue'
import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)

export default {
  component: DashCampusTab,
  title: 'Components/DashCampusTab'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DashCampusTab },
  template: '<DashCampusTab v-bind="$props"/>'
})

export const DashCampusTabComponent = Template.bind({})
DashCampusTabComponent.args = {
  campi: [{id:1, name:'fga'}, {id:2, name:'darcy'}] ,
}
