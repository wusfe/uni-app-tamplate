<template>
  <uni-nav-bar
    class="zh-nav-bar"
    backgroundColor="#007aff"
    color="#ffffff"
    left-icon="left"
    right-icon="cart"
    title="财务"
    :border="false"
    statusBar
    fixed
  >
    <template v-slot:right>
      <view>
        <singleBox>
          <singleSelect
            arrow-direct="right"
            :modelValue="0"
            placeholder="请选择日期"
            :localdata="dateType"
          />
        </singleBox>
      </view>
    </template>
  </uni-nav-bar>
  <view class="out-nav-wrap relative pt-100rpx box-border">
    <view class="h-200rpx bg-#007aff position-absolute top-0 left-0 right-0"></view>

    <view class="relative z-1 h-100% overflow-y-autor overflow-x-hidden rounded-t-36rpx">
      <view class="bg-#ffffff pt-5 min-h-100% box-border">
        
        <view class="px-4">
          <view>
            <text>总金额：</text>
            <text class="red font-700">88888元</text>
          </view>
          <view class="mt-2">
            <text>订单总数：</text>
            <text class="red font-700">1002</text>
          </view>

        </view>

        <view class="mt-6">
          <view class="px-4">
            <view class="bb1 pb-2">
                <view class="flex flex-col">
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">订单类型</text>
                    <text>：</text>
                    <text class="ml-1">小程序散客</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">订单数</text>
                    <text>：</text>
                    <text class="ml-1">100</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">订单金额</text>
                    <text>：</text>
                    <text class="ml-1">200</text>
                  </view>
                  
                </view>

               
              </view>

              <view class="bb1 pb-2 mt-3">
                <view class="flex flex-col">
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">订单类型</text>
                    <text>：</text>
                    <text class="ml-1">小程序散客</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">订单数</text>
                    <text>：</text>
                    <text class="ml-1">100</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">订单金额</text>
                    <text>：</text>
                    <text class="ml-1">200</text>
                  </view>
                  
                </view>

               
              </view>

              <view class="bb1 pb-2 mt-3">
                <view class="flex flex-col">
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">订单类型</text>
                    <text>：</text>
                    <text class="ml-1">小程序散客</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">订单数</text>
                    <text>：</text>
                    <text class="ml-1">100</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">订单金额</text>
                    <text>：</text>
                    <text class="ml-1">200</text>
                  </view>
                  
                </view>

               
              </view>
          </view>
        </view>

        <view class="mt-5">
          <view class="text-xl px-4">客源占比分析：</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import singleSelect from '@/components/single-select/index.vue'
import singleBox from '@/components/single-select/single-box.vue'

const dateType = [
  {
    text: '今日',
    value: 0,
  },
  {
    text: '明日',
    value: 1,
  },
  {
    text: '前日',
    value: 2,
  },
]
</script>

<style scoped lang="scss">
.zh-nav-bar :deep(.uni-navbar__header-btns-right) {
  overflow: visible;
}
.zh-nav-bar :deep(.uni-select__input-placeholder) {
  color: #ffffff !important;
}
.zh-nav-bar :deep(.uni-select__input-text) {
  color: #ffffff !important;
}
.zh-nav-bar :deep(.uni-select-icon) {
  color: #ffffff !important;
}
.zh-nav-bar :deep(.uni-select__selector) {
  width: 160rpx;
  right: 0;
  max-width: none;
  left: auto;
}
.zh-nav-bar :deep(.uni-select__selector-item) {
  justify-content: center;
}
</style>
