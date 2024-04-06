<template>

  <view class="store-purchase ml-3 mr-3 mt-3 pb-4">
    <view class="bg-#ffffff pl-3 pr-3 pt-2 pb-4">
      <uni-forms ref="form">
        <view class="bb1">
          <uni-forms-item required label="编号">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required label="货物类型">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required label="货物名称">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item  label="规格型号">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>


        <view class="bb1">
          <uni-forms-item  label="厂商">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item  label="购入单价">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required label="购入数量">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required label="购入时间">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>


        <view class="bb1">
          <uni-forms-item required label="采购人">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item  label="使用期限">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item  label="备注信息">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入编号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

       

        


      <view class="flex mt-5">
        <view class="w-50% mr-5">  <button type="primary" plain @click="" size="mini" class="block w-100%">重置</button></view>

        <view class="w-50%"> <button size="mini" class="block w-100%" type="primary" @click=""  >确认</button></view>
      </view>
       
      </uni-forms>
    </view>
  </view>
</template>

<script setup lang="ts">





</script>




<style scoped>
.input /deep/ .uni-easyinput__content {
  background-color: transparent !important;
}
.store-purchase /deep/ .uni-forms-item__label {
  width: 158rpx!important;
}
.store-purchase /deep/ .uni-forms-item__label > uni-text:not(.is-required) {
  /* width: 130rpx!important; */
  text-align-last: justify !important;
  flex-grow: 1;
  /* display: block!important; */
}
.store-purchase .uni-forms-item{
  margin-bottom: 15rpx!important;
}
.store-purchase /deep/ .uni-forms-item.is-direction-left {
}
</style>
