<template>
  <view class="store-purchase ml-3 mr-3">
    <view class="bg-#ffffff pl-3 pr-3 pt-2 pb-4">
      <uni-forms ref="form" :modelValue="formInput" :rules="rules">
        <view class="bb1">
          <uni-forms-item required name="title" label="公告标题">
            <uni-easyinput
              v-model="formInput.title"
              :inputBorder="false"
              placeholder="请输入公告标题"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required label="公告内容" name="content">
            <view @click="handleEdit" class="pl-20rpx mt-18rpx">
              <text v-if="!formInput.content" class="color-#999">输入内容</text>
              <text v-if="formInput.content">查看内容</text>
            </view>

            <!-- <uni-easyinput
              class="mb-2"
              placeholder="请输入公告内容"
              style="background-color: transparent"
             type="textarea"
            /> -->
          </uni-forms-item>
        </view>

        <!--         
        <view class="bb1">
          <uni-forms-item  label="图片上传">
            <uni-file-picker class="pb-2" limit="1" style="margin: 0;"></uni-file-picker>
          </uni-forms-item>
        </view> -->


        <!-- <view class="bb1">
          <uni-forms-item label="添加附件">
            <uni-file-picker limit="5" file-mediatype="all" >
              <view class="pl-20rpx mt-18rpx">上传图片</view>
            </uni-file-picker>
          </uni-forms-item>
        </view> -->

        <view class="flex mt-5">
          <view class="w-50% mr-5">
            <button class="block w-100%" size="mini" type="primary" plain @click="handleReset">
              重置
            </button></view
          >

          <view class="w-50%">
            <button class="block w-100%" type="primary" @click="handleSubmit" size="mini">提交</button></view
          >
        </view>
      </uni-forms>
    </view>
  </view>

  <view class="relative" >
  <uni-popup ref="popup"  background-color="#fff" type="bottom" safe-area>
    
      <Myeditor v-if="open" @confirm="handleEditorConfirm" :modelValue="editorContent" @cancel="handleEditorCancel" />
   
  </uni-popup>
</view>
</template>

<script setup lang="ts">
import { sysNoticeAdd } from '@/api';
import Myeditor from '@/components/editor/editor.vue'
import { watch } from 'vue';
import { ref } from 'vue'

const form = ref()
const formInput = ref({
  title: '',
  content: '',
  type: 2,
})

const rules = {
  title: {
    rules: [
      {
        required: true,
        errorMessage: '公告标题不能为空',
      },
    ],
  },
  content: {
    rules: [
      {
        required: true,
        errorMessage: '公告内容不能为空',
      },
    ],
  },
}
// 获取姓名
const open = ref(false)
const popup = ref()
const handleEdit = () => {
  popup.value.open('bottom')

  setTimeout(() => {
    open.value = true
  }, 0)
}


const editorContent = ref()

watch(editorContent, (v) => {
  formInput.value.content = v?.html === '<p><br></p>' ? '':v?.html
}, {deep:true})

const handleEditorConfirm = (v: any) => {
  const { errMsg, text,delta, ...ops } = v 
  editorContent.value = ops;
  popup.value.close()
  setTimeout(() => {
    open.value = false
  }, 0)
}

const handleEditorCancel = (v: any) => {
  popup.value.close()
  setTimeout(() => {
    open.value = false
  }, 0)
}

const handleSubmit = async () => {
  await form.value.validate()

  sysNoticeAdd(formInput.value).then(res => {
    uni.showToast({
      title: '添加成功'
    })

    uni.navigateBack()
  })
}

const handleReset = () => {
  formInput.value = {
    title: '',
    content: '',
    type: 1,
  }

  editorContent.value = ''

  form.value.clearValidate()
}
</script>

<style scoped>
.input /deep/ .uni-easyinput__content {
  background-color: transparent !important;
}
.store-purchase /deep/ .uni-forms-item__label {
  width: 216rpx !important;
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
