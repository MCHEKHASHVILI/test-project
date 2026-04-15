import { computed } from 'vue'
/**
 * useIcon – lightweight composable for working with the icon registry.
 *
 * Examples:
 *   const { iconNames, hasIcon } = useIcon()
 *   hasIcon('calendar')  // true
 *   iconNames.value      // ['api', 'arrow-right', ...]
 */

const ICON_NAMES = [
  // Row 1
  'calendar',
  'clock',
  'contacts',
  'location',
  'bug',
  'sun',
  // Row 2
  'moon',
  'monitor',
  'warning',
  'yin-yang',
  'circle-fill',
  'circle',
  'circle-check',
  // Row 3
  '1-circle',
  'up-circle',
  '2-circle',
  's-circle',
  'dollar-circle',
  '3-circle',
  // Row 4
  'chevron-down',
  'eye',
  'eye-off',
  'check-sm',
  'check-lg',
  'code',
  // Row 5
  'arrow-right',
  'api',
  'image',
  'lightbulb',
  'edit',
  'email',
  'phone',
  // Row 6
  'check',
  'refresh',
  'star',
] as const

export type IconName = (typeof ICON_NAMES)[number]

export function useIcon() {
  const iconNames = computed(() => [...ICON_NAMES].sort())
  const hasIcon = (name: string): name is IconName =>
    (ICON_NAMES as readonly string[]).includes(name)

  return { iconNames, hasIcon, ICON_NAMES }
}
