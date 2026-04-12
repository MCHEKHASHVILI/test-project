/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.css'

declare module '@splidejs/splide/css'

// Add this:
declare module '@splidejs/vue-splide' {
  import type { DefineComponent, Plugin } from 'vue'
  export const Splide: DefineComponent<any, any, any>
  export const SplideSlide: DefineComponent<any, any, any>
  export const SplideTrack: DefineComponent<any, any, any>
  export const VueSplide: Plugin
}
