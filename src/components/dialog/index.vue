<template>
    <view>
        <uni-popup
            ref="popup"
            type="center"
        >
            <view class="p-20rpx bg-#ffffff rounded-20rpx w-400rpx relative pb-80rpx">

                <view v-id="title" class="text-center text-xm mb-3 mt-1">{{title}}</view>

                <view>

                    <slot></slot>
                </view>

                <view class="flex position-absolute bottom-0 left-0 right-0 b1">

                    <view class=" w-50% h-80rpx flex justify-center items-center br1" @click="cancel"><text>取消</text></view>
                    <view class="w-50% h-80rpx flex justify-center items-center" @click="confirm"><text class="text-color-primary">确定</text></view>

                </view>
                    
                
            </view>
        </uni-popup>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { reactive } from 'vue';
import { ref } from 'vue';

const props = defineProps(['title', 'formRef', 'custom'])

const emits = defineEmits(['confirm', "cancel"])

const formRef = computed(() => props.formRef)

const popup = ref();


const cancel = () => {

    emits("cancel")

    popup.value.close()
    //取消
}

const confirm =  async() => {
    // 确认
    console.log(12);
    
    if(formRef){
        console.log(formRef.value, 121);
        
        await formRef.value?.validate()
    }

    if(!props.custom){
        popup.value.close()
    }

    emits("confirm")
}

const open = () => {
    popup.value.open('center')
}


defineExpose({
    cancel,
    confirm,
    open
})


</script>

<style scoped>

</style>