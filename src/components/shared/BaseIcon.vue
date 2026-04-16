<script setup lang="ts">
import IconSetSvg from '@/assets/svg/Icon_Set.svg?raw'
import { computed } from 'vue'

/**
 * BaseIcon – renders a single icon from Icon_Set.svg by cropping its viewBox.
 *
 * Each entry in ICON_MAP defines the (x, y, w, h) crop window inside the
 * 364×369 master sprite.  The component injects that window as the <svg>
 * viewBox so the browser shows only that icon, regardless of the width/height
 * props you pass in.
 *
 * Usage:
 *   <BaseIcon name="calendar" width="24" height="24" />
 *   <BaseIcon name="star"     :width="32" :height="32" class="text-yellow-500" />
 */

interface IconDef {
    x: number
    y: number
    w: number
    h: number
}

/**
 * Icon registry – (x, y, w, h) crop windows inside the 364×369 sprite.
 * The sprite is laid out in a 7-column × 6-row grid.
 * Column centres: ~32, ~82, ~132, ~182, ~232, ~283, ~332
 * Row centres:    ~32, ~93, ~156, ~217, ~276, ~336
 * Every icon fits inside a 22×22 box.
 */
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

const props = withDefaults(
    defineProps<{
        name: string
        width?: number | string
        height?: number | string
        color?: string
        title?: string
    }>(),
    {
        width: 20,
        height: 20,
    }
)

const icon = computed(() => ICON_MAP[props.name])

/**
 * Parse the inner content of Icon_Set.svg – everything between <svg …> and </svg>.
 * We strip the outer <svg> wrapper and re-render only the paths/groups, so the
 * host <svg> element controls viewBox/dimensions.
 */
const svgInner = computed(() => {
    const match = IconSetSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)
    return match ? match[1] : ''
})

/**
 * Build a viewBox string from the icon definition, adding a small 1px padding
 * so stroked paths on the edge are not clipped.
 */
const viewBox = computed(() => {
    if (!icon.value) return '0 0 20 20'
    const pad = 1
    const { x, y, w, h } = icon.value
    return `${x - pad} ${y - pad} ${w + pad * 2} ${h + pad * 2}`
})
</script>

<template>
    <svg v-if="icon" :width="width" :height="height" :viewBox="viewBox" :aria-label="title ?? name"
        :role="title ? 'img' : 'presentation'" xmlns="http://www.w3.org/2000/svg" fill="none" v-html="svgInner" />
    <span v-else :style="{ display: 'inline-block', width: `${width}px`, height: `${height}px` }"
        :title="`Unknown icon: ${name}`" />
</template>