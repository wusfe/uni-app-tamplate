<template>
  <view class="h-100% box-border bg login pt-15">
    <view class="flex flex-col items-center">
      <view class="text-white font-600 text-8 mb-6"> 智慧轮渡</view>
      <image class="w-30 h-30" src="/static/logo.png" mode="aspectFill" />

      <view class="pl-10 pr-10 pt-8 pb-4 w-55 mt-4 rounded-15rpx" bg="[rgba(255,255,255,0.3)]">
        <uni-forms ref="form" :rules="rules">
          <uni-forms-item name="">
            <uni-easyinput :inputBorder="false" disableColor="transparent" placeholder="请输入姓名">
              <template #left>
                <i class="i-ep:user text-6 color-white"></i>
              </template>
            </uni-easyinput>
          </uni-forms-item>

          <uni-forms-item label="" name="">
            <uni-easyinput :inputBorder="false" disableColor="transparent" placeholder="请输入姓名">
              <template #left>
                <i class="i-ep:lock text-6 color-white"></i>
              </template>
            </uni-easyinput>
          </uni-forms-item>

          <uni-forms-item label="" name="">
            <button type="primary" @click="submit()">登录</button>
          </uni-forms-item>
        </uni-forms>
      </view>
    </view>

    <view class="text-white text-center position fixed bottom-5 w-100%"
      >南京众立盛电子科技有限公司</view
    >
  </view>
</template>

<script setup lang="ts">
const rules = [] as any

const submit = () => {
  console.log('提交')
}


</script>

<style lang="scss">
.login {
  background-image: url('/static/login-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.login {
  .uni-easyinput__content {
    background-color: transparent !important;
    border-color: transparent !important;
    border-bottom: 1px solid #ffffff !important;
    padding: 8rpx 0;
    input {
      color: #ffffff;
    }
    .uni-easyinput__placeholder-class {
      color: #ffffff;
      font-size: 30rpx;
    }
  }
}
</style>
