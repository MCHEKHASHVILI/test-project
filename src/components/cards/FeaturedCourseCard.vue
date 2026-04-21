<script setup lang="ts">
import AvgRating from '@/components/shared/AvgRating.vue'
import AppLink from '@/components/shared/AppLink.vue'
import { Course } from '@/types'
defineProps<{ data: Course }>()
</script>
<template>
    <div class="card card-dashboard flex flex-col justify-between gap-6">
        <div class="flex flex-col justify-between gap-4 h-full">
            <img :src="data.image" :alt="data.title" />
            <div class="flex flex-row justify-between items-center">
                <small class="text-body-xs text-grayscale-500 capitalize text-nowrap"
                    v-text="`lecturer ${data.instructor.name}`" />
                <AvgRating :value="data.avgRating" />
            </div>
            <h3 class="text-heading-3 text-grayscale-900" v-text="data.title" />
            <p class="text-body-s leading-6 text-grayscale-500" v-text="data.description" />
        </div>
        <div class="flex flex-row items-center justify-between">
            <div class="flex flex-row items-center justify-between gap-2">
                <span
                    class="text-helper-medium tracking-normal text-grayscale-400 lowercase first-letter:capitalize">starting
                    from</span>
                <h2 class="text-heading-2 text-grayscale-900" v-text="`$${data.basePrice}`" />
            </div>
            <AppLink :to="{ name: 'details', params: { id: data.id } }"
                class="btn-primary text-button-m lowercase first-letter:capitalize " v-text="'details'" />
        </div>
    </div>
</template>