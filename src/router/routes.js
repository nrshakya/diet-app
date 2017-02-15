import Welcome from 'components/Welcome'

import Log from 'components/Log'
import Entry from 'components/Entry'
import WeighIn from 'components/Entry/WeighIn'

import FoodFind from 'components/FoodFind'
import FoodSearch from 'components/FoodFind/Search'
import FoodFavorites from 'components/FoodFind/Favorites'
import FoodCustom from 'components/FoodFind/Custom'
import FoodRecipes from 'components/FoodFind/Recipes'

import WorkoutFind from 'components/WorkoutFind'
import WorkoutPreset from 'components/WorkoutFind/WorkoutPreset'

import Cache from 'components/Dev/FoodCache'
import Entries from 'components/Dev/Entries'
import LocalStorage from 'components/Dev/LocalStorage'

export default [
  // ========== REDIRECTS
  {
    // TODO: change this
    name: 'settings',
    path: '/settings',
    redirect: { name: 'welcome' },
  },
  {
    // TODO: change this
    name: 'profile',
    path: '/profile',
    redirect: { name: 'log' },
  },
  {
    name: 'welcome',
    path: '/welcome',
    component: Welcome,
    meta: { title: 'Welcome' },
  },
  {
    name: 'root',
    path: '',
    redirect: { name: 'log' },
  },

  // =========== MAIN PAGES
  {
    name: 'log',
    path: '/log',
    component: Log,
    meta: {
      title: 'Log',
      sidebar: true,
    },
  },
  {
    name: 'entry',
    path: '/entry/:uuid',
    component: Entry,
    props: true,
    meta: {
      title: 'Edit Log Entry', // TODO: replace with relevant entry type
    },
  },
  {
    name: 'newFood',
    path: '/food/new/:foodSource/:foodID',
    component: Entry,
    props: true,
    meta: {
      title: 'Food', // TODO: replace with food title?
      backMode: 'history',
    },
  },
  {
    name: 'weighin',
    path: '/weighin',
    component: WeighIn,
    meta: { title: 'Weigh in' },
  },
  {
    name: 'food',
    path: '/food',
    component: FoodFind,
    redirect: { name: 'foodSearch' },
    meta: {
      title: 'Food',
      sidebar: true,
      backMode: 'history',
    },
    children: [
      {
        name: 'foodSearch',
        path: 'search/:query?',
        component: FoodSearch,
        props: true,
        meta: {
          title: 'Food',
          // sidebar: true,
        },
      },
      {
        name: 'foodFavorites',
        path: 'favorites',
        component: FoodFavorites,
        meta: {
          title: 'Food',
          // sidebar: true,
        },
      },
      {
        name: 'foodCustom',
        path: 'custom',
        component: FoodCustom,
        meta: {
          title: 'Food',
          // sidebar: true,
        },
      },
      {
        name: 'foodRecipes',
        path: 'recipes',
        component: FoodRecipes,
        meta: {
          title: 'Food',
          // sidebar: true,
        },
      },
    ],
  },
  {
    name: 'workout',
    path: '/workout',
    component: WorkoutFind,
    meta: {
      title: 'Workouts',
      // sidebar: true,
    },
  },
  {
    name: 'workoutPreset',
    path: '/workout/:uuid',
    component: WorkoutPreset,
    props: true,
    meta: {
      title: 'Edit workout',
      backMode: 'history',
    },
  },

  {
    name: 'devCache',
    path: '/cache',
    component: Cache,
    meta: { title: 'Cache' },
  },
  {
    name: 'devEntries',
    path: '/entries',
    component: Entries,
    meta: { title: 'Entries' },
  },
  {
    name: 'devLocalStorage',
    path: '/localStorage',
    component: LocalStorage,
    meta: { title: 'localStorage' },
  },
]