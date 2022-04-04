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

const ConsumptionFilterComponent = mount(ConsumptionFilter, {
  store,
  localVue,
  data () {
    return {
      optionsCampus: ['Faculdade do  Gama', 'Darcy Ribeiro - Gleba A']
    }
  },
  stubs: ['q-bar']
})

describe('ConsumptionFilter', () => {
  it('exists', () => {
    expect(ConsumptionFilterComponent).toBeTruthy()
  })

  it('clicks in button', async () => {
    const button = ConsumptionFilterComponent.find('button')
    expect(button.classes()).toContain('q-btn')

    await button.trigger('click')

    expect(button).toBeTruthy()
  })

  it('expect to have 4 inputs', () => {
    const inputNumber = ConsumptionFilterComponent.findAll('.q-field__label ').length
    expect(inputNumber).toBe(4)
  })

  it('expect first input to be Campus', () => {
    const campusInput = ConsumptionFilterComponent.findAll('.q-field__label ').at(0)

    expect(campusInput.text()).toBe('Campus')
  })

  it('expect second input to be Filtro', () => {
    const campusInput = ConsumptionFilterComponent.findAll('.q-field__label ').at(1)

    expect(campusInput.text()).toBe('Filtro')
  })

  it('expect second third input to contain Início', () => {
    const campusInput = ConsumptionFilterComponent.findAll('.q-field__label ').at(2)

    expect(campusInput.text()).toContain('Início')
  })

  it('expect second fourth input to contain Fim', () => {
    const campusInput = ConsumptionFilterComponent.findAll('.q-field__label ').at(3)

    expect(campusInput.text()).toContain('Fim')
  })
})
