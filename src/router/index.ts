import SignInView from '@/views/SignInView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    }
  ]
})

export default router
