<template>
  <view class="store-purchase ml-3 mr-3">
    <view class="bg-#ffffff pl-3 pr-3 pt-2 pb-4">
      <uni-forms ref="form" :modelValue="searchInput"  :rules="rules">
        <view class="bb1">
          <uni-forms-item required name="shipCode" label="船号">
            <uni-easyinput
              v-model="searchInput.shipCode"
              :inputBorder="false"
              placeholder="请输入船号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required name="shipName" label="船名">
            <uni-easyinput
              v-model="searchInput.shipName"
              :inputBorder="false"
              placeholder="请输入船名"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required name="shipCaptain" label="船长">
            <uni-easyinput
              v-model="searchInput.shipCaptain"
              :inputBorder="false"
              placeholder="请输入船长"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required name="shipUserInfor" label="人员名单">
            <uni-easyinput
              v-model="searchInput.shipUserInfor"
              :inputBorder="false"
              placeholder="请输入领用数量"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required label="运行状态">
           <view class="ml-20rpx mt-12rpx">
            <uni-data-checkbox
           
           v-model="searchInput.shipState"
           :localdata="[
             { text: '否', value: false },
             { text: '是', value: true },
           ]"
         />
           </view>

          
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required name="dispatchTime" label="调度时间">

            <uni-datetime-picker type="date" v-model="searchInput.dispatchTime">
              <template v-slot="scope">
                  <view class="flex items-center justify-between mt-20rpx ml-18rpx">

                    <text v-if="scope.displayValue">{{ scope.displayValue }}</text>
                    <text v-else class="color-#999">{{ scope.placeholderText }}</text>
                    <uni-icons
                      type="right"
                      color="#999"
                      size="16"
                    />
                  </view>
              </template>
            
            </uni-datetime-picker>

            <!-- <uni-easyinput
              v-model="searchInput.dispatchTime"
              :inputBorder="false"
              placeholder="请选择调度时间"
              style="background-color: transparent"
              class="input"
            /> -->
          </uni-forms-item>
        </view>

        <view class="flex mt-5">
          <view class="w-50% mr-5">
            <button class="block w-100%" size="mini" type="primary" plain @click="">
              重置
            </button></view
          >

          <view class="w-50%">
            <button class="block w-100%" type="primary" size="mini" @click="handleConfirm">提交</button></view
          >
        </view>
      </uni-forms>
    </view>
  </view>
</template>

<script setup lang="ts">
import { addDispatchinfor } from '@/api';
import { ref } from 'vue'

const searchInput = ref({
  shipCode: '',
  shipName: '',
  shipCaptain: '',
  shipUserInfor: '',
  dispatchTime: '',
  shipState: false,
})

const rules = {
  shipCode: {
    rules: [
      {
        required: true,
        errorMessage: '船号不能为空',
      },
    ],
  },
  shipName: {
    rules: [
      {
        required: true,
        errorMessage: '船名不能为空',
      },
    ],
  },
  shipCaptain: {
    rules: [
      {
        required: true,
        errorMessage: '船长不能为空',
      },
    ],
  },
  shipUserInfor: {
    rules: [
      {
        required: true,
        errorMessage: '人员名单不能为空',
      },
    ],
  },
  shipState: {
    rules: [
      {
        required: true,
        errorMessage: '运行状态不能为空',
      },
    ],
  },
  dispatchTime: {
    rules: [
      {
        required: true,
        errorMessage: '调度时间不能为空',
      },
    ],
  },
}

const form = ref()
const handleConfirm = async () => {
  try {
    uni.showLoading()
    await form.value.validate()

    await addDispatchinfor(searchInput.value)

    uni.showToast({
      title: '新增成功',
    })

    uni.redirectTo({
      url:'/pages/dispatch-manage/dispatch-manage',
    })
  } finally {
    uni.hideLoading()
  }
}
</script>

<style scoped>
.input /deep/ .uni-easyinput__content {
  background-color: transparent !important;
}
.store-purchase /deep/ .uni-forms-item__label {
  width: 158rpx !important;
}
.store-purchase /deep/ .uni-forms-item__label > uni-text:not(.is-required) {
  /* width: 130rpx!important; */
  text-align-last: justify !important;
  flex-grow: 1;
  /* display: block!important; */
}
.store-purchase .uni-forms-item {
  margin-bottom: 15rpx !important;
}
.store-purchase /deep/ .uni-forms-item.is-direction-left {
}
</style>
