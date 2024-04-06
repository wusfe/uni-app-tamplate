<template>
   <slot></slot>
</template>

<script setup lang="ts">
import { onUnload } from '@dcloudio/uni-app';
import { provide, ref, useSlots } from 'vue';

   

    const coms = ref<any>([]);
    
    const registryCom = (com:any) => {
        coms?.value?.push(com)
    }

    const hidePup = (target:any) => {
        coms?.value?.forEach((item:any) => {
            if(item !== target){
                item?.hideSelector()
            }
            
        })
    }
    onUnload(() => {
        coms.value = []
    })

    provide('provideRegistrySelect', registryCom);
    provide('provideHidePup', hidePup);
</script>

<style scoped>

</style>