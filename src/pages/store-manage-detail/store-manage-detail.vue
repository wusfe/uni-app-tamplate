<template>
  <view class="bg-#ffffff">

    <view class="pl-3 pt-3 pb-3 bb1">
      <text class="text-xl">基本信息</text>
    </view>

    <view class="pt-3 pb-3 pl-3 pr-3 flex flex-col ">
              <view class="flex items-center mb-2">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">货物类型</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{ getGoodLabel(detail?.goodsType) }}</text></view>
              </view>

              <view class="flex items-center mb-2">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">货物名称</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{ detail?.goodsName }}</text></view>
              </view>

              <view class="flex items-center mb-2">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">规格</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{ detail?.goodsModel }}</text></view>
              </view>

              <view class="flex items-center mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">厂商</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{  detail?.goosManufacturer }}</text></view>
              </view>

              <view class="flex items-center mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">物料单价</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{  detail?.goodsUnitPrice }} 元</text></view>
              </view>

              <view class="flex items-center mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">预警量</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{ detail?.alertNumber }}</text></view>
              </view>
              <!-- <view class="flex items-center mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">购入时间</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">2021-05-13</text></view>
              </view> -->

              <!-- <view class="flex items-center mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">采购人</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">--</text></view>
              </view> -->


              <view class="flex items-center mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">库存量</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{ detail?.goodsNumber }}</text></view>
              </view>

             



              <!-- <view class="flex items-center mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">备注</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">---</text></view>
              </view> -->

              </view>
  
  </view>
</template>

<script setup lang="ts">
import { getGoodsinforDetail } from '@/api';
import { useDictStore } from '@/stores';
import  { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
const dictStore = useDictStore();





const getGoodLabel = (code:any) => {
  if(!code) return ''
  return  dictStore.goodtype?.find((item:any) => item.code == code)?.value
}

const detail = ref()
onLoad((query:any) => {
  dictStore.getGoodtype()
  if(query?.id){
    getGoodsinforDetail({
    id: query.id
  }).then(res => {
    detail.value = res?.result;
  })
}
})
</script>

<style scoped>
.text-align-last-justify {
  text-align-last: justify;
}
</style>