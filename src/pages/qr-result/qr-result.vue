<template>
  <view class="flex flex-col items-center bg-#ffffff min-h-100%">
    <view class="mt-9">
      <text class="color-gray-5 text-xl">您的码型为：</text>
      <text class="color-gray-5 text-xl">{{detail?.orderType}}</text>
    </view>
    <image class="w-260rpx h-260rpx mt-5" :src="ORDER_COMMONICON[detail?.orderType]" mode="scaleToFill" />

    <view class="mt-6">
      <view class="flex items-baseline mb-2">
        <text class="color-gray-5 w-136rpx text-align-last-justify ">订单时间</text>
        <text>：</text>
        <text>{{ detail?.orderBuyTime }}</text>
      </view>
      <view class="flex items-baseline mb-2">
        <text class="color-gray-5 w-136rpx text-align-last-justify">订 单 号</text>
        <text>：</text>
        <text>{{ detail?.orderNumber }}</text>
      </view>

      <view class="flex items-baseline mb-2">
        <text class="color-gray-5 w-136rpx text-align-last-justify ">车 牌 号</text>
        <text>：</text>
        <text>{{ detail?.orderCarNumber }}</text>
      </view>

      <view class="flex items-baseline mb-2">
        <text class="color-gray-5 w-136rpx text-align-last-justify ">订单类型</text>
        <text>：</text>
        <text>{{ ORDERCHARGETYPELIST[detail?.orderChargeType] }}</text>
      </view>

      <view class="flex items-baseline mb-2">
        <text class="color-gray-5 w-136rpx text-align-last-justify">车载重量</text>
        <text>：</text>
        <text>{{ detail?.orderCarLoad }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { orderinforDetail, updateCompleteOrder } from '@/api'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { ORDERCHARGETYPELIST ,ORDER_COMMONICON} from '@/consts'
// 4875446994044766907

const detail = ref()
onLoad((query: any) => {
  if (query.orderNumber) {
    orderinforDetail({
      orderNumber: query.orderNumber,
    }).then((res) => {
      detail.value = res?.result
      
      if (res?.result?.orderState == 1) {
        updateCompleteOrder(query.orderNumber)
      }
    })
  }
})
</script>

<style scoped>
.text-align-last-justify {
  text-align-last: justify;
}
</style>
