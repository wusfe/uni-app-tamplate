<template>
  <uni-nav-bar
    class="zh-nav-bar"
    backgroundColor="#007aff"
    color="#ffffff"
    left-icon="left"
    right-icon="cart"
    :border="false"
    statusBar
    fixed
  >
    <view class="w-100% flex justify-center items-center">
      <text class="text-16px font-bold">财务</text>
    </view>
    <template v-slot:right>
      <view>
        <singleBox>
          <singleSelect
            @change="handleChange"
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
    <view class="h-600rpx bg-#007aff position-absolute top-0 left-0 right-0"></view>

    <view class="relative z-999 h-100% overflow-y-autor overflow-x-hidden rounded-t-36rpx">
      <view class="bg-#ffffff pt-50rpx min-h-100% box-border">
        <!-- <view class="px-4">
          <view>
            <text>总金额：</text>
            <text class="red font-700">88888元</text>
          </view>
          <view class="mt-2">
            <text>订单总数：</text>
            <text class="red font-700">1002</text>
          </view>
        </view> -->

        <view class="px-4">
          <template v-for="v in detail">
            <template v-if="v.lable === '今日总金额'">
              <view class="bb1 pb-3">
                <view>
                  <text class="text-xl">总金额：</text>
                  <text class="text-danger font-700 text-xl">{{ v.value }}元</text>
                </view>
                <view class="mt-2">
                  <text>订单总数：</text>
                  <text class="text-danger font-700 text-xl">{{ v.orderNumber }}</text>
                </view>
              </view>
            </template>

            <view class="bb1 pb-2 mt-3" v-else>
              <view class="flex flex-col">
                <view class="flex items-baseline mb-2">
                  <text class="w-136rpx text-align-last-justify align-middle">订单类型</text>
                  <text>：</text>
                  <text class="ml-1">{{ v.lable }}</text>
                </view>
                <view class="flex items-baseline mb-2">
                  <text class="w-136rpx text-align-last-justify align-middle">订单数</text>
                  <text>：</text>
                  <text class="ml-1">{{ v.orderNumber }}</text>
                </view>
                <view class="flex items-baseline mb-2">
                  <text class="w-136rpx text-align-last-justify align-middle">订单金额</text>
                  <text>：</text>
                  <text class="ml-1">{{ v.value }}元</text>
                </view>
              </view>
            </view>
          </template>
        </view>

        <view class="mt-5">
          <view class="text-xl px-4">客源占比分析：</view>

          <qiunDataCharts type="ring" :opts="opts" :chartData="chartData" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { orderBydateList } from '@/api'
import singleSelect from '@/components/single-select/index.vue'
import singleBox from '@/components/single-select/single-box.vue'
import { onLoad } from '@dcloudio/uni-app'
import moment from 'moment'
import { ref } from 'vue'

import qiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts.vue'
const searchInput = ref({
  dt: moment().format('YYYY-MM-DD'),
})

const opts = {
  rotate: false,
  rotateLock: false,
  color: [
    '#1890FF',
    '#91CB74',
    '#FAC858',
    '#EE6666',
    '#73C0DE',
    '#3CA272',
    '#FC8452',
    '#9A60B4',
    '#ea7ccc',
  ],
  padding: [5, 5, 5, 5],
  dataLabel: true,
  enableScroll: false,
  legend: {
    show: true,
    position: 'top',
    lineHeight: 25,
  },
  title: {
    name: '客源占比',
    fontSize: 15,
    color: '#666666',
  },
  // 中间的
  subtitle: {
    name: '',
    // fontSize: 25,
    // color: '#7cb5ec',
  },
  // extra: {
  //   ring: {
  //     ringWidth: 60,
  //     activeOpacity: 0.5,
  //     activeRadius: 10,
  //     offsetAngle: 0,
  //     labelWidth: 15,
  //     border: false,
  //     borderWidth: 3,
  //     borderColor: '#FFFFFF',
  //   },
  // },
}

const dateType = [
  {
    text: '今日',
    value: 0,
  },
  {
    text: '昨日',
    value: -1,
  },
  {
    text: '前日',
    value: -2,
  },
]
const chartData = ref({} as any)
const detail = ref()
onLoad(() => {
  orderBydateList(searchInput.value.dt).then((res) => {
    detail.value = res?.result || []

    console.log(detail.value)

    chartData.value = JSON.parse(
      JSON.stringify({
        series: [
          {
            data: res?.result?.slice(1).map((item: any) => ({
              name: item.lable,
              value: item.orderNumber,
            })),
          },
        ],
      }),
    )
  })

  // setTimeout(() => {
  //   let res = {
  //     series: [
  //       {
  //         data: [
  //           { name: '一班', value: 50 },
  //           { name: '二班', value: 30 },
  //           { name: '三班', value: 20 },
  //           { name: '四班', value: 18 },
  //           { name: '五班', value: 8 },
  //         ],
  //       },
  //     ],
  //   }
  //   chartData.value = JSON.parse(JSON.stringify(res))
  // }, 2000)
})

const handleChange = (day: number) => {
  searchInput.value.dt = moment().add(day, 'days').format('YYYY-MM-DD')

  orderBydateList(searchInput.value.dt).then((res) => {
    detail.value = res?.result || []
  })
}
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
