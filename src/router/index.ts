import SignInView from '@/views/SignInView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import UserView from '@/views/User/UserView.vue'
import BookView from '@/views/Book/BookView.vue'
import AddUserView from '@/views/User/AddUserView.vue'
import AddBookView from '@/views/Book/AddBookView.vue'
import { useAuthStore } from '@/stores/auth.store'

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
      component: HomeView,
      children: [
        {
          path: 'users',
          name: 'user',
          component: UserView,
        },
        {
          path: 'users/add',
          name: 'user-add',
          component: AddUserView
        },
        {
          path: 'books',
          name: 'book',
          component: BookView
        },
        {
          path: 'books/add',
          name: 'book-add',
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

router.beforeEach(async (to) => {
  const publicPages = ['/signin']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if (authRequired && !auth.user) {
    alert("Failed! Please signin again")
    auth.returnUrl = to.fullPath
    return '/signin'
  }

  if (to.path === '/signin' && auth.user) {
    return '/'
  }
})

export default router
