<template>
  <view class="home bg-#f5f5f5 h-100% overflow-y-auto pb-46rpx box-border">
    <bar-area area="top" />
    <!-- 欢迎行 -->
    <view class="flex justify-between pb-3 pt-3 bg-white pl-3 pr-3">
      <view class="flex justify-center items-center">
        <text>欢迎</text> <text class="text-red-700">{{ userStore.profile?.posName }}</text
        >，<text>{{ userStore.profile?.realName }}</text>
        <!-- <text>登录</text> -->
        <!-- <button size="mini" type="primary" plain >登录</button> -->
      </view>

      <auth-btn @click="handletick(1)" ac="orderinfor:check">
        <view class="flex justify-center items-center text-red-700">
          <uni-icons type="scan" color="" size="28"></uni-icons>
          <text class="ml-1">验票</text>
        </view>
      </auth-btn>
    </view>
    <!-- 轮播图 -->

    <view>
      <swiper class="swiper-box">
        <swiper-item>
          <view class="swiper-item">
            <image class="w-750rpx h-364rpx" src="/static/home-swiper.png" mode="widthFix" />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 公告 -->
    <view class="flex flex-row items-center pl-3 pr-3 mt-2">
      <view class="text-red-700 pt-1 pb-1 pl-3 pr-3 bg-red-2 rounded-12rpx shrink-0">公告</view>

      <view class="flex-1">
        <uni-notice-bar
          :speed="25"
          class="notice"
          single
          scrollable
          color="#000000"
          background-color="transparent"
          :text="notice"
        />
      </view>
      <view class="text-red-700 shrink-0" @tap="handleMore()">更多</view>
    </view>

    <view class="pl-3 pr-3 mt-3">
      <uni-card is-full :is-shadow="false" margin="0" padding="0" :border="false">
        <view class="flex pt-4 pb-2">
          <view
            class="w-33.33% text-center slide-border"
            @click="handleUrl('/pages/approval-from-me/approval-from-me')"
          >
            <view class="mb-1">
              <uni-badge
                :is-dot="taskNum > 0"
                :text="taskNum > 0 ? '1' : ''"
                absolute="rightTop"
                size="small"
              >
                <text class="text-70rpx text-color-#000000">{{ taskNum }}</text>
              </uni-badge>
            </view>
            <view class="text-color-#000000">我的代办</view>
          </view>
          <view class="w-33.33% text-center slide-border">
            <view class="mb-1">
              <view class="h-58rpx relative">
                <view
                  class="w-56rpx h-56rpx mx-auto translate-y--8rpx rounded-10rpx overflow-hidden relative"
                >
                  <view
                    class="position-absolute left-0 top-0 bottom-0 w-50%"
                    :style="{ backgroundColor: todayColor[0] }"
                  ></view>
                  <view
                    class="position-absolute right-0 top-0 bottom-0 w-50%"
                    :style="{ backgroundColor: todayColor[1] }"
                  ></view>
                </view>
              </view>
            </view>
            <view class="text-color-#000000">今日颜色</view>
          </view>
          <view class="w-33.33% text-center" @click="handleUrl('/pages/news/news')">
            <view class="mb-1">
              <uni-badge
                :is-dot="unReadNum > 0"
                :text="unReadNum > 0 ? '1' : ''"
                absolute="rightTop"
              >
                <text class="text-70rpx text-color-#000000">{{ unReadNum }}</text>
              </uni-badge>
            </view>
            <view class="text-color-#000000">我的消息</view>
          </view>
        </view>
      </uni-card>
    </view>

    <view class="pl-3 pr-3 mt-3 overflow-x-hidden">
      <uni-row :gutter="60">
        <uni-col
          class="mt-3"
          :span="6"
          v-for="(item, index) in menu"
          v-show="isShow(item.auth as any)"
          :index="index"
          :key="index"
          @click="handleNavigateTo(item)"
        >
          <view class="flex flex-col">
            <view
              :style="{ backgroundColor: item.bg }"
              class="pt-4 pb-4 flex justify-center items-center rounded-10rpx mb-1 shrink-0"
            >
              <component :is="item.icon" class="text-size-60rpx"></component>
            </view>
            <text class="text-center text-sm">{{ item.text }}</text>
          </view>
        </uni-col>
      </uni-row>
    </view>

    <bar-area area="bottom" />
  </view>

  <!-- <uni-popup ref="popup"  background-color="#fff" type="bottom" safe-area @maskClick="handlecancelQr">
    
    <view class="qr-wrap">

      <view class="shrink-0 flex justify-enf items-center bb1 py-20rpx px-20rpx">
          <view @click="handlecancelQr">关闭</view>
        </view>
      <view class="grow-1 overflow-y-auto min-h-0">
        <qr v-if="open"  :order-number="orderNumber"/>
      </view>
    </view>
 
