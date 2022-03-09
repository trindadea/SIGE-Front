import ConsumptionFilter from './ConsumptionFilter.vue'
import { mountFactory } from '@quasar/quasar-app-extension-testing-unit-jest';
import {  createLocalVue, shallowMount, mount } from '@vue/test-utils';
import Vuex from 'vuex'
import Quasar, * as All from 'quasar';
import { QAjaxBar, QBtn } from 'quasar';

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});


const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Quasar, { quasar: {
  components: {
    QBtn,
    QAjaxBar
  },
  propsData: {
    lang: 'pt-br',
  },
}})

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
