<template>
  <view class="h-100% box-border bg login pt-140rpx">
    <view class="flex flex-col items-center">
      <view class="text-white font-600 text-8 mb-6"> 智慧轮渡</view>
      <logoLoad class="circle" innerUrl="/static/logo-small.png"/>
      <!-- <image class="w-30 h-30" src="/static/logo.png" mode="aspectFill" /> -->

      <view class="pl-10 pr-10 pt-8 pb-4 w-55 mt-4 rounded-15rpx login-form-item" >
        <uni-forms ref="form" :modelValue="formValue" :rules="rules">
          <uni-forms-item name="account">
            <uni-easyinput v-model="formValue.account" :inputBorder="false"  placeholder="请输入账号">
              <template #left>
                <i class="i-ep:user text-6 color-white"></i>
              </template>
            </uni-easyinput>
          </uni-forms-item>

          <uni-forms-item label="" name="password">
            <uni-easyinput v-model="formValue.password"  :inputBorder="false" type="password"  placeholder="请输入密码">
              <template #left>
                <i class="i-ep:lock text-6 color-white"></i>
              </template>
            </uni-easyinput>
          </uni-forms-item>

          <uni-forms-item label="" name="" class="mt-66rpx">
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
import { postLoginApi, getUserBaseInfo } from '@/api';

// @ts-ignore
import  {sm2} from 'sm-crypto'
import logoLoad from '@/components/circle-load/index.vue';
import { ref } from 'vue';
import { useInitStore, useTokenStore, useUserStore } from '@/stores'
  const publicKey = `0484C7466D950E120E5ECE5DD85D0C90EAA85081A3A2BD7C57AE6DC822EFCCBD66620C67B0103FC8DD280E36C3B282977B722AAEC3C56518EDCEBAFB72C5A05312`;


const rules = {
  account:{
    rules:[
    {
				required: true,
				errorMessage: '账号不能为空',
			},
    ]
  },
  password:{
    rules:[
    {
				required: true,
				errorMessage: '密码不能为空',
			},
    ]
  }
}
const formValue = ref({
  account: 'superadmin',
  password: "123456"
})

const tokenStore = useTokenStore()
const init = useInitStore()
const form = ref()
const submit = async () => {

  
  try {
    await form.value.validate()
    uni.showLoading({
      title:'登陆中',
    })

  const result = await postLoginApi({
    ...formValue.value,
    // @ts-ignore
    password: sm2.doEncrypt(formValue.value.password, publicKey, 1)
  })

  if(result.code === 200) {
    tokenStore.setToken(result.result)
    init.setInit(true)
  }

  uni.hideLoading();

  uni.reLaunch({
    url:'/pages/home/home',
  })


  const userStore = useUserStore();
  const userInfo = await getUserBaseInfo();
  userStore.setUserInfo(userInfo?.result)
  }finally{

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

.circle :deep(.outer-image){
  width: 200rpx;
  height: 200rpx;
}
.circle :deep(.outer){
  width: 200rpx;
  height: 200rpx;
}
.circle :deep(.inner-image){
  width: 100rpx;
  height: 62.5rpx;

}
.login-form-item {
  background-color: rgba(255,255,255,0.3);
}
.login-form-item :deep(.uni-easyinput__content){
  background-color:transparent!important;
  // background-color:transparent!important;
  
}
</style>
