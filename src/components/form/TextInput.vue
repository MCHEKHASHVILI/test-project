<script setup lang="ts">
import { ref } from 'vue'
import BaseIcon from '@/components/shared/BaseIcon.vue'
import IconLoader from '@/components/shared/IconLoader.vue'
const model = defineModel<string | number | null>({ default: null });

const props = withDefaults(defineProps<{
    label?: string;
    prefix?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    placeholder?: string;
    icon?: string;
    errors?: string[]
}>(), {
    type: 'text'
})

const currentType = ref(props.type);
const currentIcon = ref<string | undefined>(props.icon);

const toggleVisibility = () => {
    currentType.value = currentType.value === 'password' ? 'text' : 'password';
    currentIcon.value = currentIcon.value === 'eye-closed' ? 'eye' : 'eye-closed';
};
</script>

<template>
    <div class="relative w-full input-group">
        <label v-if="label" v-text="label" />
        <div class="text-input relative flex items-center">
            <span v-if="prefix" class="absolute left-3.75 prefix"
                :class="{ 'text-helper-error': errors && errors.length }" v-text="prefix" />
            <input v-model="model" :type="currentType" :placeholder="placeholder"
                :class="[{ 'pl-13! pr-12': prefix }, { 'text-helper-error! border-helper-error!': errors && errors.length }]"
                v-bind="$attrs" />
            <span v-if="icon" class="cursor-default absolute inset-y-0 right-0 flex items-center pr-3.75 suffix" :class="[{ 'text-helper-error!': errors && errors.length }, {
                'cursor-pointer!': type === 'password'
            }]" @click="toggleVisibility">
                <!-- <BaseIcon :name="icon" width="22" height="22" :class="{ 'text-helper-error': errors && errors.length }" /> -->
                <IconLoader :name="currentIcon || ''" class="text-[22px]" />
            </span>
        </div>
        <div v-if="errors && errors.length" class="flex flex-col">
            <p v-for="error in errors" class="text-helper-error text-xs font-normal" v-text="error" />
        </div>
    </div>
</template>