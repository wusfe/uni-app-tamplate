<template>
  <picker ref="calendar" :mode="props.mode" @cancel="handleCancel" @change="handleChange">
    <view class="flex justify-between items-center pt-3 pb-3 drop-menu-item" @click="handleOpen">
        <text
          v-if="modelValue"
          class="mr-1 text-sm"
          :style="{ color: isShowModal ? '#007aff' : '#333333' }"
          >{{ modelValue }}</text
        >

        <text v-else class="mr-1 text-sm" :style="{ color: isShowModal ? '#007aff' : '#333333' }"
          >请选择日期</text
        >
        <uni-icons
          :type="isShowModal ? 'up' : 'down'"
          :color="isShowModal ? '#007aff' : '#333333'"
          size="18"
        />
      </view>
  </picker>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { getCurrentInstance, inject } from 'vue'
import { ref } from 'vue'

const provideRegistryDropCom = inject<any>('provideRegistryDropCom')
const provideHidePup = inject<any>('provideHidePup')
const provideMask = inject<any>('provideMask')
const { proxy } = getCurrentInstance() as any

const emits = defineEmits()
onLoad(async () => {
  provideRegistryDropCom(proxy)
})
proxy.hideModal = () => {}

const isShowModal = ref(false)

const props = withDefaults(
  defineProps<{
    mode?: any
    modelValue?: any
  }>(),
  {
    mode: 'date',
  },
)

const handleCancel = (status: any) => {
  isShowModal.value = false

  console.log(status)

  //   isShowModal.value = status
}

const handleOpen = () => {
  provideHidePup(proxy)
  provideMask(false)

  isShowModal.value = true
}

const handleChange = (v: any) => {
  emits('update:modelValue', v.detail?.value)

  emits('confirm', v.detail?.value)
}
</script>

<style scoped></style>
