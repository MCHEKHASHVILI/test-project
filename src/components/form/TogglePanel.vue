<script setup lang="ts">
import { ref, computed } from 'vue'
import IconLoader from '@/components/shared/IconLoader.vue'
const props = defineProps<{
  panel: { id: number; title: string; icons: string[]; opened: boolean },
  selected: boolean,
  disabled: boolean,
  default: boolean,
}>()

const iconName = computed(() => {
  if (props.disabled) return props.panel.icons[0]
  if (props.selected) return props.panel.icons[1]
  return props.panel.icons[0]
})

const numberIConClass = computed(() => {
  const defaultClass = 'text-[28px] transform duration-300 transition-all ease-out'
  if (props.selected) return `${defaultClass} text-purple-900`
  if (props.disabled) return `${defaultClass} text-grayscale-400`
  if (props.default) return `${defaultClass} text-purple-800`
})

const titleClass = computed(() => {
  const defaultClass = 'text-heading-3 leading-6 transform duration-300 transition-all ease-out'
  if (props.selected) return `${defaultClass} text-purple-800`
  if (props.disabled) return `${defaultClass} text-grayscale-400`
  if (props.default) return `${defaultClass} text-purple-800`
})

const arrowClass = computed(() => {
  var defaultClass = 'text-[28px] transform duration-300 transition-all ease-out'
  if (props.selected) defaultClass = `${defaultClass} text-purple-800`
  if (props.disabled) defaultClass = `${defaultClass} text-grayscale-400`
  if (props.default) defaultClass = `${defaultClass} text-purple-800`
  if (props.panel.opened) defaultClass = `${defaultClass} -rotate-180`
  return defaultClass
})

/**
 * Transition of Panels
 */
const onEnter = (el: Element) => {
  const htmlEl = el as HTMLElement

  const fullMargin = getComputedStyle(htmlEl).marginTop

  htmlEl.style.height = '0'
  htmlEl.style.marginTop = '0'
  htmlEl.style.opacity = '0'

  htmlEl.offsetHeight

  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  htmlEl.style.marginTop = fullMargin
  htmlEl.style.opacity = '1'
}

const onAfterEnter = (el: Element) => {
  ; (el as HTMLElement).style.height = 'auto'
}

const onLeave = (el: Element) => {
  const htmlEl = el as HTMLElement

  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  htmlEl.style.marginTop = getComputedStyle(htmlEl).marginTop

  htmlEl.offsetHeight

  htmlEl.style.height = '0'
  htmlEl.style.marginTop = '0'
  htmlEl.style.opacity = '0'
}
</script>
<template>
  <div flex="w-full flex flex-col justify-between">
    <button class="w-full flex flex-row items-center justify-between cursor-pointer" @click="$emit('toggle', panel.id)">
      <div class="w-full flex flex-row items-center justify-start space-x-2">
        <div class="w-full flex flex-row items-center justify-start space-x-2">
          <Transition enter-active-class="duration-300 ease-out overflow-hidden" enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100" leave-active-class="duration-300 ease-in overflow-hidden"
            leave-from-class="opacity-100" leave-to-class="opacity-0 max-h-0">
            <IconLoader :name="iconName" :class="numberIConClass" />
          </Transition>
          <h3 :class="titleClass" v-text="panel.title" />
        </div>
        <IconLoader name="arrow" :class="arrowClass" />
      </div>
    </button>
    <Transition @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
      <div v-if="panel.opened" class="mt-4.5 overflow-hidden transition-[height,opacity] duration-300 ease-in-out">
        <slot />
      </div>
    </Transition>
  </div>
</template>
