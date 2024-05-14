<template>
  <view class="flex flex-col h-100%" @touchstart="handleTouchstart" @touchend="handleTouchend">
    <view class="shrink-0">
      <view class="flex justify-between items-center bg-#ffffff pt-2 pb-2 pl-3 pr-3">
        <view class="text-color-primary">今日统计：{{ data?.length || '' }}</view>

        <!-- <view class="flex justify-between items-center">
          <text class="text-color-primary text-xs mr-1">选择时间</text>

          <i class="zhfont zh-xuanzeshijian"> </i>
        </view> -->
      </view>
    </view>

    <view class="pb-3">
      <view v-for="v in data" class="pl-3 pr-3 mt-3">
          <view
            class="bg-#ffffff px-4 py-4 rounded-20rpx border-1px border-color-gray-3 border-solid"
          >
            <view class="flex justify-between items-center">
              <view class="color-gray-4">船号：{{ v?.shipCode }}</view>

             
              <!-- <view class="color-gray-4">
                {{v?.isDangerous === 0?'非':''}}危险品车</view> -->
            </view>

            <view class="flex items-center justify-around mt-4">
              <view class="flex flex-col items-center">
                <view
                  class="w-100rpx h-100rpx bg-#007aff rounded-50% mb-2 flex justify-center items-center"
                >
                  <i class="zhfont zh-icon_shenti_nan color-#ffffff text-56rpx"></i>
                </view>
                <view class="color-gray-4">{{v?.peopleNumber}}人</view>
              </view>
              <view class="flex flex-col items-center">
                <view
                  class="w-100rpx h-100rpx bg-#12C11D rounded-50% mb-2 flex justify-center items-center"
                >
                  <i class="zhfont zh-chuzu color-#ffffff text-56rpx"></i>
                </view>
                <view class="color-gray-4">{{v?.carNumber}}辆</view>
              </view>
              <view class="flex flex-col items-center">
                <view
                  class="w-100rpx h-100rpx bg-#BF9539 rounded-50% mb-2 flex justify-center items-center"
                >
                  <i class="zhfont zh-qiandai color-#ffffff text-56rpx"></i>
                </view>
                <view class="color-gray-4">{{v?.money}}元</view>
              </view>
            </view>

            <view class="text-right mt-35rpx">
                <text class="font-size-30rpx">到港时间：{{ v?.dataTime }}</text>
              </view>
          </view>
        </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onHide, onLoad, onPageScroll, onReachBottom, onShow, onUnload } from '@dcloudio/uni-app'
import { ref, computed } from 'vue'
import { sleep, useMescroll } from '@/composables'
import { peopleandcarnumberListDay } from '@/api'

const searchInput = ref({})

const data = ref([] as any)

const getData = () => {
  peopleandcarnumberListDay({
    ...searchInput.value,
  }).then((res) => {
    
    data.value= res?.result || []

    if(isActive.value && !isTouchStart.value){
      startTimer()
      isActive.value = false
    }
  })
}

onLoad(() => {
  getData()
})


// --------------- start
const timer = ref()

const startTimer = () => {
  timer.value = setInterval(() => {
 
    getData()
   
  }, 10 * 60 * 1000)
}
const startRestartTimer = () => {
  restartTimer.value = setTimeout(() => {
    startTimer()
  }, 3000)
}

const clearRefresh = () => {
  clearInterval(timer.value)
  timer.value = null;
}

const clearRestartRefresh = () => {
  clearTimeout(restartTimer.value)
  restartTimer.value = null;
}

const restartTimer = ref()

// 是否从后台进入到展示
const isActive = ref(false)

// 是否初始加载
const isLoad = ref(false)

// 是否手指触摸
const isTouchStart = ref(false)

//是否打开弹框
const isOpen = ref(false)

const handleTouchstart = () => {
  isTouchStart.value = true
  clearRestartRefresh()
  clearRefresh()
}

const handleTouchend = () => {
  isTouchStart.value = false
  clearRestartRefresh()
  clearRefresh()
  if(!isOpen.value){
    startRestartTimer()
  }

}

// 弹框的展示与关闭回调
const handleMask = (s:boolean) => {
 
 isOpen.value = s

 clearRestartRefresh()
 clearRefresh()

 if(s){
  
 }else {
   startRestartTimer()
 }
}

onShow(() => {
 
 if(!isLoad.value){
   setTimeout(() => {
   isActive.value = true
   
   getData()
 }, 0)
 }
 
})

onLoad(() => {
  isLoad.value = true
  startTimer()
})

onHide(() => {
  isLoad.value = false
  clearRefresh()
  clearRestartRefresh()
  
})

onUnload(() => {
  isLoad.value = false
  clearRefresh()
  clearRestartRefresh()
})


// ---------------  end

</script>

<style scoped></style>
