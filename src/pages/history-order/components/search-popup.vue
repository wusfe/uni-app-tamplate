<template>
  <view class="search-popup">
    <popupWrap
      ref="popup"
      type="right"
      background-color="#fff"
      @change="change"
      class="search-popup-wrap"
    >
      <view class="pl-2 pr-2 pt-0 w-400rpx " >
        <uni-forms label-position="top" class="popup-form">
          <uni-forms-item label="订单类型" class="popup-form-item">
            <uni-data-select  v-model="selfSearchInput.orderType"  placeholder="请选择订单类型" :localdata="typeList" @change="change"></uni-data-select>
          </uni-forms-item>
          <uni-forms-item label="订单状态"   class="popup-form-item">
            <uni-data-select
            v-model="selfSearchInput.orderState"
              placeholder="请选择订单状态"
              :localdata="stateList"
              @change="change"
            ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="车辆类型" class="popup-form-item">
            <uni-data-select
            v-model="selfSearchInput.orderCarType" 
              placeholder="请选择车辆类型"
              :localdata="carTypeList"
              @change="change"
            ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="收费类型" class="popup-form-item">
            <uni-data-select
            v-model="selfSearchInput.orderChargeType" 
              placeholder="请选择收费类型"
              :localdata="chargeTypeList"
              @change="change"
            ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="车牌号" class="popup-form-item">
            <uni-easyinput v-model="selfSearchInput.orderCarNumber" placeholder="请输入车牌号"></uni-easyinput>
          </uni-forms-item>

          <uni-forms-item label="订单编号" class="popup-form-item">
            <uni-easyinput v-model="selfSearchInput.orderNumber" placeholder="请输入订单编号"></uni-easyinput>
            
          </uni-forms-item>



          <button type="primary" plain size="mini" class="block w-100% mt-4" @click="handleSubmit">提交</button>
        </uni-forms>
      </view>
    </popupWrap>
  </view>
</template>

<script setup lang="ts">
import popupWrap from '@/components/popup/index.vue'
import { useDictStore, useOrderStore } from '@/stores';
import { onLoad, onReady } from '@dcloudio/uni-app'

import { ref ,watch, computed, unref} from 'vue'
const orderStore = useOrderStore();
const dictStore = useDictStore();
onLoad(() => {
  orderStore.getOrderTypeList()
  orderStore.getOrderStateList()
  dictStore.getCarTypeList()
  dictStore.getChargeTypeList()
})

const props = defineProps(['searchInput']) 
const emit = defineEmits(['confirm']) 

const selfSearchInput = ref<any>({}) 

watch(props.searchInput, (v) => {

  selfSearchInput.value = JSON.parse(JSON.stringify(unref(v)))
  
}, {deep:true, immediate:true})


const typeList = computed(() => {
  return orderStore.orderTypeList?.map((item:any) => ({
    text: item.lable,
    value: item.value
  }))
})


const stateList = computed(() => {
  return orderStore.orderStateList?.map((item:any) => ({
    text: item.lable,
    value: item.value
  }))
})

const carTypeList = computed(() => {
  return dictStore.carType?.map((item:any) => ({
    text: item.value,
    value: item.code
  }))
})

const chargeTypeList = computed(() => {
  return dictStore.chargeType?.map((item:any) => ({
    text: item.value,
    value: item.code
  }))
})


const popup = ref()

const open = () => {
  popup.value.open(true)

  selfSearchInput.value = JSON.parse(JSON.stringify(unref(props.searchInput)))
}


const close = () => {
  popup.value.close()
}

const handleSubmit = () => {
  
  emit('confirm', selfSearchInput)
}


defineExpose({
  open,
  close
})

const change = () => {}
</script>

<style>
.search-popup {
  position: relative;
  z-index: 997;
}

.search-popup  /deep/ .uni-forms-item__label {
  padding-bottom: 0 !important;
}
.search-popup /deep/ .uni-popup__wrapper {
  overflow-y: auto!important;
  }
 
.search-popup  /deep/ .popup-form .popup-form-item {
  margin-bottom: 0 !important;
  margin-top: 10rpx;
}
</style>
