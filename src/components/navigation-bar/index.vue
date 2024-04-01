<template>
    <view>
        <view :style="{ height: iStatusBarHeight + 'px'}"></view>
    </view>
</template>

<script setup lang="ts">
import { useGetNavigationBarHeight } from '@/composables';



const  iStatusBarHeight  = useGetNavigationBarHeight();



</script>

<style scoped>

</style>