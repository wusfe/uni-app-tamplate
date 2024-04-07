<template>
  <view class="store-purchase ml-3 mr-3">
    <view class="bg-#ffffff pl-3 pr-3 pt-2 pb-4">
      <uni-forms ref="form">
        <view class="bb1">
          <uni-forms-item label="任务类型">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入船号"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item label="任务执行人">
            <uni-easyinput
              :inputBorder="false"
              placeholder="请输入船名"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required class="checkbox" label="执行结果">
            <uni-data-checkbox
              class=""
              :localdata="[
                {
                  text: '已完成',
                  value: 0,
                },
                {
                  text: '未完成',
                  value: 1,
                },
              ]"
            ></uni-data-checkbox>
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
          <uni-forms-item label="任务内容">
            <uni-easyinput
              class="mb-2"
              type="textarea"
              placeholder="请输入任务内容"
              style="background-color: transparent"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item label="任务备注">
            <uni-easyinput
              class="mb-2"
              type="textarea"
              placeholder="请输入任务备注"
              style="background-color: transparent"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item label="图片上传">
            <uni-file-picker class="pb-2" limit="1" style="margin: 0"></uni-file-picker>
          </uni-forms-item>
        </view>

        <view class="flex mt-5">
          <view class="w-50% mr-5">
            <button class="block w-100%" size="mini" type="primary" plain @click="">
              重置
            </button></view
          >

          <view class="w-50%">
            <button class="block w-100%" type="primary" @click="" size="mini">提交</button></view
          >
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
  width: 172rpx !important;
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
.checkbox /deep/ .checklist-box{
  margin-top: 0!important;
  margin-bottom: 0!important;
}


.checkbox /deep/ .uni-forms-item__content{
  display: flex;
  align-items: center;
  margin-left: 18rpx;
}
</style>
