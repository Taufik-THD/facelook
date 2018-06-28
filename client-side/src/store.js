import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: '',
    detailPost: ''
  },
  mutations: {
    profile (state, profileData) {
      state.profile = profileData.users[0]
    },
    post (state, postData) {
      state.detailPost = postData
    }
  },
  actions: {
    getUserDetail ({ commit }, payload) {
      commit('profile', payload)
    },
    postData ({ commit }, payload) {
      commit('post', payload)
    }
  }
})
