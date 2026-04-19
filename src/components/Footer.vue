<script setup lang="ts">
import BaseIcon from './shared/BaseIcon.vue'
import AppLink from './shared/AppLink.vue'
import { useFooter } from '@/composables/useFooter';

const {
    breadCrumbs,
    separator,
    socialLinks,
    footerMenus
} = useFooter()

</script>
<template>
    <footer class="pt-20 pb-5 border-t border-grayscale-200 drop-shadow-[4%]">
        <div class="wrapper w-full flex flex-col justify content-between">
            <div class="w-full flex flex-row justify-between">
                <div class="w-full flex flex-col gap-4">
                    <div class="flex flex-row items-center space-x-3">
                        <RouterLink :to="{ name: 'home' }"
                            class="flex items-center justify-center bg-purple-500 w-11.25 h-11.25 rounded-[14px]">
                            <BaseIcon name="ApplicationLogo" width="18.37" height="19" viewBox="0 0 32 33" />
                        </RouterLink>
                        <span class="text-purple-800 text-2xl font-medium leading-none">Bootcamp</span>
                    </div>
                    <div>
                        <p>Your learning journey starts here!</p>
                        <p>Browse courses to get started.</p>
                    </div>
                    <ul class="flex flex-row items-center justify-start space-x-5.5 text-purple-400">
                        <li v-for="link in socialLinks">
                            <RouterLink :to="link.url">
                                <BaseIcon :name="link.name" />
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="w-full flex flex-row gap-30">
                    <div class="w-full flex flex-col gap-6" v-for="section in footerMenus">
                        <h3 class="text-purple-800 text-xl font-semibold leading-7" v-text="section.title" />
                        <ul class="text-grayscale-500 flex flex-col gap-2">
                            <li v-for="menuItem in section.menu">
                                <AppLink :to="menuItem.url"
                                    :class="{ 'flex flex-row items-center space-x-1.5': !!menuItem.icon }">
                                    <BaseIcon v-if="!!menuItem.icon" :name="menuItem.icon" />
                                    <span v-text="menuItem.title" />
                                </AppLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mt-20 w-full flex flex-row justify-between">
                <span class="w-full text-lg text-grayscale-500 font-normal leading-6.5">
                    Copyright © 2026 Redberry International
                </span>
                <nav class="w-full">
                    <ul class="flex items-center justify-between justify-self-end gap-1">
                        <li v-for="(item, index) in breadCrumbs" class="flex flex-row gap-1">
                            <span v-if="index !== 0" v-text="separator"
                                class="text-lg text-grayscale-500 font-normal leading-6.5" />
                            <span v-if="!item.isLink" v-text="item.title"
                                class="text-lg text-grayscale-500 font-normal leading-6.5" />
                            <RouterLink v-if="item.isLink" :to="item?.route" v-text="item.title"
                                class="text-purple-500 font-normal leading-6.5" />
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </footer>
</template>