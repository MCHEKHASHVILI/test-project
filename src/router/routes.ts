import Home from '@/pages/Home.vue'
import Courses from '@/pages/Courses.vue'
import Details from '@/pages/Details.vue'
import NotFound from '@/pages/NotFound.vue'
import { h } from 'vue'
import { RouterView } from 'vue-router'

const routes = [
  {
    path: '/',
    component: { render: () => h(RouterView) },
    meta: { breadcrumb: 'Home' },
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'catalog',
        component: { render: () => h(RouterView) },
        meta: { breadcrumb: 'Browse' },
        children: [
          {
            path: '',
            name: 'courses',
            component: Courses,
          },
          {
            path: ':id',
            name: 'details',
            component: Details,
            meta: { breadcrumb: 'Development' },
          },
        ],
      },
    ],
  },
  /**
   * Action Routes
   */
  {
    path: '/action/modal/:name',
    name: 'action.modal',
    component: { render: () => null },
    meta: {
      // Define the guest-only modals directly in the route
      guestOnlyModals: ['LogInModal', 'RegisterModal'],
    },
  },
  /**
   * Page not Found 404
   */
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

export default routes
