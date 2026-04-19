<script setup lang="ts">
import BaseIcon from '@/components/shared/BaseIcon.vue'
const model = defineModel<string | number | null>({ default: null });

defineProps<{
    label?: string;
    prefix?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    placeholder?: string;
    icon?: string;
    errors?: string[]
}>()
</script>

<template>
    <div class="relative w-full input-group">
        <label v-if="label" :class="{ 'text-helper-error': errors && errors.length }" v-text="label" />
        <div class="relative flex items-center">
            <span v-if="prefix" class="absolute left-3.75 text-grayscale-500 text-sm"
                :class="{ 'text-helper-error': errors && errors.length }" v-text="prefix" />
            <input v-model="model" :type="type || 'text'" :placeholder="placeholder"
                :class="[{ 'pl-13! pr-12': prefix }, { 'text-helper-error! border-helper-error!': errors && errors.length }]"
                v-bind="$attrs" />
            <div v-if="icon" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.75">
                <BaseIcon :name="icon" width="22" height="22"
                    :class="{ 'text-helper-error': errors && errors.length }" />
            </div>
        </div>
        <div v-if="errors && errors.length" class="flex flex-col">
            <p v-for="error in errors" class="text-helper-error text-xs font-normal" v-text="error" />
        </div>
    </div>
</template>