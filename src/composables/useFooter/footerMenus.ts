import router from '@/router'

const footerMenus = [
  {
    title: 'Explore',
    menu: [
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
        url: '',
        icon: '',
      },
      {
        title: 'Log In',
        url: '',
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
