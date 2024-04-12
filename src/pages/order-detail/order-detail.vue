<template>

  <view class="pl-3 pr-3 pt-3 pb-3">
    <view class=" bg-#ffffff">
     <view class="ml-3 mr-3 pt-3 pb-3 flex items-cente">
        <view class="w-180rpx"><text class="text-sm color-gray-5">订单编号</text></view>
        <view><text class="text-sm">{{ detail?.orderNumber }}</text></view>
     </view>

     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">订单类型</text></view>
        <view><text class="text-sm">{{ detail?.orderType }}</text></view>
     </view>

    

     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">订单单价</text></view>
        <view><text class="text-sm pric">{{detail?.orderUnitPrice}}元</text></view>
     </view>


     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">订单数量</text></view>
        <view><text class="text-sm">{{ detail?.orderPeopleNumber }}</text></view>
     </view>

     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">订单总价</text></view>
        <view><text class="text-sm">{{detail?.orderTotalPrice}}元</text></view>
     </view>

     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">收费类型</text></view>
        <view><text class="text-sm">{{ detail?.orderChargeType }}</text></view>
     </view>


     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">购买人</text></view>
        <view><text class="text-sm">{{ detail?.userName }}</text></view>
     </view>


     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">订单状态</text></view>
        <view><text :class="{'text-sm': true, 'text-danger': [0, -1].includes(detail?.orderState), 'pric': ![0, -1].includes(detail?.orderState)}">{{ORDERSTATUSTEXT[detail?.orderState]}}</text></view>
     </view>

     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">购买时间</text></view>
        <view><text class="text-sm">{{ detail?.orderBuyTime }}</text></view>
     </view>

     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">车牌号</text></view>
        <view><text class="text-sm">{{ detail?.orderCarNumber }}</text></view>
     </view>


     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">车辆载重</text></view>
        <view><text class="text-sm">{{ detail?.orderCarLoad }}</text></view>
     </view>

     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">车辆类型</text></view>
        <view><text class="text-sm">{{ detail?.orderCarType }}</text></view>
     </view>


     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">车载人数</text></view>
        <view><text class="text-sm">{{ detail?.orderCarPeopleNumber }}</text></view>
     </view>


     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">收费车道</text></view>
        <view><text class="text-sm">{{ detail?.orderChargeNumber }}</text></view>
     </view>


     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">收费员</text></view>
        <view><text class="text-sm">{{ detail?.orderChargeName }}</text></view>
     </view>

     <!-- <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">发票号码</text></view>
        <view><text class="text-sm">{{ detail?.orderInvoiceCode }}</text></view>
     </view>

     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">发票代码</text></view>
        <view><text class="text-sm">??</text></view>
     </view>

     <view class="ml-3 mr-3 pt-3 pb-3 flex items-center b1">
        <view class="w-180rpx"><text class="text-sm color-gray-5">发票详情</text></view>
        <view><text class="text-sm">文件打开</text></view>
     </view> -->
  </view>
  </view>
 
</template>

<script setup lang="ts">
import { orderinforDetail } from '@/api';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import {ORDERSTATUSTEXT} from '@/consts'


const detail = ref();


onLoad((query:any) => {
   
   
   orderinforDetail({
      orderNumber: query.orderNum
   }).then(res => {
      console.log(res);
      detail.value = res?.result
   })
})
</script>

<style scoped>

</style>