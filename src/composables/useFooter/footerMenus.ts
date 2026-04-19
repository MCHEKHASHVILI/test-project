import router from '@/router'

const footerMenus = [
  {
    title: 'Explore',
    menu: [
      {
        title: 'Enrolled Courses',
        url: router.resolve({ name: 'action.modal', params: { name: 'EnrolledCoursesModal' } }),
        icon: '',
      },
      {
        title: 'Browse Courses',
        url: router.resolve({ name: 'courses' }),
        icon: '',
      },
    ],
  },
  {
    title: 'Account',
    menu: [
      {
        title: 'Sign Up',
        url: router.resolve({ name: 'action.modal', params: { name: 'RegisterModal' } }),
        icon: '',
      },
      {
        title: 'Log In',
        url: router.resolve({ name: 'action.modal', params: { name: 'LogInModal' } }),
        icon: '',
      },
    ],
  },
  {
    title: 'Contact',
    menu: [
      {
        title: 'contact@company.com',
        url: 'mailto:contact@companyinfo.com',
        icon: 'Envelope',
      },
      {
        title: '(+995) 555 111 222',
        url: 'tel:+995555111222',
        icon: 'Phone',
      },
      {
        title: 'Aghmashenebeli St.115',
        url: 'https://maps.app.goo.gl/DwQMmEwNCcDBUkiZA',
        icon: 'Point',
      },
    ],
  },
]

export default footerMenus
