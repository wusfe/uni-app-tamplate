<template>
 <view>
    <myVideo ref="zhiboRef" id="sdnasbdnas" :ac="ac"  :url="url" v-if="ac && url"/>
 </view>
</template>

<script setup lang="ts">
import myVideo from '@/components/video/index.vue'
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const props = defineProps(['ac', 'url'])

const ac = ref("")
const url = ref("")
const type = ref(1)

onLoad((query:any) => {
 if(query.ac){
   ac.value = query.ac
   url.value= query.url
 }
})


</script>

<style scoped>

</style>