import TotalCostFilter from './TotalCostFilter.vue'
import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)

export default {

  title: 'Components/TotalCostFilter',
  component: TotalCostFilter
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TotalCostFilter },
  template: '<TotalCostFilter />',
  store: new Vuex.Store({
    modules: {
      namespaced: true
    }
  })
})

export const TotalCostFilterComponent = Template.bind({})
TotalCostFilterComponent.args = {}
