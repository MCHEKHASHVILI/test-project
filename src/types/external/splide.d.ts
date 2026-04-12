// src/types/external/splide.d.ts
declare module '@splidejs/vue-splide' {
  import { DefineComponent } from 'vue'

  // Defines the expected exports as valid components to bypass the TS7016 error
  export const Splide: DefineComponent<any, any, any>
  export const SplideSlide: DefineComponent<any, any, any>
  export const SplideTrack: DefineComponent<any, any, any>

  // Default export if you use app.use(VueSplide)
  const VueSplide: {
    install: (app: any) => void
  }
  export default VueSplide
}
