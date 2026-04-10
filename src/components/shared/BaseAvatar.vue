<script setup>
import AvatarBase from '@/assets/svg/AvatarBase.svg?component'
import StatusDot from '@/assets/svg/StatusDot.svg?component'

const props = defineProps({
    status: {
        type: String,
        default: 'away', // 'active' | 'away' | 'busy'
    }
})

const statusColor = {
    active: 'text-green-500',
    away: 'text-yellow-500', // matches your current #F4A316
    busy: 'text-red-500',
}
</script>

<template>
    <div class="relative inline-block w-14 h-14">
        <AvatarBase class="w-full h-full" />
        <StatusDot class="absolute bottom-0 right-0 w-3.75 h-3.75" :class="statusColor[status]" />
    </div>
</template>