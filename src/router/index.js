import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'

import Departments from '@/components/Departments.vue'
import Questions from '@/components/Questions.vue'
import Ratings from '@/components/Ratings.vue'
import SignUp from '@/components/User/SignUp.vue'
import SignIn from '@/components/User/SignIn.vue'
import Profile from '@/components/User/Profile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Departments,
      beforeEnter: AuthGuard
    },
    {
      path: '/ratings/:id/new',
      name: 'questions',
      props: true,
      component: Questions
    },
    {
      path: '/ratings/:id',
      name: 'ratings',
      props: true,
      component: Ratings
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
