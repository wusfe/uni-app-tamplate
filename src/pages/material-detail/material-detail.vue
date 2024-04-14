<template>
  <view class="pl-3 pr-3 pt-3">
    <view class="bg-#ffffff pt-4 pb-5 pl-4 pr-3">
      <view class="flex">
        <view class="flex flex-col">
          <view class="flex items-baseline mb-2">
            <view class="w-136rpx text-align-last-justify align-middle">
              <text >申请人</text>
            </view>
            <text>：</text>
            <view class="ml-1"><text class="align-bottom">{{ detail?.userName }}</text></view>
          </view>
<!-- 
          <view class="flex items-center mb-2">
            <view class="w-136rpx text-align-last-justify align-middle">
              <text class="align-middle">物料类型</text>
            </view>
            <text>：</text>
            <view class="ml-1"><text class="align-bottom">维修配件</text></view>
          </view> -->

          <view class="flex items-baseline mb-2">
            <view class="w-136rpx text-align-last-justify align-middle">
              <text >物料名称</text>
            </view>
            <text>：</text>
            <view class="ml-1"><text class="align-bottom">{{ detail?.goodsName }}</text></view>
          </view>

          <view class="flex items-baseline mb-2">
            <view class="w-136rpx text-align-last-justify align-middle">
              <text >领用数量</text>
            </view>
            <text>：</text>
            <view class="ml-1"><text class="align-bottom">{{ detail?.turnoverNumber }}</text></view>
          </view>

          <view class="flex items-baseline mb-2">
            <view class="w-136rpx text-align-last-justify align-middle">
              <text >领用状态</text>
            </view>
            <text>：</text>
            <view class="ml-1"
              ><text class="align-bottom pric" v-if="detail?.turnoverState == 0">待领用</text>
                  <text class="align-bottom scolor" v-if="detail?.turnoverState == 1">已领用</text>
                  <text class="align-bottom text-danger" v-if="detail?.turnoverState == -1">已退回</text></view
            >
          </view>

          <view class="flex items-baseline mb-2">
            <view class="w-136rpx text-align-last-justify align-middle">
              <text>申请时间</text>
            </view>
            <text>：</text>
            <view class="ml-1">
              <text>{{ detail?.createTime }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-3">
        <stepBar :stepList="list2" :step="3" />
      </view>

      <view class="mt-8">
        <view><button @click="handleReject">驳回</button></view>
        <view class="mt-3"><button type="primary" @click="handleAgree">同意</button></view>
      </view>
    </view>
  </view>

  <ddialog
    ref="rejectRef"
    custom
    title="请输入驳回内容"
    :formRef="formRef"
    @confirm="confirm"
    @cancel="cancel"
  >
    <uni-forms ref="formRef" :modelValue="formData">
      <uni-forms-item
        name="content"
        :rules="[
          {
            required: true,
            errorMessage: '请填写驳回内容',
          },
        ]"
      >
        <uni-easyinput
          v-model="formData.content"
          type="textarea"
          autoHeight
          placeholder="请输入驳回内容"
        ></uni-easyinput>
      </uni-forms-item>
    </uni-forms>
  </ddialog>
</template>

<script setup lang="ts">
import stepBar from '@/components/step-bar/index.vue'
import ddialog from '@/components/dialog/index.vue'
import { ref } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import { goodsturnoverDetail } from '@/api';

const active = ref(1)

const list2 = [
  {
    title: '申请人',
    desc: '段问薇',
  },
  {
    title: '部门主管',
    desc: '王乐康',
  },
  {
    title: '部门经理',
    desc: '赵雨',
  },
  {
    title: '总经理',
    desc: '孙忆枫',
  },
]

const rejectRef = ref()

const formRef = ref()
const formData = ref({
  content: '',
})

const detail = ref()
onLoad((query: any) => {
  // setTimeout(() => {
  //   rejectRef.value.open()
  // }, 0)

  // setTimeout(() => {
  //   console.log(formRef.value)
  // }, 3000)

  if (query.id) {
    goodsturnoverDetail({
      id: query?.id,
    }).then(res => {
      detail.value = res?.result
    })
  }
})

const confirm = () => {
  console.log('confirm')
}

const cancel = () => {
  console.log('cancel')
}


const handleReject = () => {
  rejectRef.value.open()
}

const handleAgree = () => {
 console.log(1);
 
}
</script>

<style scoped></style>
