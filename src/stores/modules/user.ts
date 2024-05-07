
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserResult{
  account:string,
  nickName:string,
  sex: Number,
  realName:string,
  posName:string,
  buttons: string[]
  orgName?:string
}
// 定义 Store
export const useUserStore = defineStore(
  'user',
  () => {
    // 登录信息
    const userLoginInfo = ref<{
      account: string;
      password: string;
    }>()

    const setUserLoginInfo = (data: {
      account: string;
      password: string;
    }) => {
      userLoginInfo.value = data
    }
    const clearUserLoginInfo = () => {
      userLoginInfo.value = undefined
    }
    // 会员信息
    const profile = ref<UserResult>()

    // 保存会员信息，登录时使用
    const setUserInfo = (val: UserResult) => {
      profile.value = val
    }
    
    
    const isAuth = (v:string) => {
      console.log(v);
      
      return profile.value?.buttons.some(item => item === v)
    }
    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setUserInfo,
      clearProfile,
      isAuth,
      userLoginInfo,
      setUserLoginInfo,
      clearUserLoginInfo
    }
  },
  {
    // 网页端配置
    // persist: true,
    // 小程序端配置
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
