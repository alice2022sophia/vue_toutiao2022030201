import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const userToken = 'userToken'
export default new Vuex.Store({
  state: {
    user: getItem(userToken)
  },
  getters: {
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(userToken, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
