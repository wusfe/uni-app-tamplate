<template>
  <view class="drop-down-scroll-view-box" >
    <page-meta :page-style="'overflow:'+(isShowModal?'hidden':'visible')"></page-meta>
    <view class="drop-down-top" v-bind="$attrs">
       <view @click="handleHid" >
        <slot name="top"></slot>
       </view>
        <slot></slot>
    </view>
    <view class="mask" :class="{ show: isShowModal,hide: !isShowModal }" @click="hideMask"></view>

  </view>
</template>

<script setup lang="ts">
import { onUnload } from '@dcloudio/uni-app'
import { watch } from 'vue';
import { useSlots } from 'vue';
import { provide, ref } from 'vue'

defineOptions({
  inheritAttrs: false
})


const coms = ref<any>([])

const registryCom = (com: any) => {
  coms?.value?.push(com)
}

// 点击其它的位置
const handleHid = () => {
    hidePup();
    isShowModal.value = false
}

const isShowModal = ref(false)

const hidePup = (target?: any) => {
  coms?.value?.forEach((item: any) => {
    if (item !== target) {
      item?.hideModal()
    }
  })
}
onUnload(() => {
  coms.value = []
})

const hideMask = () => {
    hidePup();
    isShowModal.value = false
}


watch(isShowModal, (n) => {
    // #ifdef H5
				// fix by mehaotian 处理 h5 滚动穿透的问题
				document.getElementsByTagName('body')[0].style.overflow = n ? 'hidden' : 'visible'
				// #endif

               
    
})
const handleMaskStatus  = (visible: boolean) => {
    isShowModal.value = visible
}

provide('provideRegistryDropCom', registryCom)
provide('provideHidePup', hidePup)

provide('provideMask', handleMaskStatus)

</script>

<style scoped>
.drop-down-scroll-view-box {
   flex-grow: 1;
   
}
.drop-down-top{
position: relative;
   background-color: #ffffff;
    
   z-index: 997;

  
}
.drop-down-top::after{
    position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      height: 1px;
      content: '';
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      background-color: #e5e5e5;
}
.mask {
  z-index: 996;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.15s linear;
}
.mask.show {
    background-color: rgba(0, 0, 0, 0.5);
}
.mask.hide {
    display: none;
}
</style>