</uni-popup> -->

  <qrPopup ref="qrPopupRef" :showTicket="showTicket" :isRefund="isRefund"></qrPopup>
</template>

<script setup lang="tsx">
import { useUserStore } from '@/stores'
import { getNewsNotice, getNumberTask, getUnReadList, getTodayColorAll } from '@/api'
import { ref, useSlots } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import qrPopup from '@/components/qr-popup/index.vue'
import authBox from '@/components/auth-box/index.vue'
// 报错
// import NavigationBar from "@/components/navigation-bar"
const userStore = useUserStore()
const qrPopupRef = ref()

const isRefund = ref(false)
const menu = [
  {
    icon: <i class="zhfont zh-jinridingdan1 text-color-white"></i>,
    bg: '#032585EE',
    text: '今日订单',
    url: '/pages/today-order/today-order',
    auth: 'orderinfor:today',
  },
  {
    icon: <i class="zhfont zh-lishidingdan text-color-white"></i>,
    bg: '#52CC6F',
    text: '历史订单',
    url: '/pages/history-order/history-order',
    auth: 'orderinfor:page',
  },
  {
    icon: <i class="zhfont zh-yanpiao text-color-white"></i>,
    bg: '#FE7849',
    text: '验票',
    onClick: () => handletick(2),
    auth: 'orderinfor:check',
  },
  {
    icon: <i class="zhfont zh-tiaodu1 text-color-white"></i>,
    bg: '#C465E2',
    text: '调度',
    url: '/pages/dispatch-manage/dispatch-manage',
    auth: 'dispatchinfor:page',
  },
  {
    icon: <i class="zhfont zh-cangkuguanli text-color-white"></i>,
    bg: '#5756D7',
    text: '仓库管理',
    url: '/pages/store-manage/store-manage',
    auth: 'goodsinfor:page',
  },
  {
    icon: <i class="zhfont zh-shipinjiankong text-color-white"></i>,
    bg: '#FF9502',
    text: '视频监控',
    url: '/pages/video-manage/video-manage',
    auth: 'videomonitor:page',
  },
  {
    icon: <i class="zhfont zh-caiwuguanli text-color-white"></i>,
    bg: '#5AC8FA',
    text: '财务管理',
    // url: '/pages/finance-manage/finance-manage'
    url: '/pages/finance-statistics/finance-statistics',
    auth: 'orderinfor:finance',
  },
  {
    icon: <i class="zhfont zh-gerencheyuan text-color-white"></i>,
    bg: '#FF2D55',
    text: '计人计车',
    // url: '/pages/steamer-arrival/steamer-arrival'
    url: '/pages/steamer-arrival/steamer-arrival',
    auth: 'peopleandcarnumber:page',
    // url: '/pages/mancar-manage/mancar-manage'
  },
  {
    icon: <i class="zhfont zh-dingdantongji text-color-white"></i>,
    bg: '#00E5FF',
    text: '订单统计',
    url: '/pages/order-statistics/order-statistics',
    auth: 'orderinfor:statistics',
  },
  {
    icon: <i class="zhfont zh-fangpengzhuang text-color-white"></i>,
    bg: '#2585EE',
    text: '防碰撞',
    url: '/pages/anti-collision/anti-collision',
    auth: 'orderinfor:Anticollision',
  },
  {
    icon: <i class="zhfont zh-n text-color-white"></i>,
    bg: '#651FFF',
    text: '通知消息',
    url: '/pages/more-notice/more-notice',
    auth: 'sysNotice:page',
  },
  {
    icon: <i class="zhfont zh-Ship- text-color-white"></i>,
    bg: '#CBA43F',
    text: '渡船营运',
    url: '/pages/material-manage/material-manage',
    auth: 'taskinfor:page',
  },
  {
    icon: <i class="zhfont zh-icon text-color-white"></i>,
    bg: '#347CAF',
    text: '货牌录入',
    url: '/pages/add-license/add-license',
  },
  {
    icon: <i class="zhfont zh-tuikuan text-color-white"></i>,
    bg: '#DE868F',
    text: '退款',
    onClick: () => handletick(3),
    auth: 'orderinfor:delete',
  },
  // pages/steamer-arrival/steamer-arrival
]

