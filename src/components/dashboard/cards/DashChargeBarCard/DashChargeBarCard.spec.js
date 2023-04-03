import DashChargeBarCard from './DashChargeBarCard.vue'

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
localVue.use(Quasar, {components})

const store = new Vuex.Store({})

const DashChargeBarCardComponent = mount(DashChargeBarCard, {
  store,
  localVue,
  propsData: {
    transductor: {
      active: true,
    }
  },
  stubs: ['q-card', 'charge-bar-chart']
})

describe('DashChargeBarCard', () => {
  it('exists', () => {
    expect(DashChargeBarCardComponent).toBeTruthy()
  })

  it('has QCard component', () => {
    const qCard = DashChargeBarCardComponent.findComponent(All.QCard)
    expect(qCard.exists()).toBeTruthy()
  })

  it('has chargeBarChart component', () => {
    const chargeBarChart = DashChargeBarCardComponent.findComponent({name: 'ChargeBarChart'})
    expect(chargeBarChart.exists()).toBeTruthy()
  })
})
