
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { ref } from 'vue'
import { getBaiDuAccessToken } from '@/api/ETC'

interface TokenProps{
  at:string | undefined
}

// 定义 Store
export const useEtcStore = defineStore(
  'etc',
  () => {
    // 会员信息
    const token = ref<string | undefined>()

    // 保存会员信息，登录时使用
    const setToken = (val: string) => {
      token.value = val
    }
    
  
    // 清理会员信息，退出时使用
    const clearETCAt = () => {
     
      token.value = undefined
    }

    const getAc = () => {
      getBaiDuAccessToken().then((res:any) => {
        token.value = res?.data?.access_token
      }).catch(error => {
        console.log(error);
      })
    }
    // 记得 return
    return {
      token,
      setToken,
      clearETCAt,
      getAc
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
