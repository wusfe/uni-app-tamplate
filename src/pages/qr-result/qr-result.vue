<template>
  <view class="flex flex-col items-center bg-#ffffff min-h-100%">
    <view class="mt-9">
      <text class="color-gray-5 text-xl">您的码型为：</text>
      <text class="color-gray-5 text-xl">轿车</text>
    </view>
    <image class="w-260rpx h-260rpx mt-5" src="/static/order-jiaoche.png" mode="scaleToFill" />

    <view class="mt-6">
      <view class="flex items-center mb-2">
        <text class="color-gray-5 w-160rpx text-align-last-justify mr-2">订单时间：</text>
        <text>2024-03-07</text>
      </view>
      <view class="flex items-center mb-2">
        <text class="color-gray-5 w-160rpx text-align-last-justify mr-2">订 单 号：</text>
        <text>2024-03-07</text>
      </view>

      <view class="flex items-center  mb-2">
        <text class="color-gray-5 w-160rpx text-align-last-justify mr-2">车 牌 号：</text>
        <text>2024-03-07</text>
      </view>

      <view class="flex items-center  mb-2">
        <text class="color-gray-5 w-160rpx text-align-last-justify mr-2">订单类型：</text>
        <text>2024-03-07</text>
      </view>

      <view class="flex items-center  mb-2">
        <text class="color-gray-5 w-160rpx text-align-last-justify mr-2">车载重量：</text>
        <text>2024-03-07</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped>
.text-align-last-justify {
  text-align-last: justify;
}
</style>
