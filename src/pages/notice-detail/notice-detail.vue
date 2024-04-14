<template>
  <view class="min-h-100% bg-#ffffff">
    <view class="overflow-hidden mb-2">
      <view class="mx-4 mt-3 ">
      <view class="mb-2"><text class="text-xl font-700">{{ detail?.title }}</text></view>
      <view class="flex items-baseline ">
        <text class=" color-gray-4 mr-4 text-sm">{{ detail?.publicUserName }}</text>
        <text class="color-gray-4 text-sm">{{ detail?.publicTime?moment(detail?.publicTime).format('YYYY-MM-DD'):'' }}</text>
      </view>
    </view>
    </view>

    <view class="mx-4">
      <view><rich-text :nodes="detail?.content"></rich-text></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { noticeDetail } from "@/api";
import { ref } from 'vue'
import moment from 'moment'
const detail = ref();
onLoad((query) => {
  if(query.id){
    noticeDetail(query.id).then(res => {
      detail.value = res?.result
    })
  }
  
})
</script>

<style lang="scss" scoped>

</style>
