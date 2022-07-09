import DashCampusTab from './DashCampusTab.vue'
import { mount } from '@vue/test-utils'


const campi = [
  {
    "id":2,
    "name":"Faculdade do Gama",
    "acronym":"FGA",
    "transductors":2,
    "geolocation_latitude":-15.9894,
    "geolocation_longitude":-48.0443,
    "zoom_ratio":"16",
    "groups_related":[
      {
      "id":6,
      "name":"UED"
      },
      {
      "id":6,
      "name":"UED"
      }
    ],
    "url":"http://164.41.98.3:443/campi/2/"
  },
  {
    "id":1,
    "name":"Darcy Ribeiro - Gleba A",
    "acronym":"Darcy A",
    "transductors":11,
    "geolocation_latitude":-15.7636,
    "geolocation_longitude":-47.8694,
    "zoom_ratio":"16",
    "groups_related":[
      {
      "id":2,
      "name":"CPD"
      },
      {
      "id":2,
      "name":"CPD"
      },
      {
      "id":3,
      "name":"FT"
      },
      {
      "id":4,
      "name":"PAT"
      },
      {
      "id":3,
      "name":"FT"
      },
      {
      "id":3,
      "name":"FT"
      },
      {
      "id":1,
      "name":"ICC"
      },
      {
      "id":1,
      "name":"ICC"
      },
      {
      "id":1,
      "name":"ICC"
      },
      {
      "id":7,
      "name":"BSAN"
      },
      {
      "id":5,
      "name":"CEU"
      }
    ],
    "url":"http://164.41.98.3:443/campi/1/"
  }
]
const DashCampusTabComponent = mount(DashCampusTab, {
  propsData: {
    campi
  },
  stubs:['q-tabs', 'q-tab', 'q-tab-panels', 'q-tab-panel' ]
})

describe('DashCampusTab', () => {
  it('should exists', () => {
    expect(DashCampusTabComponent).toBeTruthy()
  })

  it('Should be visible', ()=>{
    const child = DashCampusTabComponent.findComponent('div')
    expect(child.exists()).toBe(true)
    expect(DashCampusTabComponent.isVisible()).toBe(true)
    expect(child.isVisible()).toBe(true)
  })

  it('Should have the correct data', () => {
    expect(DashCampusTabComponent.vm.campi).toEqual(campi)
  })

  it('Should have the correct number of campus', () => {
    expect(DashCampusTabComponent.vm.campi.length).toEqual(campi.length)
  })

  it('Should have all given campus names', () => {
    const textComponent = DashCampusTabComponent.text()
    campi.forEach(campus => {
      expect(textComponent).toContain(campus.name)
    })
  })
})
