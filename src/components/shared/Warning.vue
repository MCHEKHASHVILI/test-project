<script setup lang="ts">
import IconLoader from '@/components/shared/IconLoader.vue';
defineProps<{ title: string, description: string }>()
</script>
<template>
    <div class="w-full flex flex-row items-center justify-between p-5 border border-[#E5E7EB] rounded-xl bg-[#F8FAFC]">
        <div div class="flex flex-col gap-2 w-87.75">
            <div class="flex flex-row items-center gap-1.5">
                <IconLoader name="warning" class="text [22px] text-helper-warning" />
                <span class="capitalize text-body-s leading-6 text-grayscale-800 " v-text="title" />
            </div>
            <span class="lowercase first-letter:capitalize text-grayscale-400 text-helper-regular-s"
                v-text="description" />
        </div>
        <slot name="action" />
    </div>
</template>