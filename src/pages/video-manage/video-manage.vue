<template>
  <!-- <uni-nav-bar class="zh-nav-bar" backgroundColor="rgb(248, 248, 248)"  color="rgb(0, 0, 0)" left-icon="left" right-icon="cart" title="标题" :border="false" statusBar fixed/> -->
  <view class="flex flex-col h-100%">
    <!-- 头部 -->
    <view class="bg-#ffffff shrink-0">
      <dropDownBox class="pt-3">
        <template v-slot:top>
          <view class="pl-4 pr-4 pb-3">
            <searchBar v-model="searchInput.searchKey" placeholder="输入站点名称" radius="60" @confirm="handleConfirm" @clear="handleConfirm" />
          </view>
        </template>
      
      </dropDownBox>
    </view>

    <!-- <video src="ezopen://open.ys7.com/K81920045/1.hd.live"></video> -->

    
    <view class="grow-1 ">

      <view class="pt-2 min-h-0 pb-2 px-4">

      <uni-row :gutter="20">
        <uni-col class="data-item mb-20rpx" :span="12" v-for="v in data" :key="v.id">

          <view class="bg-#ffffff px-3 py-4" @click='handleVideoDetail(v)'>

            <image src="/static/monitor.png" alt="" class="w-100%" mode="widthFix"> </image>

        <view class="e1">名称:{{ v.videoName }}</view>
        <view>通道:{{ v.videoChannel }}</view>

          </view>
        </uni-col>
      
      </uni-row>
     
    </view>
  </view>
</view>
  <uni-popup style="z-index: 999" ref="popup" type="bottom">
    <view class="bg-#ffffff">
      <!-- <view class="b1">
        <button class="btn-no-border">按员工查</button>
      </view>

      <view class="b1">
        <button class="btn-no-border">资产流水</button>
      </view> -->

      <view class="b1" @click="handleToPurchase">
        <button class="btn-no-border">
          <text>资产购入</text>
          <uni-icons
          type="arrow-right"
          
         
        />
        </button>
        
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="tsx">
import singleSelect from '@/components/single-select/index.vue'
import searchBar from '@/components/search-bar/index.vue'
import { sleep, useMescroll } from '@/composables'
import { computed, ref } from 'vue'
import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import dropDownScrollView from '@/components/drop-down-scroll-view/index.vue'
import dropDownBox from '@/components/drop-down-scroll-view/drop-down-box.vue'
import { onNavigationBarButtonTap } from '@dcloudio/uni-app'
import { useDictStore } from '@/stores'
import { getGoodsinforList, shipinforPage, videomonitorList } from '@/api'

const dictStore = useDictStore();


const goodTypeList = computed(() => {
  return dictStore.goodtype?.map((item:any) => ({
    lable: item.value,
    value: item.code
  }))
})

const handleConfirm = () => {
  upCallback()
}


onLoad(() => {
  upCallback()
})


const searchInput = ref({
  searchKey: ''
}) 

const data = ref<any>([])


// 上拉加载函数
const upCallback = async (ms?: any) => {
  try {
    const res = await videomonitorList({
      ...searchInput.value,
    })
    data.value = res?.result || []
    // data.value = isUp.value ? res?.result?.items : data.value.concat(res?.result?.items || [])
    // mescroll.value.endSuccess(res?.result?.items?.length, res?.result?.totalPages)
   
    // mescroll.value.endSuccess(0, false)

    // isUp.value = false
  } catch (_) {
    // ms.endErr()
  }
}

const handleVideoDetail = (v:any) => {
  uni.navigateTo({ url: `/pages/video-detail/video-detail?ac=${v.videoAccessToken}&url=${v.videoAddress}`,  })
}
</script>

<style lang="scss" scoped>
.text-align-last-justify {
  text-align-last: justify;
}

</style>
