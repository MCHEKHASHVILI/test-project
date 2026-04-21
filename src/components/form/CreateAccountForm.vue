<script setup lang="ts">
import TextInput from './TextInput.vue'
import FileInput from './FileInput.vue'
import FileUploadIdle from '@/components/shared/FileUploadIdle.vue'
import AppLink from '@/components/shared/AppLink.vue'
import { useRegistrationStore } from '@/stores/registration'
import { storeToRefs } from 'pinia'
const registrationStore = useRegistrationStore()
const { currentStep, totalSteps, email, password, passwordConfirmation, userName, avatar, validationErrors } = storeToRefs(registrationStore)
</script>
<template>
    <div class="flex flex-col space-y-6">
        <!-- Progress Indicator -->
        <div class="w-full flex justify-between items-center gap-2">
            <div v-for="i in totalSteps" :key="i"
                class="w-full h-2 rounded-[30px] transition-colors duration-300 ease-in-out"
                :class="registrationStore.getStepBgColor(i)" />
        </div>

        <form class="modal" @submit.prevent>
            <!-- Step 1 -->
            <div v-if="currentStep === 1">
                <TextInput type="email" label="Email*" v-model="email" placeholder="You@example.com"
                    :errors="validationErrors?.email" />
            </div>

            <!-- Step 2 -->
            <div v-else-if="currentStep === 2" class="flex flex-col gap-6">
                <TextInput type="password" label="Password*" autocomplete="off" icon="eye" v-model="password"
                    :errors="validationErrors?.password" />
                <TextInput type="password" label="Confirm Password*" autocomplete="off" icon="eye-closed"
                    v-model="passwordConfirmation" :errors="validationErrors?.password" />
            </div>

            <!-- Step 3 -->
            <div v-else-if="currentStep === 3" class="flex flex-col gap-6">
                <TextInput type="text" label="UserName*" v-model="userName" :errors="validationErrors?.username" />
                <FileInput label="Upload Avatar" :idle_component="FileUploadIdle" v-model="avatar"
                    accepted-file-types="image/jpeg, image/png, image/webp" :allow-multiple="false" />
            </div>

            <!-- Navigation -->
            <div class="mt-8 flex justify-between">
                <button v-if="currentStep < totalSteps" @click.prevent="registrationStore.nextStep"
                    class="w-full btn-primary p-2.5">Next</button>
                <button v-else class="w-full btn-primary p-2.5" @click="$emit('submit')">Create Account</button>
            </div>
        </form>
        <div class="flex items-center">
            <div class="grow border-t border-grayscale-200"></div>
            <span class="px-2.5 text-grayscale-400 font-medium">or</span>
            <div class="grow border-t border-grayscale-200"></div>
        </div>
        <div class="flex items-center space-x-2 justify-center">
            <span class="text-helper-regular-s text-grayscale-500 lowercase first-letter:uppercase">Already have an
                account?</span>
            <AppLink :to="{ name: 'action.modal', params: { name: 'LogInModal' } }"
                class="text-body-xs text-grayscale-900 font-medium text-center underline decoration-solid underline-offset-[25%] decoration-[0%] cursor-pointer">
                Log in
            </AppLink>
        </div>
    </div>
</template>
