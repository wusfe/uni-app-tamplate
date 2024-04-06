<template>
  <view style="padding-bottom: 20px">
    <mc-body
      @init="mescrollInit"
      :up="upOptions"
      :down="downOptions"
      @down="downCallback"
      @up="upCallback"
    >
      <uni-swipe-action>
        <view class="pl-2 pr-2 mt-3" v-for="v in data" :key="v.id">
          <uni-card :is-shadow="false" :margin="'0'" :spacing="'0'" :padding="'0'">
            <uni-swipe-action-item>
              <view class="pt-2 pb-2 pl-3 pr-3">
                <view
                  ><text class="text-color-#000000"
                    >市政府办公室关于转发《国务院办公厅关于2019年部分节假日安排的通知》的通知</text
                  ></view
                >

                <view class="flex flex-row justify-end items-center">
                  <text class="mr-3">杨静云</text>
                  <text>发布于 2022-10-20 15:00</text>
                </view>
              </view>
              <template v-slot:right>
                <view class="px-4 bg-red flex justify-center items-center"
                  ><text class="text-color-#ffffff">删除</text></view
                >
              </template>
            </uni-swipe-action-item>
          </uni-card>
        </view>
      </uni-swipe-action>
    </mc-body>
  </view>
</template>

<script setup lang="tsx">
import { useGetBarHeight, sleep, useMescroll } from '@/composables'
import { onReady, onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

const { mescrollInit, getMescroll } = useMescroll(onPageScroll, onReachBottom) // 调用mescroll的hook

const mescroll = computed(() => getMescroll()) as any // 必须使用计算属性才可及时获取到mescroll对象,此处是me-video中使用

const z = useGetBarHeight()


onLoad(() => {
  console.log('页面 onload')
})
// 控制上拉加载的参数
const upOptions = ref({
  use: true, // 是否启用上拉加载; 默认true
  auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
  isBoth: false,
  page: {
    num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
    size: 10, // 每页数据的数量
    time: null, // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
  },
  noMoreSize: 3,
  textNoMore: '-- END --', // 没有更多数据的提示文本
  empty: {
    use: true, // 是否显示空布局
    icon: 'https://www.mescroll.com/img/mescroll-empty.png', // 图标路径
    tip: '~ 暂无相关数据 ~', // 提示
    btnText: '去逛逛 >', // 按钮
    fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
    top: '100rpx', // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
    zIndex: 99, // fixed定位z-index值
  },
})

// 控制下拉刷新
const downOptions = ref({
  use: true, // 是否启用下拉刷新; 默认true
  auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
  autoShowLoading: true, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
  // offset: 120,
  // inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
  // 	outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
  // 	bottomOffset: 20, // 当手指touchmove位置在距离body底部20upx范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
  // 	minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
  // beforeEndDelay: 0, // 延时结束的时长 (显示加载成功/失败的时长, android小程序设置此项结束下拉会卡顿, 配置后请注意测试)
  // bgColor: "#E75A7C", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
  // textColor: "#fff", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
  textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
  textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
  textLoading: '加载中 ...', // 加载中的提示文本
})

// 上拉加载函数
const upCallback = async (ms: any, page: any) => {
  console.log('上拉加载')

  await sleep(1000)
  if (ms.optUp.page.num === 1) {
    
    
    const arr = []
    for (let index = 0; index < 50; index++) {
      arr.push({
        id: Date.now(),
        label: index + '---title',
        value: index,
      })
    }
    data.value = arr;
    
    mescroll.value.endSuccess(10, true)

  } else {
    data.value = data.value.concat([
      {
        id: Date.now(),
        label: 100 + '---title',
        value: 100,
      },
    ])
    mescroll.value.endSuccess(3, false)
  }
}

// 下拉刷新函数
const downCallback = async (ms: any) => {
  await sleep(2000)

  console.log('下拉刷新', ms)

  // ms.endDownScroll()

  // ms.endSuccess(100)
}
const data = ref([] as any)

onLoad(() => {
  console.log('页面 onReady')
})
</script>

<style scoped>
page {
  height: 100%;
  background-color: #f4f4f4;
}
</style>
