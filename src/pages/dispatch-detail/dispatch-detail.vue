<template>
  <view class="pl-3 pr-3 pt-3 pb-3">
    <view class="flex flex-col h-100% bg-#ffffff pl-3 pr-3 pt-3 pb-3">
     <view>
      <view class="flex items-baseline mb-2">
        <view class="w-136rpx text-align-last-justify align-middle">
          <text >船号</text>
        </view>
        <text>：</text>
        <view class="ml-1"><text class="align-bottom">{{ detail?.shipCode }}</text></view>
      </view>

      <view class="flex items-baseline mb-2">
        <view class="w-136rpx text-align-last-justify align-middle">
          <text >船名</text>
        </view>
        <text>：</text>
        <view class="ml-1"><text class="align-bottom">{{ detail?.shipName }}</text></view>
      </view>

      <view class="flex mb-2 baseline">
        <view class="w-136rpx text-align-last-justify align-middle">
          <text >人员名单</text>
        </view>
        <text>：</text>
        <view class="ml-1">
         <text> {{ detail?.shipUserInfor }}</text>
         </view
        >
      </view>

      <view class="flex items-baseline mb-2">
        <view class="w-136rpx text-align-last-justify align-middle">
          <text >运行状态</text>
        </view>
        <text>：</text>
        <view class="ml-1">

          <text class="scolor" v-if="detail?.shipState">运行中</text>
          <text class=" text-danger" v-if="!detail?.shipState">停运</text>
        </view>
      </view>

      <view class="flex items-baseline items-center mb-2">
        <view class="w-136rpx text-align-last-justify align-middle">
          <text >运行时间</text>
        </view>
        <text>：</text>
        <view class="ml-1"><text>{{detail?.dispatchTime ? moment(detail?.dispatchTime).format("YYYY-MM-DD"):'' }}</text></view>
      </view>
     </view>


     <view class="bb1 pb-2 mt-4">
      <text class="text-xl font-600">近期调用记录</text>
     </view>

    <view>
        <view class="flex justify-between items-center pt-3 pb-3 bb1" v-for="v in list">
          <view >{{ detail?.dispatchTime ? moment(v?.dispatchTime).format("YYYY-MM-DD"):'' }}</view>
          <view>联系人：{{ v.shipCaptain }}</view>
        </view>
    </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { dispatchinforDetail, dispatchinforList } from '@/api';
import  { onLoad } from '@dcloudio/uni-app';
import moment from 'moment';
import { ref } from 'vue';


const list = ref([] as any)

const detail = ref()
onLoad((query:any) =>{

  console.log(query);
  

  if(query?.id){
    dispatchinforDetail({
    id: query.id
  }).then(res=> {
    detail.value = res?.result
    // console.log(res);
    dispatchinforList({
      shipCode: res?.result?.shipCode
    }).then(res => {
      list.value = res?.result|| []
    })
  })
  }
})

</script>

<style scoped></style>
