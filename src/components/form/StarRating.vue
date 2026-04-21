<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    maxRating: number
    actualRating: number
    color: string
    width: number
    height: number
    iconName: string
  }>(),
  {
    maxRating: 5,
    actualRating: 0,
    color: '#FACC15',
    width: 32,
    height: 32,
    iconName: 'star',
  },
)

// model is the committed/clicked value — synced with v-model on the parent.
// It is initialised from actualRating and kept in sync when actualRating changes externally.
const model = defineModel<number>({ default: 0 })

watch(
  () => props.actualRating,
  (val) => {
    model.value = val
  },
  { immediate: true },
)

const radioGroupName = `star-rating-${Math.random().toString(36).slice(2, 7)}`

const hoveredRating = ref<number | null>(null)

// Parse the SVG file once at setup time via ?raw import.
const svgModules = import.meta.glob<string>('@/assets/svg/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const rawSvg: string = svgModules[`/src/assets/svg/${props.iconName}.svg`] ?? ''

const viewBox = rawSvg.match(/viewBox=["']([^"']+)["']/)?.[1] ?? '0 0 50 50'

type FillRule = 'nonzero' | 'evenodd' | 'inherit'

const svgPaths: { d: string; fillRule: FillRule; clipRule: FillRule }[] = []
const pathRegex = /<path([^>]*)\/?>(?:<\/path>)?/g
let match: RegExpExecArray | null
while ((match = pathRegex.exec(rawSvg)) !== null) {
  const attrs = match[1]
  const d = attrs.match(/\bd=["']([^"']+)["']/)?.[1] ?? ''
  const fillRule = (attrs.match(/fill-rule=["']([^"']+)["']/)?.[1] ?? 'nonzero') as FillRule
  const clipRule = (attrs.match(/clip-rule=["']([^"']+)["']/)?.[1] ?? 'nonzero') as FillRule
  if (d) svgPaths.push({ d, fillRule, clipRule })
}

// effectiveRating: hover preview takes priority, otherwise fall back to
// the committed model value (not props.actualRating — those can diverge
// if the parent doesn't use v-model).
const effectiveRating = computed(() =>
  hoveredRating.value !== null ? hoveredRating.value : model.value,
)

function getPartialFill(star: number): number {
  const rating = effectiveRating.value
  if (star <= Math.floor(rating)) return 100
  if (star > Math.ceil(rating)) return 0
  return (rating % 1) * 100
}

function getFillColor(star: number): string {
  const fill = getPartialFill(star)
  if (fill === 100) return props.color
  if (fill === 0) return '#D1D1D1'
  return `url(#partial-${star}-${radioGroupName})`
}
</script>
<template>
  <div class="flex items-center gap-1" role="radiogroup" aria-label="Star rating">
    <label
      v-for="star in maxRating"
      :key="star"
      class="cursor-pointer relative block"
      :style="{ width: `${width}px`, height: `${height}px` }"
      @mouseenter="hoveredRating = star"
      @mouseleave="hoveredRating = null"
    >
      <input
        type="radio"
        :name="radioGroupName"
        :value="star"
        v-model="model"
        class="sr-only"
        :aria-label="`${star} star${star !== 1 ? 's' : ''}`"
      />

      <svg
        :viewBox="viewBox"
        :width="width"
        :height="height"
        xmlns="http://www.w3.org/2000/svg"
        class="transition-colors duration-150"
        aria-hidden="true"
      >
        <defs>
          <linearGradient :id="`partial-${star}-${radioGroupName}`" x1="0" x2="1" y1="0" y2="0">
            <stop :offset="`${getPartialFill(star)}%`" :stop-color="color" />
            <stop :offset="`${getPartialFill(star)}%`" stop-color="#D1D1D1" />
          </linearGradient>
        </defs>

        <path
          v-for="(path, i) in svgPaths"
          :key="i"
          :d="path.d"
          :fill="getFillColor(star)"
          :fill-rule="path.fillRule"
          :clip-rule="path.clipRule"
        />
      </svg>
    </label>
  </div>
</template>
