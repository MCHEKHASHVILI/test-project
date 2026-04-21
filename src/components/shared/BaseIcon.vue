<script setup lang="ts">
import IconSetSvg from '@/assets/svg/Icon_Set.svg?raw'
import { computed } from 'vue'

/**
 * BaseIcon – Hybrid Icon Component
 * 1. Supports "Sprite Mode": Crops specific icons from Icon_Set.svg using ICON_MAP.
 * 2. Supports "Standalone Mode": Automatically loads any .svg file from @/assets/svg/
 *    based on the 'name' prop.
 */

interface IconDef {
  x: number
  y: number
  w: number
  h: number
}

// 1. Bulk import all standalone SVGs from the assets folder as raw strings
const standaloneIcons = import.meta.glob('@/assets/svg/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const ICON_MAP: Record<string, IconDef> = {
  // ── Row 1 ─────────────────────────────────────────────
  calendar: { x: 22, y: 20, w: 20, h: 22 },
  clock: { x: 72, y: 21, w: 20, h: 21 },
  contacts: { x: 119, y: 24, w: 22, h: 17 },
  location: { x: 172, y: 21, w: 20, h: 22 },
  bug: { x: 221, y: 20, w: 24, h: 24 },
  sun: { x: 270, y: 20, w: 26, h: 26 },
  // ── Row 2 ─────────────────────────────────────────────
  moon: { x: 23, y: 82, w: 22, h: 22 },
  monitor: { x: 72, y: 84, w: 20, h: 18 },
  warning: { x: 120, y: 82, w: 16, h: 14 },
  'yin-yang': { x: 172, y: 84, w: 26, h: 24 },
  'circle-fill': { x: 224, y: 84, w: 16, h: 18 },
  circle: { x: 272, y: 84, w: 18, h: 16 },
  'circle-check': { x: 322, y: 84, w: 18, h: 18 },
  // ── Row 3 ─────────────────────────────────────────────
  '1-circle': { x: 22, y: 144, w: 24, h: 24 },
  'up-circle': { x: 71, y: 143, w: 26, h: 26 },
  '2-circle': { x: 121, y: 143, w: 26, h: 26 },
  's-circle': { x: 171, y: 143, w: 26, h: 26 },
  'dollar-circle': { x: 221, y: 143, w: 26, h: 26 },
  '3-circle': { x: 271, y: 143, w: 26, h: 26 },
  // ── Row 4 ─────────────────────────────────────────────
  'chevron-down': { x: 22, y: 208, w: 10, h: 8 },
  eye: { x: 70, y: 208, w: 21, h: 16 },
  'eye-off': { x: 120, y: 207, w: 22, h: 14 },
  'check-sm': { x: 172, y: 209, w: 12, h: 8 },
  'check-lg': { x: 220, y: 207, w: 16, h: 12 },
  code: { x: 319, y: 207, w: 26, h: 20 },
  // ── Row 5 ─────────────────────────────────────────────
  'arrow-right': { x: 22, y: 267, w: 20, h: 16 },
  api: { x: 70, y: 266, w: 22, h: 20 },
  image: { x: 121, y: 267, w: 22, h: 18 },
  lightbulb: { x: 172, y: 264, w: 18, h: 24 },
  edit: { x: 224, y: 268, w: 14, h: 16 },
  email: { x: 271, y: 267, w: 22, h: 16 },
  phone: { x: 321, y: 265, w: 20, h: 20 },
  // ── Row 6 ─────────────────────────────────────────────
  check: { x: 22, y: 328, w: 20, h: 14 },
  refresh: { x: 72, y: 326, w: 24, h: 22 },
  star: { x: 122, y: 324, w: 24, h: 24 },
}

const props = defineProps<{
  name: string
  width?: number | string
  height?: number | string
  title?: string
}>()

const isSpriteIcon = computed(() => props.name in ICON_MAP)

/**
 * Extracts inner content and viewBox from either the sprite or standalone file
 */
const iconData = computed(() => {
  let rawContent = ''
  let foundViewBox: string | null = null

  if (isSpriteIcon.value) {
    const match = IconSetSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)
    rawContent = match ? match[1] : '' // Ensure you grab match[1]
  } else {
    const path = `/src/assets/svg/${props.name}.svg`
    const fileString = standaloneIcons[path]

    if (fileString) {
      const vbMatch = fileString.match(/viewBox="([^"]+)"/)
      if (vbMatch) foundViewBox = vbMatch[1] // Ensure you grab vbMatch[1]

      const innerMatch = fileString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)
      rawContent = innerMatch ? innerMatch[1] : ''
    }
  }

  // IMPROVED REPLACEMENT LOGIC:
  // 1. Replace hex strokes with currentColor
  // 2. Replace hex fills with currentColor
  // 3. Optional: If the icon is "invisible" because it's only fill="none",
  //    we convert those to currentColor too if they aren't masks.
  const cleanedContent = rawContent
    .replace(/stroke="#[a-zA-Z0-9]+"/g, 'stroke="currentColor"')
    .replace(/fill="#[a-zA-Z0-9]+"/g, 'fill="currentColor"')
  // This specific Stars icon uses fill="white" in the mask.
  // We must NOT replace white inside masks, or the mask breaks.
  // If the stars are still invisible, try adding:
  // .replace(/fill="none"/g, 'fill="currentColor"')

  return { content: cleanedContent, viewBox: foundViewBox }
})

/**
 * Calculates viewBox: Manual crop for sprite icons, extracted VB for standalone.
 */
const viewBox = computed(() => {
  if (isSpriteIcon.value) {
    const pad = 1
    const { x, y, w, h } = ICON_MAP[props.name]
    return `${x - pad} ${y - pad} ${w + pad * 2} ${h + pad * 2}`
  }
  return iconData.value.viewBox || '0 0 24 24'
})
</script>

<template>
  <svg
    v-if="iconData.content"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-label="title ?? name"
    :role="title ? 'img' : 'presentation'"
    xmlns="http://w3.org"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    class="base-icon"
    v-html="iconData.content"
  />
  <span
    v-else
    :style="{
      display: 'inline-block',
      width: width ? `${width}px` : '1.25rem',
      height: height ? `${height}px` : '1.25rem',
    }"
    :title="`Unknown icon: ${name}`"
  />
</template>

<style scoped>
.base-icon {
  /* Responsive sizing logic: props take priority, else fallback to 1.25rem (w-5) */
  width: v-bind("width ? 'auto' : '1.25rem'");
  height: v-bind("height ? 'auto' : '1.25rem'");
  stroke: currentColor;
  display: inline-block;
  vertical-align: middle;
}
</style>
