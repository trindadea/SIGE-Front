import Header from './Header.vue'
import Vuex from 'vuex'
import vue from 'vue'
import { QHeader, QToolbar } from 'quasar'

vue.use(Vuex)

// 👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Header',
  component: Header
}

// 👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
  components: { Header, QHeader, QToolbar },
  props: Object.keys(argTypes),
  template: `
    <QLayout>
        <QHeader>
            <Header v-bind=$props />
        </QHeader>
    </QLayout>
  `,
  store: new Vuex.Store({
    modules: {
      namespaced: true
    }
  })
})

export const HeaderStory = Template.bind({})
HeaderStory.args = {
  // 👇 The args you need here will depend on your component
}
