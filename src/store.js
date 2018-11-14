import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import config from './config'

Vue.use(Vuex)

const state = {
  departments: null,
  user: null,
  loading: false,
  error: null
}

const getters = {
  filteredDepartments: (state) => (search) => {
    return state.departments.filter(department => department.name.toLowerCase().indexOf(search.toLowerCase()) >= 0)
  },
  getDepartmentById: (state) => (id) => {
    return state.departments.find(item => item.id === id)
  },
  reversedRatings: (state) => (id) => {
    let department = state.departments.find(item => item.id === id)
    return department.ratings.reverse()
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  },
  user (state) {
    return state.user
  }
}

const mutations = {
  addRating (state, payload) {
    const department = this.getters.getDepartmentById(payload.departmentId)
    department.ratings.push(payload.rating)
  },
  setUser (state, payload) {
    state.user = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  },
  setDepartments (state, payload) {
    state.departments = payload
  }
}

const actions = {
  fetchUserData ({ commit, getters }) {
    const userId = getters.user.id
    firebase.database().ref().child(userId).once('value')
      .then(data => {
        // Fetch departments
        const userData = data.val()
        const departments = []

        for (let departmentKey in userData) {
          // Fetch ratings
          const ratings = []
          const userDataRatings = userData[departmentKey].ratings
          for (let ratingKey in userDataRatings) {
            ratings.push({
              id: ratingKey,
              comment: userDataRatings[ratingKey].comment,
              date: userDataRatings[ratingKey].date,
              properties: userDataRatings[ratingKey].properties
            })
          }

          departments.push({
            id: departmentKey,
            name: userData[departmentKey].name,
            ratings: ratings
          })
        }
        commit('setDepartments', departments)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  addRating ({ commit, getters }, payload) {
    const departmentId = payload.departmentId
    const rating = payload.rating
    const userId = getters.user.id
    commit('setLoading', true)
    commit('clearError')
    firebase.database().ref().child(userId).child(departmentId).child('ratings').push(rating)
      .then(() => {
        console.log('Finish add rating', rating)
        commit('setLoading', false)
        commit('addRating', payload)
      })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
  },
  signUserUp ({ commit, getters }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            email: user.email
          }
          commit('setUser', newUser)

          const departments = {}
          config.DEPARTMENTS.map((item, i) => {
            const newDepartmentKey = firebase.database().ref().child(newUser.id).push().key
            departments[newDepartmentKey] = { name: item, ratings: {} }
          })
          firebase.database().ref().child(newUser.id).update(departments)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
  },
  signUserIn ({ commit, dispatch }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            email: user.email
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
  },
  autoSignIn ({ commit }, payload) {
    commit('setUser', {
      id: payload.uid,
      email: payload.email
    })
  },
  clearError ({ commit }) {
    commit('clearError')
  },
  logout ({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
    commit('setDepartments', null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
