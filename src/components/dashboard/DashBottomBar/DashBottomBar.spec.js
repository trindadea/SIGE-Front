import { mount } from '@vue/test-utils'
import DashBottomBar from './DashBottomBar.vue'

const alertsNumber = 12;

const DashBottomBarComponent = mount(DashBottomBar, {
  propsData: {
    alerts: alertsNumber,
  },
  stubs: ['q-bar'],
})

describe('DashBottomBar', () => {

  test('Component is rendered', () => {
    expect(DashBottomBarComponent.exists()).toBe(true)
  })

  test('The component is visible', ()=>{
    const child = DashBottomBarComponent.findComponent('div')
    expect(child.exists()).toBe(true)
    expect(DashBottomBarComponent.isVisible()).toBe(true)
    expect(child.isVisible()).toBe(true)
  })

  test('Sige logo is rendered', () => {
    const child = DashBottomBarComponent.findComponent('img')
    expect(child.exists()).toBe(true)
  })

  test('Element receives and shows alerts number prop', () => {
    expect(DashBottomBarComponent.props().alerts).toBe(alertsNumber)
    expect(DashBottomBarComponent.text()).toContain(`${alertsNumber} ocorrências em andamento`)
  })

  test('Element receives and shows correct date', () => {
    const dateDiv = DashBottomBarComponent.findComponent('#datetime')
    expect(dateDiv.exists()).toBe(true)
    expect(dateDiv.text()).toContain(`${
      new Date().toLocaleString('pt-BR').split(' ')[0]
    }`)
  })

})
