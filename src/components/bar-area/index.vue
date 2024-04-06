<template>
  <view :style="style">
   
  </view>
</template>

<script setup lang="ts">
import { useGetBarHeight } from '@/composables';
import { computed } from 'vue';
interface BarHeightProps {
  area: 'top' | 'bottom'
}

const { area } = defineProps<BarHeightProps>()

const { topHeightRef: topHeight, bottomHeightRef: bottomHeight } = useGetBarHeight();


const style = computed(() => {
  return {
    height: area === 'top' ? topHeight.value + 'px' : area === 'bottom' ? bottomHeight.value + 'px' : undefined
  }
});



</script>

<style scoped></style>
