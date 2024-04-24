<template>
  <qr :order-number="orderNumber" :isRefund="isRefund"></qr>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import qr from '@/components/qr/index.vue'

// 4875446994044766907

const orderNumber = ref()
const isRefund = ref(false)
onLoad((query: any) => {
  orderNumber.value = query?.orderNumber
  isRefund.value = query.isRefund === 'true'
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
