<template>
  <view class="store-purchase ml-3 mr-3 mt-3 pb-4">
    <view class="bg-#ffffff pl-3 pr-3 pt-2 pb-4">
      <uni-forms ref="form" :modelValue="formInput" :rules="rules">
        <view class="bb1">
          <uni-forms-item name="contractcode" required label="合同编号">
            <uni-easyinput
              v-model="formInput.contractcode"
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item name="goodsCode" required label="选择物料">
            <uni-data-select
              v-model="formInput.goodsCode"
              class="no-border"
              clear
              placeholder="请选择选择物料"
              :localdata="goodsList"
            ></uni-data-select>
          </uni-forms-item>
        </view>

        <!-- <view class="bb1">
          <uni-forms-item required label="货物名称" >
            <uni-easyinput
              v-model="formInput.goodsName"
              :inputBorder="false"
              readOnly
             
              placeholder="请输入货物名称"
              style="background-color: transparent"
            />
          </uni-forms-item>
        </view> -->

        <!-- <view class="bb1">
          <uni-forms-item  label="规格型号">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view> -->

        <view class="bb1">
          <uni-forms-item name="manufacturer" required label="厂商">
            <uni-easyinput
              :inputBorder="false"
              v-model="formInput.manufacturer"
              placeholder="请输入厂商"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required name="unitprice" label="购入单价" type="digit">
            <uni-easyinput
              v-model="formInput.unitprice"
              :inputBorder="false"
              placeholder="请输入购入单价"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required name="turnoverNumber" label="购入数量">
            <uni-easyinput
              type="number"
              v-model="formInput.turnoverNumber"
              :inputBorder="false"
              placeholder="请输入购入数量"
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

        <view class="bb1">
          <uni-forms-item required name="userId" label="采购人">
            <uni-data-select
              v-model="formInput.userId"
              class="no-border"
              clear
              placeholder="请选择采购人"
              :localdata="userList"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required name="useperiod" label="使用期限">
            <uni-easyinput
              :inputBorder="false"
              v-model="formInput.useperiod"
              placeholder="请输入使用期限"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item label="备注信息">
            <uni-easyinput
              class="mt-22rpx pl-20rpx"
              v-model="formInput.turnoverRemark"
              :inputBorder="false"
              placeholder="请输入备注信息"
              style="background-color: transparent"
              type="textarea"
            />
          </uni-forms-item>
        </view>

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
import { getSysUserUserList, getGoodsinforgoodsCodeList, addGoodsturnover, getGoodsinforDetail } from '@/api'
import { onLoad } from '@dcloudio/uni-app'
import { watch } from 'vue'
import { ref } from 'vue'

const formInput = ref({
  contractcode: '', //合同编号
  goodsCode: '', // 选择的物料
  goodsName: '', // 活物料名称
  manufacturer: '', //厂商
  unitprice: '', // 购入单价
  turnoverNumber: '', // 购物数量
  userId: '', //采购人
  userName: '', //采购人名字
  useperiod: '', //使用期限
  turnoverRemark: '', //备注信息
})

const rules = {
  contractcode: {
    rules: [
      {
        required: true,
        errorMessage: '合同编号不能为空',
      },
    ],
  },
  goodsCode: {
    rules: [
      {
        required: true,
        errorMessage: '物料不能为空',
      },
    ],
  },
  manufacturer: {
    rules: [
      {
        required: true,
        errorMessage: '厂商不能为空',
      },
    ],
  },
  unitprice: {
    rules: [
      {
        required: true,
        errorMessage: '购入单价不能为空',
      },
    ],
  },
  turnoverNumber: {
    rules: [
      {
        required: true,
        errorMessage: '购入数量不能为空',
      },
    ],
  },
  userId: {
    rules: [
      {
        required: true,
        errorMessage: '采购人不能为空',
      },
    ],
  },
  useperiod: {
    rules: [
      {
        required: true,
        errorMessage: '使用期限不能为空',
      },
    ],
  },
}

const goodsList = ref([] as any)
const userList = ref([] as any)
onLoad((query) => {
  

  getGoodsinforgoodsCodeList().then((res) => {
    goodsList.value = res?.result?.map((item: any) => ({
      text: item.label,
      value: item.value,
    }))
  })
  getSysUserUserList().then((res) => {
    userList.value = res?.result?.map((item: any) => ({
      text: item.label,
      value: item.value,
    }))
  })
})

watch(
  () => formInput.value.goodsCode,
  (n) => {
    if (!n) return (formInput.value.goodsName = '')
    formInput.value.goodsName = goodsList?.value?.find((item: any) => {
      return item.value === n
    })?.text
  },
)

watch(
  () => formInput.value.userId,
  (n) => {
    if (!n) return (formInput.value.goodsName = '')
    formInput.value.userName = userList?.value?.find((item: any) => {
      return item.value === n
    })?.text
  },
)

const form = ref()
const handleConfirm = async () => {
  try {
    uni.showLoading()
    await form.value.validate()

    await addGoodsturnover(formInput.value)

    uni.showToast({
      title: '添加成功',
    })

    uni.redirectTo({
      url:'/pages/store-purchase-record/store-purchase-record',
    })
  } finally {
    uni.hideLoading()
  }
}

const reset = () => {
  formInput.value = {
    contractcode: '', //合同编号
    goodsCode: '', // 选择的物料
    goodsName: '', // 活物料名称
    manufacturer: '', //厂商
    unitprice: '', // 购入单价
    turnoverNumber: '', // 购物数量
    userId: '', //采购人
    userName: '', //采购人名字
    useperiod: '', //使用期限
    turnoverRemark: '', //备注信息
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
