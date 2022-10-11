import Transductor from './TransductorsCRUD.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Quasar, * as All from 'quasar'

const pages = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.page && val.page.name != null) {
    object[key] = val
  }
  return object
}, {})

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Quasar, { pages })

const store = new Vuex.Store({})

const TransductorPage = mount(Transductor, {
  store,
  localVue,
  stubs: ['q-dialog', 'i']
})

describe('Transductor', () => {
  it('exists', () => {
    expect(TransductorPage).toBeTruthy()
  })

  it('check if avatar icon exists', () => {
    const btnIcon = TransductorPage.findAll('i')
    expect(btnIcon.length).toBe(12)
  })

  it('clicks in avatar icon', async () => {
    const btnIcon = TransductorPage.findAll('i')
    await btnIcon.trigger('click')
    expect(btnIcon.length).toBe(12)
  })

  const btnAdicionar = TransductorPage.exists('btn')
  it('check has btnAdicionar', () => {
    expect(btnAdicionar).toBe(true)
  })

  const qDialogAdd = TransductorPage.exists('q-dialog')
  it('check has q-dialog adicionar', () => {
    expect(qDialogAdd).toBe(true)
  })
})
