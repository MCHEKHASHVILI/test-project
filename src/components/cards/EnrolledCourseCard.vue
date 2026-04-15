<script setup lang="ts">
import Icon from '../shared/Icon.vue';
import BaseIcon from '../shared/BaseIcon.vue';
</script>
<template>
    <div class="flex flex-col bg-grayscale-50 rounded-xl p-5">
        <div class="flex flex-row items-center justify-between gap-4.5">
            <div class="w-full h-47.75 rounded-[10px]">
                <img src="https://api.redclass.redberryinternship.ge/storage/courses/react-hero.jpg" alt="Course Image"
                    class="w-full h-full object-cover rounded-[10px]" />
            </div>
            <div class="w-full flex flex-col justify-between gap-2">
                <div class="flex flex-row items-center justify-between">
                    <small class="text-grayscale-500 font-medium text-nowrap">Instructor Name</small>
                    <div class="flex items-center gap-1 w-full justify-end">
                        <Icon name="Star" alt="Average Rating" class="w-4 h-4" />
                        <span class="text-sm font-medium text-grayscale-600">4.9</span>
                    </div>
                </div>
                <h4 class="text-xl font-semibold text-grayscale-900 leading-6">Course Title</h4>
                <div class="flex flex-row items-center gap-2 justify-start">
                    <BaseIcon name="calendar" class="w-4 h-4 text-grayscale-600" />
                    <small class="text-sm font-medium text-grayscale-500">Monday-Wednesday</small>
                </div>
                <div class="flex flex-row items-center gap-2 justify-start">
                    <BaseIcon name="clock" class="w-4 h-4 text-grayscale-600" />
                    <small class="text-sm font-medium text-grayscale-500">Evening 6:00 PM - 8:00 PM</small>
                </div>
                <div class="flex flex-row items-center gap-2 justify-start">
                    <BaseIcon name="contacts" class="w-4 h-4 text-grayscale-600" />
                    <small class="text-sm font-medium text-grayscale-500">In Person</small>
                </div>
                <div class="flex flex-row items-center gap-2 justify-start">
                    <BaseIcon name="location" class="w-4 h-4 text-grayscale-600" />
                    <small class="text-sm font-medium text-grayscale-500">Tbilisi, Chavchavadze St. 30</small>
                </div>
            </div>
        </div>
        <div class="flex flex-row items-center justify-between gap-5">
            <div class="flex flex-col w-full gap-1 items-start justify-between">
                <span class="text-xs font-medium text-grayscale-900 capitalize">65% Complete</span>
                <div class="w-full bg-brand-yellow-100 rounded-full h-3.75">
                    <div class="bg-brand-yellow-500 h-3.75 rounded-full" style="width: 65%"></div>
                </div>
            </div>
            <button class="btn-outline text-nowrap">
                View Details
            </button>
        </div>
    </div>
</template>