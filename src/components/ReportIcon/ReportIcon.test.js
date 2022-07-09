import ReportIcon from './ReportIcon.vue'
import QuasarTest from 'src/utils/QuasarTest';

const reportsMocked = {
  precarious_tension: [1, 23, 4, 6],
  transductor_connection_fail: [1, 23, 4, 6 ],
  slave_connection_fail: [1, 23, 4, 6],
  critical_tension: [1],
  phase_drop: [1]
}

describe('Report Icon', () => {
  describe('Teste de snapshot', () => {
    it("Componente precario", () => {
      const wrapper = QuasarTest.shallowMount(ReportIcon, {reports: reportsMocked, label:"Leve", critical: false})
      expect(wrapper.element).toMatchSnapshot()
    })
    it("Componente critico", () => {
      const wrapper = QuasarTest.shallowMount(ReportIcon, {reports: reportsMocked, label:"Leve", critical: true})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe("Teste do icone", ()=>{
    it('Prop critical deve alterar icone default', () => {
      const wrapper = QuasarTest.shallowMount(ReportIcon, {reports: reportsMocked, label:"Leve", critical: true})
      expect(wrapper.html()).toContain('img:statics/ic_ocorrencia_critica_color.svg')
    })
  })
  describe("Soma dos eventos", ()=>{
    it('O valor de eventos precarios deve ser a soma dos eventos do array', () => {
      const wrapper = QuasarTest.shallowMount(ReportIcon, {reports: reportsMocked, label:"Leve", critical: false})
      const events = Number(wrapper.find('#ReportIconEvents').text())
      expect(events).toBe(12)
    })
    it('O valor de eventos criticos deve ser a soma dos eventos do array', () => {
      const wrapper = QuasarTest.shallowMount(ReportIcon, {reports: reportsMocked, label:"Leve", critical: true})
      const events = Number(wrapper.find('#ReportIconEvents').text())
      expect(events).toBe(2)
    })
  })
})