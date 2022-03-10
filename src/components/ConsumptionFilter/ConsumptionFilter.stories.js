// YourComponent.stories.js

import ConsumptionFilter from './ConsumptionFilter.vue'
import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)

// 👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'ConsumptionFilter',
  component: ConsumptionFilter
}

// 👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
  components: { ConsumptionFilter },
  props: Object.keys(argTypes),
  template: '<ConsumptionFilter />',
  store: new Vuex.Store({
    modules: {
      namespaced: true
    }
  })
})

export const ConsumptionFilterStory = Template.bind({})
ConsumptionFilterStory.args = {
  // 👇 The args you need here will depend on your component
}
