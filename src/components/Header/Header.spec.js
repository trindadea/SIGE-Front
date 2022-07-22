import Header from './Header.vue'
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

const HeaderComponent = mount(Header, {
  store,
  localVue,
  data() {
    return {
      userIsLogged: false,
      username: '',
      useremail: ''
    }
  },
  stubs: ['q-layout', 'q-header', 'q-toolbar', 'q-popup-edit']
})

describe('Header', () => {
  it('exists', () => {
    expect(HeaderComponent).toBeTruthy()
  })

  it('check if avatar icon exists', () => {
    const loginIcon = HeaderComponent.findAll('i')
    expect(loginIcon.length).toBe(1)
  })

  it('clicks in avatar icon', async () => {
    const loginIcon = HeaderComponent.findAll('i')
    await loginIcon.trigger('click')
    expect(loginIcon.length).toBe(1)
  })

  const qHeader = HeaderComponent.findComponent(All.QHeader)
  it('check has QHeader component', () => {
    expect(qHeader.exists()).toBeTruthy()
  })

  const qToolbar = HeaderComponent.findComponent(All.QToolbar)
  it('check has QToolbar component', () => {
    expect(qToolbar.exists()).toBeTruthy()
  })

  const qPopupEdit = HeaderComponent.findComponent(All.QPopupEdit)
  it('check has QPopupEdit component', () => {
    expect(qPopupEdit.exists()).toBeTruthy()
  })
})
