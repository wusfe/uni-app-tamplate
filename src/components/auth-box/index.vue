<template>
   <slot v-if="showRef"></slot>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref, useSlots } from 'vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()


const props = defineProps<{
    ah?:string
}>()

const showRef = ref(false)

onLoad(() => {
    showRef.value = userStore?.profile?.buttons?.some(item => item === props?.ah)
})


</script>

<style scoped>

</style>