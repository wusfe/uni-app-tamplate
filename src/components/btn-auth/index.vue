<template>
   <view @click="handleClick" v-if="slots.default">
    <slot ></slot>
   </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { useSlots } from 'vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const emits = defineEmits(['click'])

const props = defineProps<{
    ac?:string
}>()

const slots = useSlots()

// onLoad(() =>{
//     console.log(props);
    
//     console.log(userStore.profile, 'userStore')
// })

const handleClick = () => {
    
    if(props?.ac && !userStore?.profile?.buttons?.some(item => item === props?.ac)){
        uni.showModal({
            title:'暂无操作权限',
            content:'请联系管理员',
            showCancel:false,
            
        })
       
    }else {
        emits('click')
    }
   
}
</script>

<style scoped>

</style>