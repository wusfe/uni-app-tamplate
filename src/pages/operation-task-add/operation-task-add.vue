<template>
  <view class="store-purchase ml-3 mr-3">
    <view class="bg-#ffffff pl-3 pr-3 pt-2 pb-4">
      <uni-forms ref="form" :modelValue="formInput" :rules="rules">
        <view class="bb1">
          <uni-forms-item required label="任务类型" name="taskType">
            <uni-data-select
              v-model="formInput.taskType"
              class="no-border"
              clear
              placeholder="请选择任务类型"
              :localdata="taskList"
            ></uni-data-select>
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required label="执行人" name="taskUserId">
            <uni-data-select
              v-model="formInput.taskUserId"
              class="no-border"
              clear
              placeholder="请选择任务执行人"
              :localdata="sysUserList"
            ></uni-data-select>
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required class="checkbox" label="起始时间" name="taskStime">
            <uni-datetime-picker type="date" v-model="formInput.taskStime">
              <template v-slot="scope">
                <view class="flex items-center justify-between">
                  <text v-if="scope.displayValue">{{ scope.displayValue }}</text>
                  <text v-else class="color-#999">{{ scope.placeholderText }}</text>
                  <uni-icons type="right" color="#999" size="16" />
                </view>
              </template>
            </uni-datetime-picker>
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item class="checkbox" label="结束时间" name="taskEtime">
            <uni-datetime-picker type="date" v-model="formInput.taskEtime">
              <template v-slot="scope">
                <view class="flex items-center justify-between">
                  <text v-if="scope.displayValue">{{ scope.displayValue }}</text>
                  <text v-else class="color-#999">{{ scope.placeholderText }}</text>
                  <uni-icons type="right" color="#999" size="16" />
                </view>
              </template>
            </uni-datetime-picker>
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item required label="任务标题" name="taskTitle">
            <uni-easyinput
              v-model="formInput.taskTitle"
              :inputBorder="false"
              placeholder="请输入任务标题"
              style="background-color: transparent"
              class="input"
            />
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item label="任务内容" name="taskContent">
            <uni-easyinput
              v-model="formInput.taskContent"
              class="mt-22rpx pl-20rpx"
              type="textarea"
              :inputBorder="false"
              placeholder="请输入任务内容"
              style="background-color: transparent"
            />
          </uni-forms-item>
        </view>
        <!-- 
        <view class="bb1">
          <uni-forms-item label="任务备注">
            <uni-easyinput
              class="mb-2"
              type="textarea"
              placeholder="请输入任务备注"
              style="background-color: transparent"
            />
          </uni-forms-item>
        </view> -->

        <view class="bb1">
          <uni-forms-item label="起始图片">
            <uni-file-picker
              ref="file1"
              class="pb-2"
              limit="1"
              style="margin: 0"
              :auto-upload="false"
              @select="(e: any) => handleSuccessFile(e, 'taskImg')"
              @delete="handleDeleteFile('taskImg')"
            ></uni-file-picker>
          </uni-forms-item>
        </view>

        <view class="bb1">
          <uni-forms-item label="结束图片">
            <uni-file-picker
              ref="file2"
              class="pb-2"
              limit="1"
              style="margin: 0"
              :auto-upload="false"
              @select="(e: any) => handleSuccessFile(e, 'taskEimg')"
              @delete="handleDeleteFile('taskEimg')"
            ></uni-file-picker>
          </uni-forms-item>
        </view>

        <view class="flex mt-5">
          <view class="w-50% mr-5">
            <button class="block w-100%" size="mini" type="primary" plain @click="handleReset">
              重置
            </button></view
          >

          <view class="w-50%">
            <button class="block w-100%" type="primary" @click="handleSubmit" size="mini">
              提交
            </button></view
          >
        </view>
      </uni-forms>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getsysUsertaskUserId, taskinforAdd } from '@/api'
import { useDictStore, useTokenStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
const memberStore = useTokenStore()
const dictStore = useDictStore()
const form = ref()
const formInput = ref({
  taskType: '',
  taskUserId: '',
  taskStime: '',
  taskTitle: '',
  taskContent: '',
  taskEtime: '',
  taskEimg: '',
  taskImg: '',
})
const file1 = ref()
const file2 = ref()

const rules = {
  taskType: {
    rules: [
      {
        required: true,
        errorMessage: '任务类型不能为空',
      },
    ],
  },
  taskStime: {
    rules: [
      {
        required: true,
        errorMessage: '起始时间不能为空',
      },
    ],
  },
  taskTitle: {
    rules: [
      {
        required: true,
        errorMessage: '任务标题不能为空',
      },
    ],
  },
  taskUserId: {
    rules: [
      {
        required: true,
        errorMessage: '任务执行人不能为空',
      },
    ],
  },
}
const taskList = computed(() => {
  return dictStore.taskType?.map((item: any) => ({ value: item?.code, text: item?.value }))
})

const sysUserList = ref([] as any)

onLoad(() => {
  dictStore.getTaskType()

  getsysUsertaskUserId().then((res) => {
    console.log(res)
    sysUserList.value = res?.result?.map((item: any) => {
      return {
        value: item?.value,
        text: item?.label,
      }
    })
  })
})

const handleSuccessFile = (v: any, type: string) => {
  
  const tempFilePaths = v.tempFilePaths

  uni.uploadFile({
    url: 'https://data.njzlskj.com/api/sysFile/uploadFile', //仅为示例，非真实的接口地址
    filePath: tempFilePaths[0],
    name: 'file',
    header: {
      Authorization: memberStore.token?.accessToken
        ? `Bearer ${memberStore.token?.accessToken}`
        : undefined,
    },
    success: (uploadFileRes) => {
      const result = JSON.parse(uploadFileRes.data)?.result
      const url = `https://data.njzlskj.com/${result?.filePath}/${result?.id}${result?.suffix}`

      ;(formInput.value as any)[type] = url
    },
  })
}

const handleSubmit = async () => {
  await form.value.validate()

  taskinforAdd(formInput.value).then(res => {
    uni.showToast({
      title: '新增成功'
    })
    uni.navigateBack()
  })

 
}

const handleDeleteFile = (type: any) => {
  (formInput.value as any)[type] = ''
}

const handleReset = () => {
  file1.value.clearFiles()
  file2.value.clearFiles()

  formInput.value = {
    taskType: '',
    taskUserId: '',
    taskStime: '',
    taskTitle: '',
    taskContent: '',
    taskEtime: '',
    taskEimg: '',
    taskImg: '',
  }

  
}
</script>

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
.checkbox /deep/ .checklist-box {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.checkbox /deep/ .uni-forms-item__content {
  display: flex;
  align-items: center;
  margin-left: 18rpx;
}

.no-border /deep/ .uni-select {
  border: none !important;
}

.store-purchase /deep/ .uni-easyinput__content-textarea {
  margin-top: 0 !important;
}
</style>
