import { createSSRApp } from 'vue'
import App from './App.vue'
import BarArea from '@/components/bar-area/index.vue'
// 导入 pinia 实例
import pinia from './stores'

import 'virtual:uno.css'

import { tranNumber } from './utils'

// import VConsole from 'vconsole';

// const vConsole = new VConsole();

export function createApp() {
  const app = createSSRApp(App);

  app.config.globalProperties.$tranNumber = tranNumber;
  
  // 使用 pinia
  app.use(pinia)
  app
    .component('BarArea', BarArea)
    
  return {
    app,
  }
}
