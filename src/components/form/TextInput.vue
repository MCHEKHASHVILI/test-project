<script setup lang="ts">
import BaseIcon from '@/components/shared/BaseIcon.vue'
const model = defineModel<string | number | null>({ default: null });

defineProps<{
    label?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    placeholder?: string;
    icon?: string;
}>();
</script>

<template>
    <div class="relative w-full input-group">
        <label v-if="label" v-text="label" />
        <div class="relative flex items-center">
            <input v-model="model" :type="type || 'text'" :placeholder="placeholder" v-bind="$attrs" />
            <div v-if="icon" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.75">
                <BaseIcon :name="icon" width="22" height="22" class="" />
            </div>
        </div>
    </div>
</template>