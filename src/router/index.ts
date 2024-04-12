import SignInView from '@/views/SignInView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import UserView from '@/views/User/UserView.vue'
import BookView from '@/views/Book/BookView.vue'
import AddUserView from '@/views/User/AddUserView.vue'
import AddBookView from '@/views/Book/AddBookView.vue'
import { useAuthStore } from '@/stores/auth.store'
import ForbiddenView from '@/views/ForbiddenView.vue'
import DetailUserView from '@/views/User/DetailUserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'users',
          name: 'user',
          component: UserView,
        },
        {
          path: 'users/add',
          name: 'user:add',
          component: AddUserView
        },
        {
          path: 'users/:id',
          name: 'user:id',
          component: DetailUserView
        },
        {
          path: 'books',
          name: 'book',
          component: BookView
        },
        {
          path: 'books/add',
          name: 'book:add',
          component: AddBookView
        }
      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    }
  ]
})

router.beforeEach(async (to, from, next: Function) => {
  // const publicPages = ['/signin']
  // const authRequired = !publicPages.includes(to.path)
  // const auth = useAuthStore()
  // if (authRequired && !auth.user) {
  //   alert("Failed! Please signin again")
  //   auth.returnUrl = to.fullPath
  //   return '/signin'
  // }

  // if (to.path === '/signin' && auth.user) {
  //   return '/'
  // }
  const auth = useAuthStore()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.user) {
      next({ name: 'signin' })
    } else if (auth.user.role === 'user') {
      next({ name: 'forbidden' })
    } else next()
  } else {
    next()
  }
})

export default router
