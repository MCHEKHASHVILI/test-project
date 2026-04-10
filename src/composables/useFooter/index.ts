import footerMenus from './footerMenus'
import socialLinks from './socialLinks'
import { breadCrumbs, separator } from './breadCrumbs'
function useFooter() {
  return {
    breadCrumbs,
    separator,
    socialLinks,
    footerMenus,
  }
}

export { useFooter }
