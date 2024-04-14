<script setup lang="ts">
import { onLaunch, onShow, onHide, onLoad } from '@dcloudio/uni-app'
import { useTokenStore, useUserStore } from '@/stores'
import { getUserBaseInfo } from '@/api'
onLaunch(async (router) => {
  console.log('App Launch', '程序启动')

  console.log(router)

  const tokenStore = useTokenStore()

  // 存在token
  if (tokenStore?.token?.accessToken) {
    if (router?.path?.includes('/login/login')) {
      uni.reLaunch({
        url: '/pages/home/home',
      })
    }
    // 跳转优化

    const userStore = useUserStore()
    if (!userStore?.profile) {
      const userInfo = await getUserBaseInfo()
      userStore?.setUserInfo(userInfo?.result)
    }
  } else {
    if (!router?.path?.includes('/login/login')) {
      uni.reLaunch({
        url: '/pages/login/login',
      })
    }
  }
})

onShow(() => {
 
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import '@/static/iconfont.css';
.text-color-primary {
  color: #007aff;
}
$navHeight: calc(var(--status-bar-height) + 44px);
page {
  height: 100%;
  background-color: #f4f4f4;
}
.b1 {
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    background-color: #e5e5e5;
  }
}
.br1 {
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    content: '';

    background-color: #e5e5e5;
  }
}
.bb1 {
  position: relative;
  &::after {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    background-color: #e5e5e5;
  }
}
.e1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

uni-button[size='mini'] {
  &.cbtn {
    padding: 0.1rem 0.8rem;
    line-height: 1.5;
    margin-left: 0;
    margin-right: 0;
  }
}
.zh-nav-bar .uni-navbar--fixed {
  z-index: 999 !important;
}

.out-nav-wrap {
  height: calc(100% - $navHeight);
}

.btn-no-border {
  border-radius: 0 !important;
}
.btn-no-border::after {
  border: none !important;
  border-radius: 0 !important;
}

.text-align-last-justify {
  text-align-last: justify;
}

.red {
  color: $uni-color-error;
}

.pric {
  color: $uni-color-primary;
}
.scolor{
  color: $uni-color-success;
}
.text-danger{
  color: $uni-color-error;
}
</style>
