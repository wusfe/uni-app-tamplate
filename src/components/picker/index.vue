<template>
  <picker ref="calendar" :mode="props.mode"  @cancel="handleCancel">
        <template v-slot="scope">
            <view class="flex justify-between items-center pt-3 pb-3 drop-menu-item" @click="handleOpen">
            <text class="mr-1 text-sm" :style="{ color: isShowModal ? '#007aff' : '#333333' }"
                >请选择日期</text
            >
            <uni-icons
                :type="isShowModal ? 'up' : 'down'"
                :color="isShowModal ? '#007aff' : '#333333'"
                size="18"
            />
    </view>
        </template>
  </picker>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { getCurrentInstance,  inject  } from 'vue'
import { ref } from 'vue'

const provideRegistryDropCom = inject<any>('provideRegistryDropCom')
const provideHidePup = inject<any>('provideHidePup')
const provideMask = inject<any>('provideMask')
const { proxy } = getCurrentInstance() as any


onLoad(async () => {
  provideRegistryDropCom(proxy)
})
proxy.hideModal = () => {}


const isShowModal = ref(false)

const props = withDefaults(defineProps<{
    mode?: string
}>(), {
    mode:"date"
})
console.log(props);

const handleCancel = (status: any) => {
    isShowModal.value = false;

    console.log(status);
    
//   isShowModal.value = status
}

const handleOpen = () => {
  provideHidePup(proxy)
  provideMask(false)


  isShowModal.value = true
}
</script>

<style scoped></style>
