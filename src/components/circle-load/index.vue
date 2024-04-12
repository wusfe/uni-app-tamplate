<template>
  <view>
    <view class="outer">
      <image class="outer-image" src="/static/v2_circle.jpg" mode="aspectFill"></image>

      <view class="inner">
        <image class="inner-image" :src="innerUrl || '/static/v2_loading.jpg'" mode="aspectFill"></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps(['innerUrl'])

</script>

<style scoped>
.outer {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  margin: 0 auto;
  
}

.outer-image {
  position: absolute;
  width: 120rpx;
  height: 120rpx;
 
  animation: spin 2s linear infinite;
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
 
}

.inner-image {
    vertical-align: middle;
  width: 60rpx;
  height: 60rpx;
  
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
