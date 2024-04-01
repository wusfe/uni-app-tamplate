<template>
  <view class="content">
    <image class="logo" mode="scaleToFill" src="/static/logo.png" />

     hallow world
     这是一个demo
     11

    <view>
      {{profile?.name }}
    </view>


    {{ car.name }}
    {{ carName }}

    {{ objetcReactive.count }}

    <view>
      objetcRef.count: {{ objetcRef.count }}
    </view>

    <view>
      objetcReactive2.count.name: {{ objetcReactive2.count.name }}
    </view>

    <view>
      refArr[0].value: {{ refArr[0].value }}
    </view>

    <view>
      tr: {{ tr }}
    </view>


   
    <view>
      rr.count: {{ rrcount }}
    </view>

    <view>
      state.foo: {{ state.foo }}
    </view>
    

    <view>

      kkcount: {{ kkcount }}
    </view>
     <button @tap="handleUpdateName()">修改name</button>
    <view class="text-area text-center" >
      <text class="title text-red-700">{{ title }}</text>
    </view>

      <view class="flex justify-center"></view>  
    <i class="i-ep:switch-button"></i>
  </view>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores';
import { ref, reactive, onMounted ,watch, toRefs} from 'vue';
import { storeToRefs } from 'pinia';
import { toRef } from 'vue';
import { readonly } from 'vue';
import { watchEffect } from 'vue';


const title = ref('Hello')



const { profile, setProfile } = useMemberStore();


console.log(storeToRefs(useMemberStore()), 11)

const handleUpdateName = () => {
  // setProfile({name: '1212',age: 66});


  // car.value.name = 'xiaomiSu8';

  // objetcRef.value.count = 5

  // fooRef.value = 1212121

  kk.count = 88888
}

const car = ref({
  name: 'xiaomiSu7',
  age: 12
})

const { name:carName } = car.value;


const objetcReactive = reactive({count: 0})


const objetcReactive2 = reactive({count: {name: 1}})

const objetcRef = ref({count: 0})


watch(objetcRef, (newVal, oldVal) => {
  console.log('well done',)
}, {deep: true})

onMounted(() => {
  setTimeout(() => {
  //   console.log('onMounted')
  // objetcReactive.count = 1;
  // objetcReactive2.count.name = 12121212

  // refArr[0].value = 2

  rr.value.count = 233;
  tr = 3
  }, 2000)
})

const refArr = [ref(1)];


let tr = 1;
// console.log(refArr[0].value);


const rr = ref({count: 0});

const { count:rrcount } =reactive(rr.value);



const state = {
  foo: 1,
  bar: 2
};

// (window as any).ss =state
// 双向 ref，会与源属性同步
const fooRef = toRef(state, 'foo')


const kk = reactive({count: 0})

// const kkcount = toRef(kk, 'count');
const {count:kkcount} = toRefs(kk);



</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  // color: #8f8f94;
}
</style>
