import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    userInfoReadyCallback: null
  },
  // mutations: {
  //   increment: (state) => {
  //     state.count += 1
  //   },
  //   decrement: (state) => {
  //     state.count -= 1
  //   }
  // }
})
