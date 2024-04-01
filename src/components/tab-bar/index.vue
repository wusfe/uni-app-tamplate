<template>
  <view>
    <view :style="{ height: iSBarHeight + 'px' }"></view>
  </view>
</template>

<script setup lang="ts">
import { useGetTabBarHeight } from '@/composables';

const iSBarHeight = useGetTabBarHeight()

</script>

<style scoped></style>
