<template>
  <!-- <uni-nav-bar
      class="zh-nav-bar"
      backgroundColor="#007aff"
      color="#ffffff"
      left-icon="left"
     
      :border="false"
      statusBar
      fixed
    >
      <view class="w-100% flex justify-center items-center">
        <text class="text-16px font-bold">订单统计</text>
      </view>
     
    </uni-nav-bar> -->
  <view class="flex flex-col h-100%">
    <view class="bg-#ffffff shrink-0">
      <dropDownBox class="grow-1 pl-4 pr-4">
        <view class="flex">
          <view class="ml-3">
            <rangePicker
              v-model="searchInput.dtmonth"
              picker="date"
              fields="month"
              @confirm="handleDateConfirm"
            />
          </view>
        </view>
      </dropDownBox>
    </view>

    <view class="grow-1 pt-2 min-h-0">
      <view class="h-100% overflow-y-auto">
        <view class="px-4 pt-10rpx">
          <view class="pric-bg rounded-10rpx overflow-hidden color-#ffffff py-30rpx px-40rpx flex">
            <view class="shrink-0">
              <view class="font-size-46rpx text-danger font-700">{{ detail?.[0]?.value }}元</view>
              <view class="mt-20rpx">当月收入</view>
            </view>

            <view class="grow-1 flex flex-col items-end">
              <view>
                <view class="flex items-baseline">
                  <text class="w-168rpx text-align-last-justify">订单数</text>
                  <text>：</text>
                  <text class="text-danger font-700">{{ detail?.[0]?.orderNumber }}</text>
                </view>

                <view class="flex items-baseline mt-38rpx">
                  <text class="w-168rpx text-align-last-justify">ETC订单数</text>
                  <text>：</text>
                  <text class="text-danger font-700">{{ detail?.[1]?.orderNumber }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="px-4 mt-30rpx">
          <view class="bg-#ffffff pt-20rpx">
            <view class="text-xl px-4">订单数走势：</view>
            <qiunDataCharts type="line" :opts="opts2" :chartData="chartData2" />
          </view>
        </view>
        <view class="px-4 mt-20rpx">
          <view class="relative z-3 mb-30rpx bg-#ffffff overflow-x-hidden rounded-t-36rpx pb-2">
            <view class="relative pt-20rpx box-border">
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
                  <template v-if="v.lable === '当月总金额'">
                    <!-- <view class="bb1 pb-3">
                      <view>
                        <text class="text-xl">当月收入：</text>
                        <text class="text-danger font-700 text-xl">{{ v.value }}元</text>
                      </view>
                      <view class="mt-2">
                        <text class="text-xl">订单总数：</text>
                        <text class="text-danger font-700 text-xl">{{ v.orderNumber }}</text>
                      </view>
                      <view class="mt-2">
                        <text class="text-xl">ETC订单数：</text>
                        <text class="text-danger font-700 text-xl">{{
                          detail[1].orderNumber
                        }}</text>
                      </view>
                    </view> -->
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
                <view class="text-xl px-4">订单金额占比：</view>
                <view class="text-right color-#999 pr-6">单位:元</view>
                <qiunDataCharts type="ring" :opts="opts" :chartData="chartData" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { orderByMonthList } from '@/api'
import singleSelect from '@/components/single-select/index.vue'
import singleBox from '@/components/single-select/single-box.vue'
import { onLoad } from '@dcloudio/uni-app'
import moment from 'moment'
import { ref } from 'vue'

import dropDownBox from '@/components/drop-down-scroll-view/drop-down-box.vue'
import rangePicker from '@/components/picker/index.vue'

import qiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts.vue'
const searchInput = ref({
  dtmonth: moment().format('YYYY-MM'),
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
    name: '金额占比',
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
const opts2 = {
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
  padding: [15, 10, 0, 15],
  enableScroll: false,
  legend: {
    position: 'top',
  },
  xAxis: {
    disableGrid: true,
  },
  yAxis: {
    gridType: 'dash',
    dashLength: 2,
  },
  extra: {
    line: {
      type: 'curve',
      width: 2,
      activeType: 'hollow',
    },
  },
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
const chartData2 = ref({} as any)
const getData = () => {
  orderByMonthList(searchInput.value.dtmonth).then((res) => {
    detail.value = res?.result || []

    chartData.value = JSON.parse(
      JSON.stringify({
        series: [
          {
            data: res?.result?.slice(1).map((item: any) => ({
              name: item.lable,
              value: Number(item.value) || 0,
            })),
          },
        ],
      }),
    )
  })
}
onLoad(() => {
  getData()

  setTimeout(() => {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
      categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
      series: [
        {
          name: '散客',
          data: [35, 8, 25, 37, 4, 20],
        },
        {
          name: '二轮车',
          data: [70, 40, 65, 100, 44, 68],
        },
        {
          name: '三轮车',
          data: [100, 80, 95, 150, 112, 132],
        },
        {
          name: '轿车',
          data: [30, 40, 20, 120, 110, 90],
        },
        {
          name: '货车',
          data: [60, 70, 20, 88, 90, 180],
        },
      ],
    }
    chartData2.value = JSON.parse(JSON.stringify(res))
  }, 500)
})
const handleDateConfirm = () => [getData()]
//   const handleChange = (day: number) => {
//     searchInput.value.dt = moment().add(day, 'days').format('YYYY-MM-DD')

//     orderBydateList(searchInput.value.dt).then((res) => {
//       detail.value = res?.result || []
//     })
//   }
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
.out-nav-wrap {
  overflow-y: auto;
}
</style>
