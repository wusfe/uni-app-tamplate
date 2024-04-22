<template>
  <view>
    <view class="h-200rpx bg-#007aff">
      <view class="overflow-hidden">
        <view class="px-2">
          <view
          class="bg-#ffffff rounded-20rpx mx-4 px-4 py-6  flex justify-between mt-60rpx"
        >
          <view>
            <view class="text-xl mb-1">{{ userStore?.profile?.realName }}</view>
            <view>{{ userStore?.profile?.orgName }}</view>
          </view>

          <view>
            <loadImg />
          </view>
        </view>
        </view>
      </view>
    </view>

    <view class="px-2 mt-110rpx">
      <view class="flex justify-between items-center bg-#ffffff py-3 mx-4 px-4 rounded-20rpx " @click="handleTo('/pages/news/news')">
        <view class="flex justify-center items-center">
          <i class="zhfont zh-xiaoxizhongxin color-#007aff text-40rpx mr-3"></i>
          <text>消息中心</text>
        </view>

        <uni-icons type="right" size="18" />
      </view>

      <view class="flex justify-between items-center bg-#ffffff py-3 mx-4 px-4 rounded-20rpx mt-30rpx" @click="handleTo('/pages/more-notice/more-notice')">
        <view class="flex justify-center items-center">
          <i class="zhfont zh-navicon-gggl color-#007aff text-36rpx mr-3"></i>
          <text>公告管理</text>
        </view>

        <uni-icons type="right" size="18" />
      </view>


      <view class="flex justify-between items-center bg-#ffffff py-3 mx-4 px-4 rounded-20rpx mt-30rpx" @click="handleTo('/pages/operation-task-add/operation-task-add')">
        <view class="flex justify-center items-center">
          <i class="zhfont zh-wofaqideshenpi color-#007aff text-40rpx mr-3"></i>
          <text>我发起的审批</text>
        </view>

        <uni-icons type="right" size="18" />
      </view>

      <!-- <view class="flex justify-between items-center bg-#ffffff py-3 mx-4 px-4 rounded-20rpx mt-30rpx">
        <view class="flex justify-center items-center">
          <i class="zhfont zh-daiwoshenpi color-#007aff text-40rpx mr-3"></i>
          <text>待我审批列表</text>
        </view>

        <uni-icons type="right" size="18" />
      </view> -->

      <view class="flex justify-between items-center bg-#ffffff py-3 mx-4 px-4 rounded-20rpx mt-30rpx" @click="handleTo('/pages/approval-from-me/approval-from-me')">
        <view class="flex justify-center items-center">
          <i class="zhfont zh-wocanyu color-#007aff text-40rpx mr-3"></i>
          <text>我参与的审批</text>
        </view>
        <uni-icons type="right" size="18" />
      </view>
    </view>


   <view class="mt-8">
    <view class="mx-4 px-2 ">
      <button type="primary" @click="handleUpdatePassword" plain>修改密码</button>
    </view>

    <view class="mx-4 px-2 mt-4">
      <button type="primary" @click="handleLogout">退出登录</button>
    </view>
   </view>

  </view>
</template>

<script setup lang="ts">
import loadImg from '@/components/circle-load/index.vue'
import { useTokenStore,useUserStore } from '@/stores' 

const handleTo = (v:string) => {
  uni.navigateTo({
    url: v
  })
}
const userStore = useUserStore()
const tokenStore = useTokenStore();

const handleLogout = () => {
  tokenStore.clearToken()
  uni.reLaunch({
    url: '/pages/login/login'
  })
}

const handleUpdatePassword = () => {
  uni.navigateTo({
    url: '/pages/update-password/update-password'
  })
}
</script>

<style scoped></style>
