<template>
  <view class="search-popup">
    <popupWrap
      ref="popup"
      type="right"
      background-color="#fff"
      @change="change"
      class="search-popup-wrap"
    >
      <view class="pl-2 pr-2 pt-2 w-400rpx " >
        <uni-forms label-position="top" class="popup-form">
          <uni-forms-item label="订单类型" class="popup-form-item">
            <uni-data-select placeholder="请选择订单类型" @change="change"></uni-data-select>
          </uni-forms-item>
          <uni-forms-item label="订单状态" class="popup-form-item">
            <uni-data-select
              placeholder="请选择订单状态"
              :localdata="options"
              @change="change"
            ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="车辆类型" class="popup-form-item">
            <uni-data-select
              placeholder="请选择车辆类型"
              :localdata="options"
              @change="change"
            ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="收费类型" class="popup-form-item">
            <uni-data-select
              placeholder="请选择收费类型"
              :localdata="options"
              @change="change"
            ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="车牌号" class="popup-form-item">
            <uni-easyinput placeholder="请输入车牌号"></uni-easyinput>
          </uni-forms-item>

          <uni-forms-item label="订单编号" class="popup-form-item">
            <uni-data-select
              placeholder="请输入订单编号"
              :localdata="options"
              @change="change"
            ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="订单编号" class="popup-form-item">
            <uni-data-select
              placeholder="请输入订单编号"
              :localdata="options"
              @change="change"
            ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="订单编号" class="popup-form-item">
            <uni-data-select
              placeholder="请输入订单编号"
              :localdata="options"
              @change="change"
            ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="订单编号" class="popup-form-item">
            <uni-data-select
              placeholder="请输入订单编号"
              :localdata="options"
              @change="change"
            ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="车牌号" class="popup-form-item">
            <uni-easyinput placeholder="请输入车牌号"></uni-easyinput>
          </uni-forms-item>

          <button type="primary" plain size="mini" class="block w-100% mt-4">提交</button>
        </uni-forms>
      </view>
    </popupWrap>
  </view>
</template>

<script setup lang="ts">
import popupWrap from '@/components/popup/index.vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'

const popup = ref()

const handleOpen = () => {
  popup.value.open(true)
}

const options = [
  {
    text: '待支付',
    value: '0',
  },
  {
    text: '已支付',
    value: '1',
  },
  {
    text: '已完成',
    value: '2',
  },
  {
    text: '已退票',
    value: '3',
  },
]
defineExpose({
  handleOpen,
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
