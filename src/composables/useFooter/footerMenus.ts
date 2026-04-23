import router from '@/router'
const footerMenus = [
  {
    title: 'explore',
    menu: [
      {
        title: 'enrolled courses',
        url: router.resolve({ name: 'action.modal', params: { name: 'EnrolledCoursesModal' } }),
        icon: '',
        authRequired: false,
        guestRequired: false,
      },
      {
        title: 'browse courses',
        url: router.resolve({ name: 'courses' }),
        icon: '',
        authRequired: false,
        guestRequired: false,
      },
    ],
  },
  {
    title: 'Account',
    menu: [
      {
        title: 'my profile',
        url: router.resolve({ name: 'action.modal', params: { name: 'ProfileModal' } }),
        icon: '',
        authRequired: true,
        guestRequired: false,
      },
      {
        title: 'sign up',
        url: router.resolve({ name: 'action.modal', params: { name: 'RegisterModal' } }),
        icon: '',
        authRequired: false,
        guestRequired: true,
      },
      {
        title: 'log in',
        url: router.resolve({ name: 'action.modal', params: { name: 'LogInModal' } }),
        icon: '',
        authRequired: false,
        guestRequired: true,
      },
    ],
  },
  {
    title: 'Contact',
    menu: [
      {
        title: 'contact@company.com',
        url: 'mailto:contact@companyinfo.com',
        icon: 'mail',
        authRequired: false,
        guestRequired: false,
      },
      {
        title: '(+995) 555 111 222',
        url: 'tel:+995555111222',
        icon: 'phone',
        authRequired: false,
        guestRequired: false,
      },
      {
        title: 'Aghmashenebeli St.115',
        url: 'https://maps.app.goo.gl/DwQMmEwNCcDBUkiZA',
        icon: 'map_pin',
        authRequired: false,
        guestRequired: false,
      },
    ],
  },
]

export default footerMenus
