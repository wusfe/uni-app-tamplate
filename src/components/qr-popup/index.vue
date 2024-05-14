<template>
  <uni-popup :animation="animation" ref="popup" type="bottom" @maskClick="handleMask">
    <view class="bg-#ffffff">
      <view
        class="bg-pric py-30rpx text-center flex justify-center items-center"
        @click="handleQrcode"
      >
        <view class="w-200rpx flex items-center">
          <uni-icons type="scan" color="#ffffff" size="25"></uni-icons>
          <text class="color-#ffffff font-size-40rpx ml-20rpx">验票</text>
        </view>
      </view>
      <view
        v-if="!props.isRefund"
        class="bg-scolor py-30rpx text-center flex justify-center items-center"
        @click="handleETC"
      >
        <view class="w-200rpx flex items-center">
          <i class="zhfont zh-etc font-size-50rpx color-#ffffff"></i>
          <text class="color-#ffffff font-size-40rpx ml-20rpx">车牌号</text>
        </view>
      </view>

      <view
        v-if="props.showTicket"
        class="bg-#FE7849 py-30rpx text-center flex justify-center items-center"
        @click="handleTicketList"
      >
        <view class="w-200rpx flex items-center">
          <i class="zhfont zh-a-5-yidaozhangkaipiao font-size-50rpx color-#ffffff"></i>
          <text class="color-#ffffff font-size-40rpx ml-20rpx whitespace-nowrap">验票队列</text>
        </view>
      </view>

    </view>
  </uni-popup>

  <uni-popup
    ref="popup2"
    background-color="#fff"
    type="bottom"
    safe-area
    @maskClick="handlecancelQr"
  >
    <view class="qr-wrap">
      <view class="shrink-0 flex justify-enf items-center bb1 py-20rpx px-20rpx">
        <view @click="handlecancelQr">关闭</view>
      </view>
      <view class="grow-1 overflow-y-auto min-h-0">
        <qr v-if="open" :order-number="orderNumber" :isRefund="props.isRefund"/>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import permision from '@/utils/permission'
import qr from '@/components/qr/index.vue'
import { useEtcStore } from '@/stores'

const emits = defineEmits(['back'])
const etcStore = useEtcStore()
const popup = ref()
const popup2 = ref()

const animation = ref(false)

const open = ref(false)

const props = withDefaults(
  defineProps<{
    qrt?: 1 | 2,
    isRefund?: boolean,
    showTicket: boolean
  }>(),
  {
    qrt: 1,
    isRefund: false,
    showTicket: true
  },
)

const orderNumber = ref()

const handleScanCode = async (type: 1 | 2) => {
  if(type){
    openType.value = type
  }
  const result = await permision.requestAndroidPermission(
    'android.permission.READ_EXTERNAL_STORAGE',
  )

  if (result === -1) {
    uni.showModal({
      title: '相册读取权限申请',
      content: '是否允许开启相册读取功能？',
      success: (res) => {
        if (res.confirm) {
          permision.gotoAppPermissionSetting()
        }
      },
    })
  } else {
    uni.scanCode({
      onlyFromCamera: true,
      // autoDecodeCharset: true,
      scanType: ['qrCode'],
      hideAlbum: true,
      // autoZoom: false,
      success: function (res) {
        if (openType.value == 1) {
          handleMask()

          uni.navigateTo({
            url: `/pages/qr-result/qr-result?orderNumber=${res.result}&isRefund=${props.isRefund}`,
          })
        } else {
          popup?.value?.close()
          orderNumber.value = res.result
          popup2?.value?.open()
          open.value = true
        }
      },
      fail:(fail)=>{
        console.log(fail);
        
      },
      complete(result) {
          console.log(result)
      },
    })
  }
}

const handleQrcode = () => {
  handleScanCode(openType.value)
}

