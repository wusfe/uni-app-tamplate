<template>
  <view class="h-100% box-border bg login pt-120rpx">
    <view class="flex flex-col items-center">
      <view class="text-white font-600 text-8 mb-6"> 智慧轮渡</view>
      <logoLoad class="circle" innerUrl="/static/logo-small.png" />
      <!-- <image class="w-30 h-30" src="/static/logo.png" mode="aspectFill" /> -->

      <view
        class="pl-10 pr-10 pt-8 pb-4 w-55 mt-4 rounded-15rpx login-form-item"
      
      >
        <uni-forms ref="form" :modelValue="formValue" :rules="rules">
          <uni-forms-item label="" name="passwordOld">
            <uni-easyinput
              v-model="formValue.passwordOld"
              :inputBorder="false"
              placeholder="请输入当前密码"
            >
              <template #left>
                <i class="i-ep:lock text-6 color-white"></i>
              </template>
            </uni-easyinput>
          </uni-forms-item>

          <uni-forms-item label="" name="passwordNew">
            <uni-easyinput
              v-model="formValue.passwordNew"
              :inputBorder="false"
              placeholder="请输入新密码"
            >
              <template #left>
                <i class="zhfont zh-xinmima1 text-6 color-white"></i>
              </template>
            </uni-easyinput>
          </uni-forms-item>

          <uni-forms-item label="" name="confirmPassword">
            <uni-easyinput
              v-model="formValue.confirmPassword"
              :inputBorder="false"
              placeholder="请确认新密码"
            >
              <template #left>
                <i class="zhfont zh-querenmima text-6 color-white"></i>
              </template>
            </uni-easyinput>
          </uni-forms-item>

          <uni-forms-item label="" name="" class="mt-60rpx">
            <button type="primary" @click="submit()">确定</button>
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
import { postLoginApi, getUserBaseInfo, sysUserChangePwd } from '@/api'

// @ts-ignore
import logoLoad from '@/components/circle-load/index.vue'
import { ref } from 'vue'
import { useInitStore, useTokenStore } from '@/stores'
import { onReady } from '@dcloudio/uni-app'
const form = ref()
onReady(() => {
  form.value.setRules(rules)
})
const rules = {
  passwordOld: {
    rules: [
      {
        required: true,
        errorMessage: '当前密码不能为空',
      },
    ],
  },
  passwordNew: {
    rules: [
      {
        required: true,
        errorMessage: '新密码不能为空',
      },
    ],
  },
  confirmPassword: {
    rules: [
      {
        required: true,
        errorMessage: '确认密码不能为空',
      },
      {
        validateFunction: function (rule, value, data, callback) {
          if (data.passwordNew && data.passwordNew !== value) {
            callback('两次密码不一致')
          } else {
            return true
          }
        },
      },
    ],
  },
}
const formValue = ref({
  passwordOld: '',
  passwordNew: '',
  confirmPassword: '',
})

const tokenStore = useTokenStore()

const submit = async () => {
  try {
    await form.value.validate()
    uni.showLoading()
    const { confirmPassword, ...params } = formValue.value

    const result = await sysUserChangePwd(params)

    if (result.code === 200) {
      tokenStore.clearToken()
      uni.showToast({
        title: '修改成功，请重新登录',
        success(){
            uni.reLaunch({
              url: '/pages/login/login',
            })
        }
      })
    }
  } finally {
    uni.hideLoading()
  }
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
    border-bottom: 1px solid rgba(255,255,255,0.3) !important;
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

.circle :deep(.outer-image) {
  width: 200rpx;
  height: 200rpx;
}
.circle :deep(.outer) {
  width: 200rpx;
  height: 200rpx;
}
.circle :deep(.inner-image) {
  width: 100rpx;
  height: 62.5rpx;
}
.login-form-item {
  background-color: rgba(255,255,255,0.3);
}
.login-form-item :deep(.uni-easyinput__content) {
  background-color: transparent !important;
}
</style>
