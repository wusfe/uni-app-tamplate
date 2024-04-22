import { createSSRApp } from 'vue'
import App from './App.vue'
import BarArea from '@/components/bar-area/index.vue'
// 导入 pinia 实例
import pinia from './stores'
import '@/utils/routePermission'
import 'virtual:uno.css'

import { tranNumber } from './utils'

import AuthBtn from '@/components/btn-auth';


// import VConsole from 'vconsole';

// const vConsole = new VConsole();
// #ifdef H5
//@ts-ignore
import quill from "quill";
(window as any).Quill = quill;
// #endif
export function createApp() {
  const app = createSSRApp(App);
  app.component("auth-btn", AuthBtn)
  
  app.config.globalProperties.$tranNumber = tranNumber;
  


  // 使用 pinia
  app.use(pinia)
  app
    .component('BarArea', BarArea)
    
  return {
    app,
  }
}
