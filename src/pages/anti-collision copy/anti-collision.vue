<template>
  <view>
    <map id="map" style="width: 100%; height: 300px" :longitude="longitude" :latitude="latitude">
    </map>
    <view class="location-info px-4">
      <view>当前纬度: {{ latitude }}</view>
      <view>当前经度: {{ longitude }}</view>
    </view>
    
    <!-- <button @click="getLocation">获取位置信息</button>
    <button @click="getLocation2">获取位置信息2</button> -->

    <!-- <button @click="qrcode">232</button> -->
    <!-- <button @click="getLocation">重新定位</button> -->
  </view>
</template>
<script setup lang="ts">
// @ts-nocheck
import permision from '@/utils/permission'

import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'

const longitude = ref()
const latitude = ref()

const qrcode = () => {
  uni.scanCode({
	scanType: ['qrCode'],
	success: function (res) {
		console.log('条码类型：' + res.scanType);
		console.log('条码内容：' + res.result);
	}
});
}
const doGetLocation = () => {
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      latitude.value = res.latitude
      longitude.value = res.longitude
      // this.markers[0].latitude = res.latitude;
      // this.markers[0].longitude = res.longitude;
    },
    fail: (err) => {
      console.log('获取位置失败', err)
    },
  })
}
// const getLocation2 = () => {
//   uni.chooseLocation({
//     success: (res) => {
//       ;(this.hasLocation = true),
//         (this.location = formatLocation(res.longitude, res.latitude)),
//         (this.locationAddress = res.address)
//     },
//   })
// }

const getLocation = async () => {
  const result = await permision.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION')
  if (result == -1) {
    uni.showModal({
      title: '定位权限申请',
      content: '是否允许开启设备定位权限功能？',
      success: (res) => {
        if (res.confirm) {
          permision.gotoAppPermissionSetting('android.permission.ACCESS_FINE_LOCATION')
        }
      },
    })
  } else {
    uni.getLocation({
      type: 'gcj02',
      success: (res) => {
        latitude.value = res.latitude
        longitude.value = res.longitude
        //  markers[0].latitude = res.latitude;
        //   markers[0].longitude = res.longitude;

        // uni.openLocation({
        //   latitude: latitude.value,
        //   longitude: longitude.value,
        //   success: function () {
        //     console.log('success')
        //   },
        // })
      },
      fail: (err) => {
        console.log('获取位置失败', err)
      },
    })
  }
}

onReady(() => {
  getLocation()
})
</script>

<style scoped></style>
