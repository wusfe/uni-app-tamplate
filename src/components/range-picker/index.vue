<template>
 
    <datetimePicker
    :showClearIcon="false"
    :type="props.type"
    custom
    @visible="handleVisible"
    ref="calendar"
    @change="handleChange"
    
	 >
   <view class="flex justify-between items-center pt-3 pb-3 drop-menu-item" @click="handleOpen">
            <text class="mr-1 text-sm e1 w-140rpx" :style="{ color: isShowModal ? '#007aff' : '#333333' }"
                >{{dateValue || '请选择日期'}}</text
            >
            <uni-icons
                :type="isShowModal ? 'up' : 'down'"
                :color="isShowModal ? '#007aff' : '#333333'"
                size="18"
            />
    </view> </datetimePicker>

</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { getCurrentInstance,  inject  } from 'vue'
import { ref } from 'vue'
import datetimePicker from '@/components/uni-datetime-picker/uni-datetime-picker.vue'
const provideRegistryDropCom = inject<any>('provideRegistryDropCom')
const provideHidePup = inject<any>('provideHidePup')
const provideMask = inject<any>('provideMask')
const { proxy } = getCurrentInstance() as any

const emits = defineEmits()
onLoad(async () => {
  provideRegistryDropCom(proxy)
})
proxy.hideModal = () => {

  calendar.value.close()
}

const dateValue = ref('')
const isShowModal = ref(false)


const calendar = ref();

const props = withDefaults(defineProps<{
  type?: string
}>(), {
  type:"date"
})
console.log(props);

const handleVisible = (status: any) => {
    isShowModal.value = status;

    console.log(status, 12);
    
//   isShowModal.value = status
}

const handleChange = (v:any) => {
  if(Array.isArray(v)){
    dateValue.value = v.join('-')
  }
 
  emits('update:modelValue', v)

  emits("confirm", v)
}
const handleOpen = () => {
  calendar.value.open()
  provideHidePup(proxy)
  provideMask(false)

}
</script>

<style scoped></style>
