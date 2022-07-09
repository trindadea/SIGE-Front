import DashLastMeasurementCard from './'
import QuasarTest from 'src/utils/QuasarTest';

const MOCKS = {
  transductor: {
    name: 'FGA - Gama'
  },
  transductor_occurences: {
    count: 1245,
    precarious_tension: [1, 23, 4, 6],
    transductor_connection_fail: [1, 23, 4, 6],
    slave_connection_fail: [1, 6, 4],
    critical_tension: [1],
    phase_drop: [1]
  },
  realTimeMeasurements: {
    voltage_a: 123.34 ,
    voltage_b: 32.312, 
    voltage_c: 131.3124,
    current_a: 113.34 ,
    current_b: 332.312, 
    current_c: 151.1124,
    total_active_power: 312.1,
    total_reactive_power: 3214.134,
    total_power_factor: 6541.23
  },
  measurementsCallback: jest.fn(),
}

function withWrapperArray(wrapperArray) {
  return {
    childSelectorHasText: (selector, str) => wrapperArray.filter(i => i.find(selector).text().match(str)),
    hasText: (str) => wrapperArray.filter(i => i.text().match(str)),
  }
}

describe('Dash Last Measurement Card', () => {
  describe('Teste de snapshot', () => {
    it("Componente formato Default", () => {
      const wrapper = QuasarTest.mount(DashLastMeasurementCard, MOCKS)
      expect(wrapper.element).toMatchSnapshot() 
    })
  })

  describe("Callback", ()=>{
    it('Função deve ser chamada assim que o componente for renderizado', () => {
      QuasarTest.mount(DashLastMeasurementCard, MOCKS);
      expect(MOCKS.measurementsCallback).toHaveBeenCalled();
    })
  })

  describe("Soma dos eventos", ()=>{
    it('O valor de eventos precarios deve ser a soma dos eventos do array', () => {
      const wrapper = QuasarTest.mount(DashLastMeasurementCard, MOCKS);
      const critical = wrapper.html().includes('6');
      const precary = wrapper.html().includes('7');
      expect(critical).toBeTruthy();
      expect(precary).toBeTruthy();
    })
  })
})