const handleMore = () => {
  uni.navigateTo({
    url: '/pages/more-notice/more-notice',
  })
}

const isShow = (auth: string) => {
  if (!auth) {
    return true
  }
  return userStore?.profile?.buttons?.some((item) => item === auth)
}
// const handleTo = (type: string) => {
//   if (type === 'approval') {
//     uni.navigateTo({ url: '/pages/approval/approval' })
//   }
// }

const handleUrl = (url: any) => {
  uni.navigateTo({
    url,
  })
}
const notice = ref('')

const taskNum = ref(0)

const unReadNum = ref(0)

const todayColor = ref('')

const todayColorFn = async () => {
  const res = await getTodayColorAll()
  todayColor.value = res?.result?.map((item: any) => item?.tcolor)
}
const unReadFn = async () => {
  const res = await getUnReadList()

  unReadNum.value = res?.result?.length || 0
}
const noticeFn = async () => {
  const res = await getNewsNotice()
  notice.value = res?.result.title || ''
  // var pattern = /<[^>]+>|style="[^"]+"/g
  // notice.value = res?.result?.content?.replace(pattern, '')
}

const taskNumFn = async () => {
  const res = await getNumberTask()
  taskNum.value = res?.result || 0
}

const handleNavigateTo = (item: any) => {
  if (item.url) {
    uni.navigateTo({
      url: item.url,
    })
  }
  if (item.onClick) {
    item.onClick()
  }
}

const showTicket = ref(true)
const handletick = (type: any) => {
  isRefund.value = type == 3
  showTicket.value = type !== 3
  
  if (!userStore?.profile?.buttons?.some((item) => item === 'orderinfor:check')) {
    uni.showModal({
      title: '暂无操作权限',
      content: '请联系管理员',
      showCancel: false,
    })
  } else {
    if(type === 3){
      qrPopupRef.value.qrcode(1)
    }else{
      qrPopupRef.value.open(type)
    }
    
  }
}

// const handleImage = (url:any) => {
//   console.log(222, url);

// }

onShow(() => {
  unReadFn()
  taskNumFn()
  noticeFn()
})

onLoad(async () => {
  // noticeFn()
  // taskNumFn
  // unReadFn()
  todayColorFn()

  // let pages = getCurrentPages();
  // 		let current = pages[pages.length - 1]; //上一个页面

  //     (current as any).setImage = (url:any) => {
  //       handleImage(url)
  //     }
})
</script>

<style scoped>
.status_bar {
  height: var(--status-bar-height);
}
.notice {
  margin-bottom: 0 !important;
  padding: 0 20rpx !important;
}

.slide-border {
  border-right: 1px solid #f5f5f5;
}

.qr-wrap {
  height: 90vh;
  /* #ifdef H5 */
  padding-top: calc(var(--window-top) + var(--status-bar-height));
  /* #endif */
  /* #ifdef APP */
  padding-top: calc(var(--window-top));
  /* #endif */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
