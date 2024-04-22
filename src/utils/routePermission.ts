// 登录页面
import { useUserStore } from '@/stores'

const loginPage = '/pages/Login/Login'

// 页面白名单
// const whiteList = [
// 	'/pages/Login/Login', '/pages/common/webview/index',
// 	"/pages/today-order/today-order",
// 	"pages/history-order/history-order",
// 	"pages/dispatch-manage/dispatch-manage",
// 	"pages/store-manage/store-manage",
// 	"/pages/video-manage/video-manage",
// 	"/pages/finance-statistics/finance-statistics",
// 	"pages/steamer-arrival/steamer-arrival",
// 	"pages/order-statistics/order-statistics",
// 	"/pages/anti-collision/anti-collision",
// 	"//pages/more-notice/more-notice",
// 	"/pages/material-manage/material-manager"

// ]
const whiteList = [
  {
    url: 'pages/today-order/today-order',
    auth: 'orderinfor:today',
  },
  {
    url: 'pages/history-order/history-order',
    auth: 'orderinfor:page',
  },
  {
    url: 'pages/dispatch-manage/dispatch-manage',
    auth: 'dispatchinfor:page',
  },
  {
    url: 'pages/store-manage/store-manage',
    auth: 'goodsinfor:page',
  },
  {
    url: 'pages/video-manage/video-manage',
    auth: 'videomonitor:page',
  },
  {
    url: 'pages/finance-statistics/finance-statistics',
    auth: 'orderinfor:finance',
  },
  {
    url: 'pages/steamer-arrival/steamer-arrival',
    auth: 'peopleandcarnumber:page',
  },
  {
    url: 'pages/order-statistics/order-statistics',
    auth: 'orderinfor:statistics',
  },
  {
    url: 'pages/anti-collision/anti-collision',
    auth: 'orderinfor:Anticollision',
  },
  {
    url: 'pages/more-notice/more-notice',
    auth: 'sysNotice:page',
  },
  {
    url: 'pages/material-manage/material-manage',
    auth: 'taskinfor:page',
  },
]

// 检查地址白名单
function checkWhite(url: string) {
  
  const userStore = useUserStore()

  const path: string = url.split('?')[0]

  const findWhiteItem = whiteList.find((item) => path.includes(item.url))
  return findWhiteItem && !userStore.isAuth(findWhiteItem.auth)
}

let list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']

list.forEach((item) => {
  uni.addInterceptor(item, {
    invoke(to: any) {
      if (checkWhite(to.url)) {
        uni.navigateTo({
          url: '/pages/auth-fail/auth-fail',
        })
        return false
      }
      return true
    },
    fail(err) {
      console.log(err)
    },
  })
})
