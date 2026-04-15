<script setup lang="ts">
import { computed } from 'vue'
import PaginationBtn from './PaginationBtn.vue';
import BaseIcon from './BaseIcon.vue';
const props = withDefaults(
    defineProps<{
        modelValue: number
        lastPage: number
        perPage: number
        total: number
        siblingCount?: number
    }>(),
    {
        siblingCount: 1,
    }
)

const emit = defineEmits<{
    (e: 'update:modelValue', page: number): void
}>()

function changePage(page: number) {
    if (page < 1 || page > props.lastPage || page === props.modelValue) return
    emit('update:modelValue', page)
}

const pages = computed<(number | '...')[]>(() => {
    const total = props.lastPage
    const current = props.modelValue

    // Show all pages if total is small enough
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    // Near the start: show 1, 2, 3, ..., lastPage
    if (current <= 3) {
        return [1, 2, 3, '...', total]
    }

    // Near the end: show 1, ..., n-2, n-1, n
    if (current >= total - 2) {
        return [1, '...', total - 2, total - 1, total]
    }

    // Middle: show 1, ..., current, ..., lastPage
    return [1, '...', current, '...', total]
})
</script>

<template>
    <nav aria-label="Pagination" class="flex items-center gap-1">
        <PaginationBtn :disabled="modelValue === 1" aria-label="Previous page" @click="changePage(modelValue - 1)">
            <BaseIcon name="arrow-right" width="16" height="16" class="rotate-180" />
        </PaginationBtn>

        <template v-for="item in pages" :key="item">
            <span v-if="item === '...'"
                class="w-10 h-10 flex items-center justify-center text-sm text-indigo-500 select-none">
                …
            </span>
            <PaginationBtn v-else :active="item === modelValue" :aria-label="`Page ${item}`"
                :aria-current="item === modelValue ? 'page' : undefined" @click="changePage(item as number)">
                {{ item }}
            </PaginationBtn>
        </template>

        <PaginationBtn :disabled="modelValue === lastPage" aria-label="Next page" @click="changePage(modelValue + 1)">
            <BaseIcon name="arrow-right" width="16" height="16" />
        </PaginationBtn>
    </nav>
</template>
