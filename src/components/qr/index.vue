<template>
    <view class="flex flex-col items-center bg-#ffffff min-h-100%">
      <view class="mt-9">
        <text class="color-gray-5 text-xl">您的码型为：</text>
        <text class="color-gray-5 text-xl">{{detail?.orderType}}</text>
        
      </view>
      <view class="relative">
        <image class="w-260rpx h-260rpx mt-5" :src="ORDER_COMMONICON[detail?.orderType]" mode="scaleToFill" />
        <i v-if="status == 2" class="zhfont zh-yiheyan scolor font-size-120rpx position-absolute right--30rpx top-20rpx z-2"></i>
      </view>
     
  
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
  
  const props = defineProps(['orderNumber'])
  
  const status = ref()
  const detail = ref()
  onLoad((query: any) => {
    if (props.orderNumber) {
      orderinforDetail({
        orderNumber: props.orderNumber,
      }).then((res) => {
        detail.value = res?.result
        status.value = res?.result?.orderState
        if (res?.result?.orderState == 1) {
          updateCompleteOrder(props.orderNumber).then(res => {
            status.value = 2
            uni.showToast({
              title: '核验成功'
            })
          })
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
  