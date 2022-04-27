import DashCampusTab from './DashCampusTab.vue'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
// import Vuex from 'vuex'
// import Quasar, * as All from 'quasar'

// const components = Object.keys(All).reduce((object, key) => {
//   const val = All[key]
//   if (val && val.component && val.component.name != null) {
//     object[key] = val
//   }
//   return object
// }, {})

// const localVue = createLocalVue()
// localVue.use(Vuex)
// localVue.use(Quasar, { components })

// const store = new Vuex.Store({})

const DashCampusTabComponent = shallowMount(DashCampusTab, {
  // store,
  // localVue,
  data () {
    return {
      campus: ['Faculdade do  Gama', 'Darcy Ribeiro - Gleba A']
    }
  },
  stubs:['DashMap', 'dash-map']
})

describe('DashCampusTab', () => {
  it('should exists', async () => {
    expect(DashCampusTabComponent).toBeTruthy()
  })

  it('Should be visible', ()=>{
    const child = DashCampusTabComponent.findComponent('div')
    expect(child.exists()).toBe(true)
    expect(DashCampusTabComponent.isVisible()).toBe(true)
    expect(child.isVisible()).toBe(true)
  })

})
