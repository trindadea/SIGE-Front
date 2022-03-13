import ConsumptionFilter from './ConsumptionFilter.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import * as All from 'quasar'
const { Quasar } = All

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

describe('ConsumptionFilter', async () => {
  const wrapper = shallowMount(ConsumptionFilter, {
    store,
    localVue
  })

  it('exists', () => {
    expect(wrapper).toBeTruthy()
  })
})
