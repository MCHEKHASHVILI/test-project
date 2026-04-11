import HomeView from '@/pages/HomeView.vue'
import CoursesView from '@/pages/CoursesView.vue'
import CourseDetailsView from '@/pages/CourseDetailsView.vue'
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
        component: HomeView,
      },
      {
        path: 'catalog',
        component: { render: () => h(RouterView) },
        meta: { breadcrumb: 'Browse' },
        children: [
          {
            path: '',
            name: 'courses',
            component: CoursesView,
          },
          {
            path: ':id',
            name: 'details',
            component: CourseDetailsView,
            meta: { breadcrumb: 'Development' },
          }
        ]
      }
    ]
  }
]

export default routes
