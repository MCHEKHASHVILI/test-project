<script setup lang="ts">
import AvatarBase from '@/assets/svg/AvatarBase.svg?component'
import StatusDot from '@/assets/svg/StatusDot.svg?component'

const props = withDefaults(
  defineProps<{
    status: 'away' | 'active' | 'busy'
    avatar?: string | null
  }>(),
  {
    status: 'away',
  },
)

const statusColor = {
  active: 'text-green-500',
  away: 'text-yellow-500', // matches your current #F4A316
  busy: 'text-red-500',
}
</script>

<template>
  <div class="relative inline-block w-14 h-14">
    <AvatarBase v-if="!avatar" class="w-full h-full " />
    <div v-else class="circle-container">
      <img :src="avatar" alt="preview" />
    </div>
    <StatusDot class="absolute bottom-0 right-0 w-3.75 h-3.75" :class="statusColor[status]" />
  </div>
</template>
<style lang="css" scoped>
.circle-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.circle-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
