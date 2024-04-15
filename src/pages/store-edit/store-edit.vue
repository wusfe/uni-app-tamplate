<template>
  <view class="store-purchase ml-3 mr-3 mt-3 pb-4">
    <view class="bg-#ffffff pl-3 pr-3 pt-2 pb-4">
      <uni-forms ref="form" :modelValue="formInput" :rules="rules">
        <view class="bb1">
          <uni-forms-item name="goodsCode" required label="物料编号">
            <uni-easyinput
              v-model="formInput.goodsCode"
              :inputBorder="false"
              placeholder="请输入物料编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item name="goodsType" required label="货物类型">
            <uni-data-select
              v-model="formInput.goodsType"
              class="no-border"
              clear
              placeholder="请选择货物类型"
              :localdata="goodTypeList"
            ></uni-data-select>
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required name="goodsName" label="货物名称">
            <uni-easyinput
              v-model="formInput.goodsName"
              :inputBorder="false"
              readOnly
              placeholder="请输入货物名称"
              style="background-color: transparent"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item equired name="goodsModel" label="规格型号">
            <uni-easyinput
              v-model="formInput.goodsModel"
              :inputBorder="false"
              placeholder="请输入规格型号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item name="goosManufacturer" required label="厂商">
            <uni-easyinput
              :inputBorder="false"
              v-model="formInput.goosManufacturer"
              placeholder="请输入厂商"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required name="goodsUnitPrice" label="购入单价" type="digit">
            <uni-easyinput
              v-model="formInput.goodsUnitPrice"
              :inputBorder="false"
              placeholder="请输入购入单价"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required name="goodsNumber" label="库存数量">
            <uni-easyinput
              type="number"
              v-model="formInput.goodsNumber"
              :inputBorder="false"
              placeholder="请输入库存数量"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required name="alertNumber" label="预警数量">
            <uni-easyinput
              type="number"
              v-model="formInput.alertNumber"
              :inputBorder="false"
              placeholder="请输入预警数量"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <!-- <view class="bb1">
          <uni-forms-item required label="购入时间">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view> -->

        <!-- <view class="bb1">
          <uni-forms-item required name="userId" label="采购人">
            <uni-data-select
              v-model="formInput.userId"
              class="no-border"
              clear
              placeholder="请选择采购人"
              :localdata="userList"
            />
          </uni-forms-item>
        </view> -->

        <!-- <view class="bb1">
          <uni-forms-item required name="useperiod" label="使用期限">
            <uni-easyinput
              :inputBorder="false"
              v-model="formInput.useperiod"
              placeholder="请输入使用期限"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view> -->

        <!-- <view class="bb1">
          <uni-forms-item label="备注信息">
            <uni-easyinput
              class="mt-22rpx pl-20rpx"
              v-model="formInput.turnoverRemark"
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              type="textarea"
            />
          </uni-forms-item>
        </view> -->

        <view class="flex mt-5">
          <view class="w-50% mr-5">
            <button type="primary" plain @click="reset" size="mini" class="block w-100%">
              重置
            </button></view
          >

          <view class="w-50%">
            <button size="mini" class="block w-100%" type="primary" @click="handleConfirm">
              确认
            </button></view
          >
        </view>
      </uni-forms>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  getSysUserUserList,
  getGoodsinforgoodsCodeList,
  addGoodsturnover,
  getGoodsinforDetail,
  updateGoodsinforDetail,
} from '@/api'
import { useDictStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
import { computed, watch } from 'vue'
import { ref } from 'vue'

const formInput = ref({
  goodsCode: '', // 物料编码
  goodsType: '', //货物类型
  goodsName: '', // 活物料名称
  goodsModel: '', // 规格型号
  goosManufacturer: '', //厂商
  goodsUnitPrice: '', // 购入单价
  goodsNumber: '', // 购物数量
  alertNumber: '', // 预警
})

const rules = {
  goodsCode: {
    rules: [
      {
        required: true,
        errorMessage: '物料编码不能为空',
      },
    ],
  },
  goodsType: {
    rules: [
      {
        required: true,
        errorMessage: '货物类型不能为空',
      },
    ],
  },

  goodsName: {
    rules: [
      {
        required: true,
        errorMessage: '货物名称不能为空',
      },
    ],
  },
  goodsModel: {
    rules: [
      {
        required: true,
        errorMessage: '规格型号不能为空',
      },
    ],
  },
  goosManufacturer: {
    rules: [
      {
        required: true,
        errorMessage: '厂商不能为空',
      },
    ],
  },
  goodsUnitPrice: {
    rules: [
      {
        required: true,
        errorMessage: '购入单价不能为空',
      },
    ],
  },
  goodsNumber: {
    rules: [
      {
        required: true,
        errorMessage: '购入数量不能为空',
      },
    ],
  },
  alertNumber: {
    rules: [
      {
        required: true,
        errorMessage: '预警数量不能为空',
      },
    ],
  },
}

const dictStore = useDictStore()
const goodTypeList = computed(() => {
  return dictStore.goodtype?.map((item: any) => ({
    text: item.value,
    value: item.code,
  }))
})

const detail = ref()
const userList = ref([] as any)
onLoad((query: any) => {
  dictStore.getGoodtype()
  getSysUserUserList().then((res) => {
    userList.value = res?.result?.map((item: any) => ({
      text: item.label,
      value: item.value,
    }))
  })

  if (query?.id) {
    getGoodsinforDetail({
      id: query.id,
    }).then((res) => {
      detail.value = res?.result
      formInput.value = {
        goodsCode: res?.result?.goodsCode, // 物料编码
        goodsType: res?.result?.goodsType, //货物类型
        goodsName: res?.result?.goodsName, // 活物料名称
        goodsModel: res?.result?.goodsModel, // 规格型号
        goosManufacturer: res?.result?.goosManufacturer, //厂商
        goodsUnitPrice: res?.result?.goodsUnitPrice, // 购入单价
        goodsNumber: res?.result?.goodsNumber, // 购物数量
        alertNumber: res?.result?.alertNumber, // 预警
      }
    })
  }
})

const form = ref()
const handleConfirm = async () => {
  try {
    uni.showLoading()
    await form.value.validate()

    await updateGoodsinforDetail({
      ...formInput.value,
      id: detail?.value?.id,
    })

    uni.showToast({
      title: '更新成功',
    })

    uni.navigateBack()
    // uni.redirectTo({
    //   url: '/pages/store-purchase-record/store-purchase-record',
    // })
  } finally {
    uni.hideLoading()
  }
}

const reset = () => {
  console.log(form)
  formInput.value = {
    goodsCode: '', // 物料编码
    goodsType: '', //货物类型
    goodsName: '', // 活物料名称
    goodsModel: '', // 规格型号
    goosManufacturer: '', //厂商
    goodsUnitPrice: '', // 购入单价
    goodsNumber: '', // 购物数量
    alertNumber: '', // 预警
  }
  form.value.clearValidate()
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

.no-border /deep/ .uni-select {
  border: none !important;
}

.store-purchase /deep/ .uni-easyinput__content-textarea {
  margin-top: 0 !important;
}
</style>
