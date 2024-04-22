<template>
  <view class="flex flex-col  items-center">

    <image
      src="/static/no-auth.png"

      width="200"
      mode="widthFix"
    />

    <view>
      <text class=" font-700">暂无访问权限</text>
   
    </view>
    <view class="mt-20rpx px-40rpx py-10rpx" @click="handleBack">
      <text class="pric">返回上一页</text>
    </view>
  </view>
</template>

<script setup lang="ts">
  const handleBack = () => {
    uni.navigateBack()
  }
</script>

<style scoped>

</style>