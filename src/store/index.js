import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from './userInfo'
import appSettings from './appSettings'
import foodCache from './foodCache'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    userInfo,
    appSettings,
    foodCache,
  },
})

export default store
