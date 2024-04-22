
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { ref } from 'vue'

interface SysProps {
    progress?: any
}

// 定义 Store
export const useSysStore = defineStore(
  'sys',
  () => {
    const sys = ref()
  
    const setSys = (v:SysProps) => {
        sys.value = v
    }
    // 清理会员信息，退出时使用
   

    // 记得 return
    return {
      sys,
      setSys,
    
    }
  },
)
