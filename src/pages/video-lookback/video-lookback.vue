<template>
 <view>
    <myVideo :ac="ac"  :url="url" v-idf="ac && url" mode="mobileRec"/>
 </view>
</template>

<script setup lang="ts">
import myVideo from '@/components/video/index.vue'
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const props = defineProps(['ac', 'url'])

const ac = ref("")
const url = ref("")


onLoad((query:any) => {
  ac.value = query.ac
  url.value= query.url
})
</script>

<style scoped>

</style>