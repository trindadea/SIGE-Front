import QuasarTest from "src/utils/QuasarTest";
import DashEventCard from '.';

const PROPS_DATA = {
  eventTile: 'Queda de Fase Teste',
  cardTypeStyle: 'card-active',
  campusEvents: [
    {
      id: 1,
      location: 'Gama',
      campus: 'FGA',
      transductor: 'FGA - 2',
      data: {
        voltage_a: 1, 
        voltage_b: 1, 
        voltage_c: 1, 
      },
    },
  ],
  icon: 1
}

describe('DashEventCard', () => {
  describe("Snapshot", () => {
    describe.each([
      {cardTypeStyle: "card-active"},
      {cardTypeStyle: "card-inactive"},
      {cardTypeStyle: "card-active-critical"},
      {cardTypeStyle: "card-active-warning"},
    ])("cardTypeStyle", ({cardTypeStyle}) => {
      it(`Teste da quando prop de estilo é ${cardTypeStyle}`, () => {
        const wrapper = QuasarTest.shallowMount(DashEventCard, {...PROPS_DATA, cardTypeStyle});
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });
  describe("Props", ()=>{
    describe("campusEvents", ()=>{
      it("A localização deve ter seu nome cortado quando muito longo", () => {
        const campusEvents = [{location: "Cidade com nome muito longo", data: undefined, campus: undefined}]
        
        const wrapper = QuasarTest.shallowMount(DashEventCard, {...PROPS_DATA, campusEvents});
        const cityName = wrapper.find('#DashEventCardCampus')

        expect(cityName.text()).toBe("Cidade com nome...");
      })

      it("A localização ser concatenda com o campus e as voltagens", () => {
        const wrapper = QuasarTest.shallowMount(DashEventCard, PROPS_DATA);
        const cityName = wrapper.find('#DashEventCardCampus')
  
        expect(cityName.text()).toBe("Gama (FGA) - A,B,C");
      })

      it("Caso a localização seja indefinida deve retornar 'Sem localização'", () => {
        const campusEvents = [{location: undefined, data: undefined, campus: undefined}]
        
        const wrapper = QuasarTest.shallowMount(DashEventCard, {...PROPS_DATA, campusEvents});
        const cityName = wrapper.find('#DashEventCardCampus')
  
        expect(cityName.text()).toBe("Sem localização");
      })
    })
  })
})