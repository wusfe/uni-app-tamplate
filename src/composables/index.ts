import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'
export * from './useMescroll'
export const sleep = (s:number) => {
  return new Promise((r, c) => {
    setTimeout(() => {
        r(1)
    }, s || 2000)
  })
}
 

/**
 * 猜你喜欢组合式函数
 */
export const useGetBarHeight = () => {
  const topHeightRef = ref(0);
  const bottomHeightRef = ref(0);
  onLoad( async () => {
    // await seelp(5000)
  console.log('hook');
  
   const data = uni.getSystemInfoSync() as any;

   topHeightRef.value = data?.statusBarHeight as any;

   bottomHeightRef.value = 30;

  })

  return {
    topHeightRef,
    bottomHeightRef,
  }
}


export const useGetSystemInfo = () => {
  const systemInfoRef = ref()

  onLoad(async () => {
    systemInfoRef.value = await uni.getSystemInfo()
  })

  return {
    systemInfoRef,
  }
}
