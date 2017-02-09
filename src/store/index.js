import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from 'store/userInfo'
import appSettings from 'store/appSettings'
import foodCache from 'store/foodCache'
import workoutCache from 'store/workoutCache'
import entries from 'store/entries'
import calendar from 'store/calendar'

Vue.use(Vuex)

// TODO: replace localStorage with IndexedDB
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    userInfo,
    appSettings,
    foodCache,
    workoutCache,
    entries,
    calendar,
  },
})

export default store
