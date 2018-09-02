import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App.vue'

import Header from './components/Header.vue'
import AlertComp from './components/Shared/Alert.vue'
import router from './router'

import store from './store'
import * as firebase from 'firebase'

import moment from 'vue-moment'
import VueProgressBar from 'vue-progressbar'
import 'vuetify/dist/vuetify.min.css'
import * as svgicon from 'vue-svgicon'
import './icons'
import Raters from 'vue-rate-it'

Vue.use(moment)

Vue.use(Vuetify, {
  theme: {
    primary: '#00bfa5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})
Vue.use(VueProgressBar, {color: '#ffffff'})

Vue.use(svgicon, {
  tagName: 'svgicon'
})

Vue.component('app-header', Header)
Vue.component('app-alert', AlertComp)
Vue.component('image-rating', Raters.ImageRating)

Vue.config.debug = true
Vue.config.devtools = true

// Initialize Firebase
let config = {
  apiKey: 'AIzaSyDGaUw9CtvLKcEQzdHYDstzTuyTVGE8YEE',
  authDomain: 'auditor-614b8.firebaseapp.com',
  databaseURL: 'https://auditor-614b8.firebaseio.com',
  projectId: 'auditor-614b8',
  storageBucket: 'auditor-614b8.appspot.com',
  messagingSenderId: '547059095939'
}

let vm = new Vue({
  el: '#app',
  store: store,
  render: h => h(App),
  router: router,
  created () {
    firebase.initializeApp(config)

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        if (this.$store.state.departments === null) {
          this.$store.dispatch('fetchUserData')
        }
      }
    })
  }
})

global.vm = vm
