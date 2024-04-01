import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

/**
 * 猜你喜欢组合式函数
 */
export const useGetNavigationBarHeight = () => {
  const navigationBarHeight = ref<any>(0)

  onLoad(async () => {
   const data = await uni.getSystemInfo();

    navigationBarHeight.value = data?.statusBarHeight;

  })

  return navigationBarHeight
}



export const useGetTabBarHeight = () => {
  const tabBarHeight = ref<any>(0)

  onLoad(async () => {
   const data = await uni.getSystemInfo();

   tabBarHeight.value = data?.windowBottom;

  })

  return tabBarHeight
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
