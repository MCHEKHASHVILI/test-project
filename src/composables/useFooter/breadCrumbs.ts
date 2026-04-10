/** BreadCrumbs */
interface BreadCrumbsItem {
  title: string
  isLink: boolean
  route: string
}
const breadCrumbs: BreadCrumbsItem[] = [
  {
    title: 'All Rights Reserved',
    isLink: false,
    route: '',
  },
  {
    title: 'Terms and Conditions',
    isLink: true,
    route: '#',
  },
  {
    title: 'Privacy Policy',
    isLink: true,
    route: '#',
  },
]

const separator: string = '|'

export { breadCrumbs, separator }
