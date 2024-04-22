
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { ref } from 'vue'



// 定义 Store
export const useInitStore = defineStore(
  'init',
  () => {
    const isInit = ref(false)
  
    const setInit = (v:boolean) => {
      isInit.value = v
    }
    // 清理会员信息，退出时使用
   

    // 记得 return
    return {
      isInit,
      setInit,
    
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