const handleETC = async () => {
  const result = await permision.requestAndroidPermission('android.permission.CAMERA')

  if (result === -1) {
    uni.showModal({
      title: '照相机权限申请',
      content: '是否允许开启照相机功能？',
      success: (res) => {
        if (res.confirm) {
          permision.gotoAppPermissionSetting()
        }
      },
    })
  } else {
    handleMask()

    const app = getApp<any>()

    app.globalData.hidepopup2 = () => {
      emits('back')

      if(openType.value == 1){
        uni.navigateBack()
      }else{
        handlecancelQr()
      }
      
    }

    app.globalData.setImage = (url: string) => {
      // 从拍照页面回来
    //  setTimeout(() => {
    //   emits('back')
    //  },0)
      plus.io.resolveLocalFileSystemURL(url, function (entry: any) {
        entry.file(function (e: any) {
          let fileReader = new plus.io.FileReader()
          fileReader.onload = function (r: any) {
            getEtcCode(r.target.result, url)
         
          }
          fileReader.readAsDataURL(e)
        })
      })
    }
    uni.navigateTo({
      url: '/pages/camera/camera',
    })
    // uni.chooseImage({
    //   count: 1,
    //   sourceType: ['camera'],
    //   success: function (res) {
    //     const fileUrl = res.tempFilePaths[0]

    //     plus.io.resolveLocalFileSystemURL(res.tempFilePaths[0], function (entry: any) {
    //       entry.file(function (e) {
    //         let fileReader = new plus.io.FileReader()
    //         fileReader.onload = function (r: any) {
    //           //   console.log(r.target.result, fileUrl)
    //           getEtcCode(r.target.result, fileUrl)
    //           // _this.sdsd(r.target.result, file)
    //         }
    //         fileReader.readAsDataURL(e)
    //       })
    //     })
    //   },
    // })
  }
}

const getEtcCode = (imageUrl: any, url: any) => {
  uni.showLoading({
    title:'识别中...'
  })
  let s = encodeURI(imageUrl.replace('/^data:image\/\w+;base64,/', ''))

  // console.log(etcStore.token)

  //   let a = '24.c4a32685868f9f5eb5550af984a365df.2592000.1715909195.282335-61703788'
  var options = {
    // 'method': 'POST',
    url: `https://aip.baidubce.com/rest/2.0/ocr/v1/license_plate`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    filePath: url,
    formData: {
      access_token: etcStore.token,
      image: s,
    },
    success(res: any) {
      try {
        const data = JSON.parse(res?.data)

        if (data?.words_result?.number) {
          console.log(data?.words_result?.number)

          // 跳转
          if (openType.value == 1) {
            handleMask()

            uni.navigateTo({
              url: `/pages/qr-result/qr-result?orderNumber=${data?.words_result?.number}`,
            })
          } else {
            popup?.value?.close()
            orderNumber.value = data?.words_result?.number
            popup2?.value?.open()
            open.value = true
          }
        } else {
          uni.showToast({
            title: '请重新拍照识别',
            icon: 'error',
          })
        }
      } catch (error) {}
    },
    fail(error:any) {
      console.log(error)
    },
    complete:()=>{
      uni.hideLoading()
    },
  }

  uni.uploadFile(options)
  // uni.request(options);
}

const openType = ref(props.qrt || 1)

const openPopup = (type: 1 | 2 = 1) => {
  animation.value = true
  uni.hideTabBar({
    animation: true,
  })
  setTimeout(() => {
    popup.value.open()
  }, 60)
  openType.value = type
}

const handleMask = () => {
  animation.value = false
  popup.value.close()
  uni.showTabBar()
}

const handlecancelQr = () => {
 
  animation.value = false
  popup2?.value?.close()
  open.value = false
  uni.showTabBar()
}

// 去验票列表
const handleTicketList = () => {
  
  uni.navigateTo({
    url:'/pages/ticket-list/ticket-list',
  })
}
defineExpose({
  open: openPopup,
  qrcode: handleScanCode,
  ETC: handleETC,
})
</script>

<style scoped>
.qr-wrap {
  height: 90vh;
  /* #ifdef H5 */
  padding-top: calc(var(--window-top) + var(--status-bar-height));
  /* #endif */
  /* #ifdef APP */
  padding-top: calc(var(--window-top));
  /* #endif */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
