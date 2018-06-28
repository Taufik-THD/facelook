import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Timeline from './views/Timeline.vue'
import Profile from './views/Profile.vue'
import Post from './views/Post.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: Timeline
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    }
  ]
})
