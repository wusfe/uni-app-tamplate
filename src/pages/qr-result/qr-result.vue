<template>
  <qr :order-number="orderNumber"></qr>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import qr from '@/components/qr/index.vue'

// 4875446994044766907

const orderNumber = ref()

onLoad((query: any) => {
  orderNumber.value = query?.orderNumber
  // if (props.orderNumber) {
  //   orderinforDetail({
  //     orderNumber: props.orderNumber,
  //   }).then((res) => {
  //     detail.value = res?.result
  //     status.value = res?.result?.orderState
  //     if (res?.result?.orderState == 1) {
  //       updateCompleteOrder(props.orderNumber).then(res => {
  //         status.value = 2
  //         uni.showToast({
  //           title: '核验成功'
  //         })
  //       })
  //     }
  //   })
  // }
})
</script>

<style scoped>
.text-align-last-justify {
  text-align-last: justify;
}
</style>
