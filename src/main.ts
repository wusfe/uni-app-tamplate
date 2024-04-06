import { createSSRApp } from 'vue'
import App from './App.vue'
import BarArea from '@/components/bar-area/index.vue'
// 导入 pinia 实例
import pinia from './stores'

import 'virtual:uno.css'

// import VConsole from 'vconsole';

// const vConsole = new VConsole();
import mescrollBody from "mescroll-uni/mescroll-body.vue";
export function createApp() {
  const app = createSSRApp(App)

  // 使用 pinia
  app.use(pinia)
  app
    .component('BarArea', BarArea)
    
  return {
    app,
  }
}
