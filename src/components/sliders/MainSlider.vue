<script setup lang="ts">
import { ref } from 'vue';
import AppLink from '@/components/shared/AppLink.vue';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
import '@splidejs/splide/css';
import ArrowLeftSVGUrl from '@/assets/svg/ArrowLeft.svg?url'
import ArrowRightSVGUrl from '@/assets/svg/ArrowRight.svg?url'
import { useRouter } from 'vue-router';
const router = useRouter()
const activeIndex = ref(0);
const onMove = (splide: any, newIndex: any) => {
    activeIndex.value = newIndex;
};
const options = {
    rewind: true,
    arrows: true,
    autoplay: true,
    pagination: true,
    interval: 3000,
    transition: 500,
    easing: 'ease-out',
}

const slides = [
    {
        id: 1,
        image: 'slider1',
        alt: 'Start learning something new today',
        title: 'Start learning something new today',
        description:
            'Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.',
        button: {
            title: 'Browse Courses',
            url: router.resolve({ name: 'courses' }),
        },
    },
    {
        id: 2,
        image: 'slider2',
        alt: 'Pick up where you left off',
        title: 'Pick up where you left off',
        description:
            'Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.',
        button: {
            title: 'Start Learning',
            url: router.resolve({ name: 'courses' }),
        },
    },
    {
        id: 3,
        image: 'slider3',
        alt: 'Learn together, grow faster',
        title: 'Learn together, grow faster',
        description:
            'Join a community of learners, connect with instructors, and stay motivated as you build new skills and advance your knowledge.',
        button: {
            title: 'Learn More',
            url: router.resolve({ name: 'courses' }),
        },
    },
]

const getImageUrl = (name: any) => {
    return new URL(`../../assets/img/${name}.png`, import.meta.url).href
}

const onPaginationMounted = (splide: any, data: any) => {
    data.list.classList.add('splide__pagination--custom')
    data.items.forEach((item: any) => {
        item.button.classList.add('custom-pagination-button')
    })
}
</script>

<template>
    <Splide :options="options" :has-track="false" class="relative rounded-[30px] h-105"
        @splide:pagination:mounted="onPaginationMounted" @splide:move="onMove">
        <SplideTrack class="h-105 rounded-[30px]">
            <SplideSlide v-for="slide in slides" :key="slide.id" class="h-105">
                <div class="relative h-105 w-full overflow-hidden p-12 gap-3">
                    <img :src="getImageUrl(slide.image)" :alt="slide.alt"
                        class="rounded-[30px] absolute inset-0 h-full w-full object-cover" />
                    <div class="relative flex flex-col items-start justify-between gap-10">
                        <h1 class="text-grayscale-50 text-display-xl" v-text="slide.title" />
                        <p class="text-grayscale-50 text-body-light-xl" v-text="slide.description" />
                        <AppLink v-if="slide.button" :to="slide.button.url">
                            <button class="btn-primary-lg text-button-m" v-text="slide.button.title" />
                        </AppLink>
                    </div>
                </div>
            </SplideSlide>
        </SplideTrack>
        <div class="absolute top-77.75 w-full flex inset-0">
            <div class="relative h-full w-full flex items-center justify-content-center">
                <div class="absolute inset-0 flex grow items-center">
                    <ul class="splide__pagination splide__pagination--custom w-full flex grow items-center gap-3" />
                </div>
                <div class="splide__arrows">
                    <button class="splide__arrow splide__arrow--prev">
                        <div class="bg-grayscale-50 w-[43.88px] aspect-square rounded-full"
                            :class="{ 'bg-grayscale-500/50': activeIndex === 0 }" :style="{
                                'mask-image': `url(&quot;${ArrowLeftSVGUrl}&quot;)`,
                                '-webkit-mask-image': `url(&quot;${ArrowLeftSVGUrl}&quot;)`,
                                'mask-repeat': 'no-repeat',
                                'mask-position': 'center',
                                'mask-size': 'contain',
                                '-webkit-mask-repeat': 'no-repeat',
                                '-webkit-mask-position': 'center',
                                '-webkit-mask-size': 'contain',
                            }"></div>
                    </button>
                    <button class="splide__arrow splide__arrow--next">
                        <div class="bg-grayscale-50 w-[43.88px] aspect-square rounded-full"
                            :class="{ 'bg-grayscale-500/50': activeIndex === (slides.length - 1) }" :style="{
                                'mask-image': `url(&quot;${ArrowRightSVGUrl}&quot;)`,
                                '-webkit-mask-image': `url(&quot;${ArrowRightSVGUrl}&quot;)`,
                                'mask-repeat': 'no-repeat',
                                'mask-position': 'center',
                                'mask-size': 'contain',
                                '-webkit-mask-repeat': 'no-repeat',
                                '-webkit-mask-position': 'center',
                                '-webkit-mask-size': 'contain',
                            }"></div>
                    </button>
                </div>
            </div>
        </div>
    </Splide>
</template>
<style scoped>
:deep(.splide__pagination--custom) {
    position: absolute;
    top: 20%;
    transform: translateY(-50%);
    left: 180px;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0;
    margin: 0;
    height: 54px;
    width: 1206px;
}

:deep(.splide__pagination [role="presentation"]) {
    margin: 0;
    padding: 0;
    width: 57px;
    height: 16px !important;
}

:deep(.custom-pagination-button) {
    opacity: 50%;
    border: none;
    border-radius: 999px;
    width: 57px;
    height: 8px;
    position: relative;
    margin: 0;
    padding: 0;
}

:deep(.custom-pagination-button.is-active) {
    transform: none !important;
    opacity: 100%;
}

:deep(.splide__arrows) {
    position: absolute;
    right: 54px;
    width: 152px;
    top: 20%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: row-reverse;
    gap: 34px;
    justify-content: space-between;
    height: 54px;
}

:deep(.splide__arrow) {
    background-color: transparent;
    border: none;
    width: 43.88px;
    height: 43.88px;
}
</style>
