import ActiveBox from './ActiveBox.vue'
import MapModal from '../MapModal'
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

const ActiveBoxComponent = mount(ActiveBox, {
  store,
  localVue,
  propsData: {
    id: 1
  }
})

describe('ActiveBox', () => {
  it('exists', () => {
    expect(ActiveBoxComponent).toBeTruthy()
  })

  it('check if exists campus div', async () => {
    expect(ActiveBoxComponent.classes('status-card')).toBe(true)
  })

  const mapModal = ActiveBoxComponent.findComponent(MapModal)
  it('check has MapModal component', async () => {
    expect(mapModal.exists()).toBeTruthy()
  })
})
