import TotalCostFilter from './TotalCostFilter.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Quasar, * as All from 'quasar'
import totalCostStore from 'src/store/module-totalCost'


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

const store = new Vuex.Store({
  modules: {
    totalCostStore,
  },
})

const TotalCostFilterComponent = mount(TotalCostFilter, {
  store,
  localVue,
  data () {
    return {
      optionsCampus: ['Faculdade do  Gama', 'Darcy Ribeiro - Gleba A'],
    }
  },
  stubs: ['q-bar'],

})

describe('TotalCostFilter', () => {
  it('should exists', () => {
    expect(TotalCostFilterComponent).toBeTruthy()
  })

  it('should be clickable', async () => {
    const button = TotalCostFilterComponent.find('button')
    expect(button.classes()).toContain('q-btn')
    await button.trigger('click')
    expect(button).toBeTruthy()
  })

  it('should have N inputs', () => {
    const expectedInputsNumebr = 4;
    const inputNumber = TotalCostFilterComponent.findAll('.q-field__label ').length
    expect(inputNumber).toBe(expectedInputsNumebr)
  })

  it('should have a placeholder on the second input', () => {
    const campusInput = TotalCostFilterComponent.findAll('.q-field__label ').at(0)
    expect(campusInput.text()).not.toBe('')
  })

  it('should have a placeholder on the second input', () => {
    const campusInput = TotalCostFilterComponent.findAll('.q-field__label ').at(1)
    expect(campusInput.text()).not.toBe('')
  })

  it('should have a placeholder on the first date input', () => {
    const campusInput = TotalCostFilterComponent.findAll('.q-field__label ').at(2)
    expect(campusInput.text()).not.toBe('')
  })

  it('should have a placeholder on the second date input', () => {
    const campusInput = TotalCostFilterComponent.findAll('.q-field__label ').at(3)
    expect(campusInput.text()).not.toBe('')
  })
})
