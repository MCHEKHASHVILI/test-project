import HomeView from '@/pages/HomeView.vue'
import CoursesView from '@/pages/CoursesView.vue'
import CourseDetailsView from '@/pages/CourseDetailsView.vue'

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/catalog', name: 'courses', component: CoursesView },
    { path: '/catalog/:id', name: 'courseDetails', component: CourseDetailsView },
];

export default routes