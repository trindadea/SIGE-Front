import Vuex from 'vuex'
import Vue from 'vue'
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import Quasar from 'quasar';

class QuasarTest {
  
  _localVue;

  constructor(){
    this.setUpQuasar()
  }
  
  setUpQuasar() {
    this._localVue = createLocalVue()
    Vue.use(Quasar)
    this._localVue.use(Vuex)
    this._localVue.use(Quasar)
  }

  shallowMount (Component, propsData = {}) {
    const localVue = this._localVue;
    return shallowMount(Component, {
      localVue,
      propsData
    });
  }

  mount (Component, propsData = {}) {
    const localVue = this._localVue;
    return mount(Component, {
      localVue,
      propsData
    });
  }
}

export default new QuasarTest();