import Vuex from 'vuex'
import Vue from 'vue'
import {  createLocalVue, shallowMount } from '@vue/test-utils';
import Quasar from 'quasar';

class QuasarTest {
  
  _localVue = createLocalVue()

  constructor(){
    this.setUpQuasar()
  }

  setUpQuasar() {
    Vue.use(Quasar)
    this._localVue.use(Vuex)
    this._localVue.use(Quasar)
  }

  render (Component, propsData) {
    const localVue = this._localVue;
    return shallowMount(Component, {
      localVue,
      propsData
    });
  }
}

export default new QuasarTest();
