<template>
  <view class="home bg-#f5f5f5 h-100vh">
    <navigation-bar />
    <!-- 欢迎行 -->
    <view class="flex justify-between pb-3 pt-3 bg-white pl-3 pr-3">
      <view class="flex justify-center items-center">
        <text>欢迎董事长，</text>

        <text>登录</text>
        <!-- <button size="mini" type="primary" plain >登录</button> -->
      </view>

      <view class="flex justify-center items-center text-red-700">
        <uni-icons type="scan" color="" size="28"></uni-icons>
        <text class="ml-1">验票</text>
      </view>
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
    <view class="flex flex-row items-center   pl-3 pr-3 mt-3">
      <view class="text-red-700 pt-1 pb-1 pl-3 pr-3 bg-red-2 rounded-12rpx shrink-0">公告</view>

      <view class="flex-1">
        <uni-notice-bar class="notice" single scrollable color="#000000" background-color="transparent"
				text="uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。" />

      </view>
      <view class="text-red-700 shrink-0">更多</view>
    </view>

    <!-- 1 -->

    <view class="pl-3 pr-3 mt-3 ">
      <uni-card is-full :is-shadow="false" margin="0" padding="0" :border="false">
          <view class="flex pt-7 pb-4">
              <view class="w-33.33% text-center slide-border">
                <view class="mb-1">
                  <uni-badge class="pr-2" :is-dot="true" :text="'1'" absolute="rightTop" >
                    <text class="text-70rpx text-color-#000000">3</text>
                  </uni-badge>
                </view>
                <view class="text-color-#000000">我的代办</view>
              </view>
              <view class="w-33.33% text-center slide-border">
                <view class="mb-1">
                  <uni-badge class="pr-2" :is-dot="true" :text="'1'" absolute="rightTop" >
                    <text class="text-70rpx text-color-#000000">6</text>
                  </uni-badge>
                </view>
                <view class="text-color-#000000">今日审批</view>
              </view>
              <view class="w-33.33% text-center" >
                <view class="mb-1">
                  <uni-badge class="pr-2" :is-dot="true" :text="'1'" absolute="rightTop" >
                    <text class="text-70rpx text-color-#000000">8</text>
                  </uni-badge>
                </view>
                <view class="text-color-#000000">我的消息</view>
              </view>
          </view>
      </uni-card>
    </view>

    <view>

      <uni-grid :column="4" :highlight="true" >
				<uni-grid-item v-for="(item, index) in menu" :index="index" :key="index">
					<view class="grid-item-box" style="background-color: #fff;">
						<uni-icons type="image" :size="30" color="#777" />
						<text class="text">文本信息</text>
					</view>
				</uni-grid-item>
			</uni-grid>
    </view>
  </view>
</template>

<script setup lang="ts">
// 报错
// import NavigationBar from "@/components/navigation-bar"
import NavigationBar from '@/components/navigation-bar/index.vue';

const menu = [
  {
    icon: '',
    text: '今日订单'
  },
  {
    icon: '',
    text: '历史订单'
  },
  {
    icon: '',
    text: '验票'
  },
  {
    icon: '',
    text: '调度'
  },
  {
    icon: '',
    text: '仓库管理'
  },
  {
    icon: '',
    text: '视频监控'
  },
  {
    icon: '',
    text: '财务管理'
  },
  {
    icon: '',
    text: '计人计车'
  },
  {
    icon: '',
    text: '订单统计'
  },
  {
    icon: '',
    text: '仿碰撞'
  },
  {
    icon: '',
    text: '通知消息'
  },
  {
    icon: '',
    text: '渡船营运'
  },
]
</script>

<style scoped>
.status_bar {
  height: var(--status-bar-height);
}
.notice {
  margin-bottom: 0!important;
  padding:0 20rpx!important;
 
}

.slide-border{
  border-right: 1px solid #f5f5f5;
}
</style>
