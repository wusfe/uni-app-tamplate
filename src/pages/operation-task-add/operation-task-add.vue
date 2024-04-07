<template>
  <view class="store-purchase ml-3 mr-3">
    <view class="bg-#ffffff pl-3 pr-3 pt-2 pb-4">
      <uni-forms ref="form">
        <view class="bb1">
          <uni-forms-item  label="任务类型">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入船号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item  label="任务执行人">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入船名"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required label="任务起止时间">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入领用数量"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required label="任务标题">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入任务标题"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>


        <view class="bb1">
          <uni-forms-item  label="任务内容">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入务内容"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>


        <view class="bb1">
          <uni-forms-item  label="图片上传">
            <uni-file-picker class="pb-2" limit="1" style="margin: 0;"></uni-file-picker>
          </uni-forms-item>
        </view>


      <view class="flex mt-5">
        <view class="w-50% mr-5">  <button class="block w-100%" size="mini"  type="primary" plain @click="">重置</button></view>

        <view class="w-50%"> <button  class="block w-100%" type="primary" @click="" size="mini"  >提交</button></view>
      </view>
       
      </uni-forms>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped>
.input /deep/ .uni-easyinput__content {
  background-color: transparent !important;
}
.store-purchase /deep/ .uni-forms-item__label {
  width: 216rpx!important;
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
