import GroupsDialog from './GroupsDialog.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
/* eslint import/namespace: ['error', { allowComputed: true }] */
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

describe('GroupsDialog', () => {
  const wrapper = mount(GroupsDialog, {
    store,
    localVue,
    propsData: {
      dialog: 'dialog',
      types: [
        { id: 2, name: 'Gleba', url: 'http://164.41.98.3:443/group-types/2/' },
        { id: 1, name: 'Prédio', url: 'http://164.41.98.3:443/group-types/1/' }
      ],
      groups: {}
    }
  })

  it('exists', () => {
    expect(wrapper).toBeTruthy()
  })
})
