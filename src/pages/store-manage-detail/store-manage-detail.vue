<template>
  <view class="bg-#ffffff">

    <view class="pl-3 pt-3 pb-3 bb1">
      <text class="text-xl">基本信息</text>
    </view>

    <view class="pt-3 pb-3 pl-3 pr-3 flex flex-col ">
              <view class="flex items-center mb-2">
                <view class="w-130rpx text-align-last-justify align-middle">
                  <text class="align-middle">货物类型</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">1001</text></view>
              </view>

              <view class="flex items-center mb-2">
                <view class="w-130rpx text-align-last-justify align-middle">
                  <text class="align-middle">货物名称</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">维修配件</text></view>
              </view>

              <view class="flex items-center mb-2">
                <view class="w-130rpx text-align-last-justify align-middle">
                  <text class="align-middle">规格</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">发动机</text></view>
              </view>

              <view class="flex items-center mb-3">
                <view class="w-130rpx text-align-last-justify align-middle">
                  <text class="align-middle">厂商</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">ABS21-54545</text></view>
              </view>

              <view class="flex items-center mb-3">
                <view class="w-130rpx text-align-last-justify align-middle">
                  <text class="align-middle">购入价格</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">20000 元</text></view>
              </view>


              <view class="flex items-center mb-3">
                <view class="w-130rpx text-align-last-justify align-middle">
                  <text class="align-middle">购入时间</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">2021-05-13</text></view>
              </view>

              <view class="flex items-center mb-3">
                <view class="w-130rpx text-align-last-justify align-middle">
                  <text class="align-middle">采购人</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">--</text></view>
              </view>


              <view class="flex items-center mb-3">
                <view class="w-130rpx text-align-last-justify align-middle">
                  <text class="align-middle">库存量</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">1</text></view>
              </view>


              <view class="flex items-center mb-3">
                <view class="w-130rpx text-align-last-justify align-middle">
                  <text class="align-middle">备注</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">---</text></view>
              </view>

              </view>
  
  </view>
</template>

<script setup lang="ts">

</script>

<style scoped>
.text-align-last-justify {
  text-align-last: justify;
}
</style>