import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { ref } from 'vue'
import { useInitStore } from './init'

interface TokenProps {
  accessToken: string
  refreshToken: string
}

// 定义 Store
export const useTokenStore = defineStore(
  'token',
  () => {
    // 会员信息
    const token = ref<TokenProps>()

    // 保存会员信息，登录时使用
    const setToken = (val: TokenProps) => {
      token.value = val
    }

    // 清理会员信息，退出时使用
    const clearToken = () => {
      const userStore = useUserStore()
      const initStore = useInitStore()

      userStore.clearProfile()
      initStore.setInit(false)
      token.value = undefined
    }

    // 记得 return
    return {
      token,
      setToken,
      clearToken,
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
