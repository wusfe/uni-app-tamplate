<template>
  <view class="store-purchase ml-3 mr-3">
    <view class="bg-#ffffff pl-3 pr-3 pt-2 pb-4">
      <uni-forms ref="form" :modelValue="formInput" :rules="rules">
        <view class="bb1">
          <uni-forms-item required name="carNumber" label="车牌号">
            <view class="flex ">
              <view class=" grow-1"><uni-easyinput
              v-model="formInput.carNumber"
              :inputBorder="false"
              placeholder="请输入车牌号或扫车牌识别"
              style="background-color: transparent"
              class="input"
            /></view>

            <uni-icons @click="handleETC" class="shrink-0" type="scan" color="" size="28" ></uni-icons>
            </view>
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
import { AddOperationsCar } from '@/api';
import Myeditor from '@/components/editor/editor.vue'
import { watch } from 'vue';
import { ref } from 'vue'
import permision from '@/utils/permission'
import { useEtcStore } from '@/stores'

const etcStore = useEtcStore()
const form = ref()
const formInput = ref({
  carNumber: ''
})

const rules = {
  carNumber: {
    rules: [
      {
        required: true,
        errorMessage: '车牌号不能为空',
      },
    ],
  },
  
}
const handleETC = async () => {
  const result = await permision.requestAndroidPermission('android.permission.CAMERA')

  if (result === -1) {
    uni.showModal({
      title: '照相机权限申请',
      content: '是否允许开启照相机功能？',
      success: (res) => {
        if (res.confirm) {
          permision.gotoAppPermissionSetting()
        }
      },
    })
  } else {
   

    const app = getApp<any>()


    app.globalData.setImage = (url: string) => {
     
      plus.io.resolveLocalFileSystemURL(url, function (entry: any) {
        entry.file(function (e: any) {
          let fileReader = new plus.io.FileReader()
          fileReader.onload = function (r: any) {
            getEtcCode(r.target.result, url)
         
          }
          fileReader.readAsDataURL(e)
        })
      })
    }
    uni.navigateTo({
      url: '/pages/camera/camera',
    })
    
  }
}



const getEtcCode = (imageUrl: any, url: any) => {
  uni.showLoading({
    title:'识别中...'
  })
  let s = encodeURI(imageUrl.replace('/^data:image\/\w+;base64,/', ''))

  //   let a = '24.c4a32685868f9f5eb5550af984a365df.2592000.1715909195.282335-61703788'
  var options = {
    // 'method': 'POST',
    url: `https://aip.baidubce.com/rest/2.0/ocr/v1/license_plate`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    filePath: url,
    formData: {
      access_token: etcStore.token,
      image: s,
    },
    success(res: any) {
      try {
        const data = JSON.parse(res?.data)

        if (data?.words_result?.number) {
          console.log(data?.words_result?.number)
         formInput.value.carNumber = data?.words_result?.number
        } else {
          uni.showToast({
            title: '请重新拍照识别',
            icon: 'error',
          })
        }
      } catch (error) {}
    },
    fail(error:any) {
      console.log(error)
    },
    complete:()=>{
      uni.hideLoading()
    },
  }

  uni.uploadFile(options)
  // uni.request(options);
}




const handleSubmit = async () => {
  await form.value.validate()

  AddOperationsCar(formInput.value.carNumber).then(res => {
    uni.showToast({
      title: '添加成功',
      success(){
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
      }
    })

    
  })
}

const handleReset = () => {
  formInput.value = {
    carNumber: ''
  }

 

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
