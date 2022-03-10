import ConsumptionFilter from './ConsumptionFilter.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Quasar, * as All from 'quasar'

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Quasar, { components })

const store = new Vuex.Store({})

describe('ConsumptionFilter', () => {
  const wrapper = mount(ConsumptionFilter, {
    store,
    localVue
  })

  it('exists', () => {
    expect(wrapper).toBeTruthy()
  })
})
