import store from '.'
import { setLocalStorage } from './util'

const MODULE_KEY = 'userInfo'

// Personal info about the user
const stateDefault = {
  personal: {
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    birthday: null,
    birthdayTimestamp: null,
  },
  metrics: {
    age: null,
    gender: null,
    height: 177,
    weight: 160,
    bodyFatPct: null,
    mass: 72.57,
    tdee: null,
  },
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

export default {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    /** Translates the user's birthday into a timestamp, and calculates their age. */
    // setBirthday(state, birthday) {
    //   const today = new Date().getTime()
    //   const birthdayTimestamp = new Date(birthday).getTime()
    //   const secondsInAYear = 365 * 24 * 60 * 60
    //   const age = Math.round(((today - birthdayTimestamp) / secondsInAYear / 1000) * 10) / 10

    //   state.personal.birthday = birthday
    //   state.personal.personal.birthdayTimestamp = birthdayTimestamp
    //   state.metrics.age = age

    //   setLocalStorage(MODULE_KEY, state)
    // },
    setGender(state, gender) {
      state.metrics.gender = gender
      store.commit('userInfo/calcTDEE')
      setLocalStorage(MODULE_KEY, state)
    },
    setHeight(state, height) {
      state.metrics.height = height
      store.commit('userInfo/calcTDEE')
      setLocalStorage(MODULE_KEY, state)
    },
    setMass(state, mass) {
      state.metrics.mass = mass
      store.commit('userInfo/calcTDEE')
      setLocalStorage(MODULE_KEY, state)
    },
    setBodyFatPct(state, bodyFatPct) {
      state.metrics.bodyFatPct = bodyFatPct
      store.commit('userInfo/calcTDEE')
      setLocalStorage(MODULE_KEY, state)
    },
    // Converts between metric and imperial
    setWeight(state, weight) {
      let w
      let mass

      if (typeof weight !== 'number') {
        w = null
        mass = null
      } else {
        w = weight

        const unitWeight = store.state.appSettings.unitWeight

        if (unitWeight === 'metric') {
          mass = weight
        } else {
          mass = weight / 2.20462
        }
      }

      state.metrics.weight = w

      store.commit('userInfo/setMass', mass)
      store.commit('userInfo/calcTDEE')

      setLocalStorage(MODULE_KEY, state)
    },
    calcTDEE(state) {
      const bodyFatPct = state.metrics.bodyFatPct
      const mass = state.metrics.mass
      const height = state.metrics.height

      let leanBodyMass

      // calculate leanBodyMass
      // Body fat percentage
      if (bodyFatPct) {
        leanBodyMass = mass * (100 - bodyFatPct) / 100
      } else if (state.metrics.gender === 'male') {
        // Boer formula (1984)
        leanBodyMass = (0.407 * mass) + (0.267 * height) - 19.2
      } else {
        // Boer formula (1984)
        leanBodyMass = (0.252 * mass) + (0.473 * height) - 48.3
      }

      // Katch McArdle
      const basalMetabolicRate = 370 + (21.6 * leanBodyMass)

      // Multiply by activity level to get TDEE
      const tdee = Math.floor(basalMetabolicRate * store.state.appSettings.activityLevel)

      state.metrics.tdee = tdee
      store.commit('days/setTDEE', tdee)
      setLocalStorage(MODULE_KEY, state)
    },
  },
}