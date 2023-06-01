import DashGeneralEventBar from './DashGeneralEventBar.vue'

import { createLocalVue, shallowMount } from '@vue/test-utils'
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

const propsData = {
  otherEvents: {
    critical_tension: [],
    precarious_tension: [],
    phase_drop: [],
    slave_connection_fail: [],
    transductor_connection_fail: [],
  },
}

const eventTypes = [
  {
    name: 'Tensão Crítica',
    eventsList: propsData.otherEvents.critical_tension,
  },
  {
    name: 'Queda de Fase',
    eventsList: propsData.otherEvents.phase_drop,
  },
  {
    name: 'Tensão Precária',
    eventsList: propsData.otherEvents.precarious_tension,
  },
  {
    name: 'Falha de Comunicação',
    eventsList: [...propsData.otherEvents.slave_connection_fail, ...propsData.otherEvents.transductor_connection_fail],
  },
  {
    name: 'Máximo Consumo',
    eventsList: [],
  }
]

const DashGeneralEventBarComponent = shallowMount(DashGeneralEventBar, {
  store,
  localVue,
  propsData,
  data() {
    return {
      eventTypes
    }
  },
})

describe('DashGeneralEventBar', () => {
  it('exists', () => {
    expect(DashGeneralEventBarComponent).toBeTruthy()
  })

  it('expect number of DashEventCard components to be the eventTypes length', () => {
    const dashEventCard = DashGeneralEventBarComponent.findAllComponents({name: 'DashEventCard'})
    expect(dashEventCard.exists()).toBeTruthy()
    expect(dashEventCard.length).toBe(eventTypes.length)
  })
})
