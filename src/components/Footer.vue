<script setup lang="ts">
import IconLoader from './shared/IconLoader.vue'
import AppLink from './shared/AppLink.vue'
import { useFooter } from '@/composables/useFooter'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { isAuthenticated } = storeToRefs(useAuthStore())
const {
    breadCrumbs,
    separator,
    socialLinks,
    footerMenus
} = useFooter()
function showMenuItem(item: any) {
    if (isAuthenticated.value && item.authRequired === true) return true
    if (!isAuthenticated.value && item.authRequired === false) return true
    if (isAuthenticated.value && item.guestRequired === false) return true
    if (!isAuthenticated.value && item.guestRequired === true) return true
    return false
}
</script>
<template>
    <footer class="pt-20 pb-5 border-t border-grayscale-200 drop-shadow-[4%]">
        <div class="wrapper w-full flex flex-col justify content-between">
            <div class="w-full flex flex-row justify-between">
                <div class="w-full flex flex-col gap-6">
                    <div class="flex flex-row items-center space-x-3">
                        <RouterLink :to="{ name: 'home' }"
                            class="flex items-center justify-center bg-purple-500 w-11.25 h-11.25 rounded-[14px]">
                            <IconLoader name="ApplicationLogo" class="text-grayscale-100 text-[19px]" />
                        </RouterLink>
                        <span class="text-purple-800 text-body-xl">Bootcamp</span>
                    </div>
                    <div class="text-purple-800 text-body-xs">
                        <p>Your learning journey starts here!</p>
                        <p>Browse courses to get started.</p>
                    </div>
                    <ul class="flex flex-row items-center justify-start space-x-5.5 text-purple-400 text-[19px]">
                        <li v-for="link in socialLinks">
                            <RouterLink :to="link.url">
                                <IconLoader :name="link.name" />
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="w-full flex flex-row gap-30">
                    <div class="w-full flex flex-col gap-4" v-for="section in footerMenus">
                        <h3 class="text-purple-800 text-heading-4 leading-6 capitalize" v-text="section.title" />
                        <ul class="text-grayscale-500 flex flex-col gap-2">
                            <li v-for="item in section.menu">
                                <AppLink :to="item.url" v-if="showMenuItem(item)"
                                    class="text-body-m capitalize hover:text-purple-400 transition duration-300 transform-all ease-out "
                                    :class="[{ 'flex flex-row items-center gap-1.5': !!item.icon }, { 'cursor-default': item.url === '#' }]">
                                    <IconLoader v-if="!!item.icon" :name="item.icon" class="text-[22px]" />
                                    <span v-text="item.title" />
                                </AppLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mt-20 w-full flex flex-row justify-between">
                <span class="w-full text-body-m font-normal text-grayscale-500">
                    Copyright © 2026 Redberry International
                </span>
                <nav class="w-full">
                    <ul class="flex items-center justify-between justify-self-end gap-1">
                        <li v-for="(item, index) in breadCrumbs"
                            class="flex flex-row gap-1 text-body-m font-normal text-grayscale-500">
                            <span v-if="index !== 0" v-text="separator" />
                            <span v-if="!item.isLink" v-text="item.title" />
                            <RouterLink v-if="item.isLink" :to="item?.route" v-text="item.title" class="text-purple-500"
                                :class="{ 'cursor-default': item.route === '#' }" />
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </footer>
</template>