
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserResult{
  account:string,
  nickName:string,
  sex: Number,
  realName:string,
  posName:string
}
// 定义 Store
export const useUserStore = defineStore(
  'user',
  () => {
    // 会员信息
    const profile = ref<UserResult>()

    // 保存会员信息，登录时使用
    const setUserInfo = (val: UserResult) => {
      profile.value = val
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
