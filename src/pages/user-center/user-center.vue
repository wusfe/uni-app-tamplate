<template>
  <view>
    <view class="h-200rpx bg-#007aff">
      <view class="overflow-hidden">
        <view class="px-2">
          <view
          class="bg-#ffffff rounded-20rpx mx-4 px-4 py-6  flex justify-between mt-60rpx"
        >
          <view>
            <view class="text-xl mb-1">管理员</view>
            <view>技术研发部-产品</view>
          </view>

          <view>
            <loadImg />
          </view>
        </view>
        </view>
      </view>
    </view>

    <view class="px-2 mt-110rpx">
      <view class="flex justify-between items-center bg-#ffffff py-3 mx-4 px-4 rounded-20rpx ">
        <view class="flex justify-center items-center">
          <i class="zhfont zh-xiaoxizhongxin color-#007aff text-40rpx mr-3"></i>
          <text>消息中心</text>
        </view>

        <uni-icons type="right" size="18" />
      </view>

      <view class="flex justify-between items-center bg-#ffffff py-3 mx-4 px-4 rounded-20rpx mt-30rpx">
        <view class="flex justify-center items-center">
          <i class="zhfont zh-navicon-gggl color-#007aff text-36rpx mr-3"></i>
          <text>公告管理</text>
        </view>

        <uni-icons type="right" size="18" />
      </view>


      <view class="flex justify-between items-center bg-#ffffff py-3 mx-4 px-4 rounded-20rpx mt-30rpx">
        <view class="flex justify-center items-center">
          <i class="zhfont zh-wofaqideshenpi color-#007aff text-40rpx mr-3"></i>
          <text>我发起的审批</text>
        </view>

        <uni-icons type="right" size="18" />
      </view>

      <view class="flex justify-between items-center bg-#ffffff py-3 mx-4 px-4 rounded-20rpx mt-30rpx">
        <view class="flex justify-center items-center">
          <i class="zhfont zh-daiwoshenpi color-#007aff text-40rpx mr-3"></i>
          <text>待我审批列表</text>
        </view>

        <uni-icons type="right" size="18" />
      </view>

      <view class="flex justify-between items-center bg-#ffffff py-3 mx-4 px-4 rounded-20rpx mt-30rpx">
        <view class="flex justify-center items-center">
          <i class="zhfont zh-wocanyu color-#007aff text-40rpx mr-3"></i>
          <text>我参与的审批</text>
        </view>

        <uni-icons type="right" size="18" />
      </view>


    </view>


    
    <view class="mx-4 px-2 mt-8">
      <button type="primary">退出登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import loadImg from '@/components/circle-load/index.vue'
</script>

<style scoped></style>
