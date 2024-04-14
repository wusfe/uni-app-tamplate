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
            :model-value="0"
            arrow-direct="right"
            @change="handleChange"
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
            <text class="pric text-sm ml-20rpx">较昨日下降20%</text>
          </view>
        </view>

        <view class="mt-5">
          <view class="px-4">
            <uni-swipe-action>
              <uni-swipe-action-item class="bb1 pb-2">
                <template v-slot:right>
                  <view class="flex flex-col">
                    <view
                      class="h-50% bg-#007aff color-#ffffff text-sm flex justify-center items-center px-18rpx"
                      >详情</view
                    >
                    <view
                      class="h-50% bg-#4cd964 color-#ffffff text-sm flex justify-center items-center px-18rpx"
                      >编辑</view
                    >
                  </view>
                </template>

                <view class="flex flex-col">
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">车道号</text>
                    <text>：</text>
                    <text class="ml-1">SDZZ000001</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">员工姓名</text>
                    <text>：</text>
                    <text class="ml-1">王漫</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">所属部门</text>
                    <text>：</text>
                    <text class="ml-1">技术部</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">所属岗位</text>
                    <text>：</text>
                    <text class="ml-1">产品经理</text>
                  </view>
                </view>
              </uni-swipe-action-item>

              <uni-swipe-action-item class="bb1 pb-3 mt-3">
                <template v-slot:right>
                  <view class="flex flex-col">
                    <view
                      class="h-50% bg-#007aff color-#ffffff text-sm flex justify-center items-center px-18rpx"
                      >详情</view
                    >
                    <view
                      class="h-50% bg-#4cd964 color-#ffffff text-sm flex justify-center items-center px-18rpx"
                      >编辑</view
                    >
                  </view>
                </template>

                <view class="flex flex-col">
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">车道号</text>
                    <text>：</text>
                    <text class="ml-1">SDZZ000001</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">收费员</text>
                    <text>：</text>
                    <text class="ml-1">王漫</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">班次</text>
                    <text>：</text>
                    <text class="ml-1">SK00212</text>
                  </view>
                  <view class="flex items-baseline mb-2">
                    <text class="w-136rpx text-align-last-justify align-middle">收入金额</text>
                    <text>：</text>
                    <text class="ml-1 red">1111</text>
                  </view>
                </view>
              </uni-swipe-action-item>
            </uni-swipe-action>
          </view>
        </view>

        <view class="mt-5">
          <view class="text-xl px-4">车道金额占比分析</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { orderBydateList } from '@/api';
import singleSelect from '@/components/single-select/index.vue'
import singleBox from '@/components/single-select/single-box.vue'
import { onLoad } from '@dcloudio/uni-app';
import moment from 'moment';
import { ref } from 'vue';


const searchInput = ref({
  dt: moment().format('YYYY-MM-DD')
})

const handleChange = (v:any) => {
  console.log(v);
  
}
const dateType = [
  {
    text: '今日',
    value: 0,
  },
  {
    text: '昨日',
    value: 1,
  },
  {
    text: '前日',
    value: 2,
  },
]

const detail = ref()
onLoad(() => {
  orderBydateList(searchInput.value.dt).then(res => {
    console.log(res);
    detail.value = res?.result || []
  })
})
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
