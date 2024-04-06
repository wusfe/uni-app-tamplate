<template>
  <view class="pl-3 pr-3 pt-3">
    <view class="bg-#ffffff pt-4 pb-5 pl-4 pr-3">
      <view class="flex">
        <view class="flex flex-col">
          <view class="flex items-center mb-2">
            <view class="w-130rpx text-align-last-justify align-middle">
              <text class="align-middle">申请人</text>
            </view>
            <text>：</text>
            <view class="ml-1"><text class="align-bottom">张三</text></view>
          </view>

          <view class="flex items-center mb-2">
            <view class="w-130rpx text-align-last-justify align-middle">
              <text class="align-middle">物料类型</text>
            </view>
            <text>：</text>
            <view class="ml-1"><text class="align-bottom">维修配件</text></view>
          </view>

          <view class="flex items-center mb-2">
            <view class="w-130rpx text-align-last-justify align-middle">
              <text class="align-middle">物料名称</text>
            </view>
            <text>：</text>
            <view class="ml-1"><text class="align-bottom">发动机</text></view>
          </view>

          <view class="flex items-center mb-2">
            <view class="w-130rpx text-align-last-justify align-middle">
              <text class="align-middle">领用数量</text>
            </view>
            <text>：</text>
            <view class="ml-1"><text class="align-bottom">2</text></view>
          </view>

          <view class="flex items-center mb-2">
            <view class="w-130rpx text-align-last-justify align-middle">
              <text class="align-middle">领用状态</text>
            </view>
            <text>：</text>
            <view class="ml-1"
              ><text class="align-bottom">
                <text>审核中</text>
              </text></view
            >
          </view>

          <view class="flex items-center mb-2">
            <view class="w-130rpx text-align-last-justify align-middle">
              <text class="align-middle">申请时间</text>
            </view>
            <text>：</text>
            <view class="ml-1">
              <text>2024-03-05</text>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-3">
        <stepBar :stepList="list2" :step="3" />
      </view>


      <view class="mt-8">
          <view><button>驳回</button></view>
          <view class="mt-3"><button type="primary">同意</button></view>
      </view>
    </view>
  </view>

  <ddialog ref="rejectRef" custom title="请输入驳回内容" :formRef="formRef" @confirm="confirm" @cancel="cancel">

    <uni-forms
      ref="formRef"
      :modelValue="formData"
    >
      <uni-forms-item
        name="content"
        :rules="[
          {
            required: true,
            errorMessage: '请填写驳回内容',
			    },
        ]"
      >
      <uni-easyinput v-model="formData.content" type="textarea" autoHeight  placeholder="请输入驳回内容"></uni-easyinput>
      </uni-forms-item>
      
    </uni-forms>
  </ddialog>

</template>

<script setup lang="ts">
import stepBar from '@/components/step-bar/index.vue';
import ddialog from '@/components/dialog/index.vue';
import { ref } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app';

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

const rejectRef = ref();

const formRef = ref();
const formData = ref({
  content: ''
})

onLoad(() => {
  setTimeout(() => {
    
    
    rejectRef.value.open()
  }, 0)

  setTimeout(() => {
    console.log(formRef.value);
  }, 3000)
})

const confirm = () => {
  console.log('confirm');
  
}

const cancel = () => {
  console.log('cancel');
}
</script>

<style scoped></style>
