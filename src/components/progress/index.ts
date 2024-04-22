import { createVNode, render } from 'vue'
import progressComponent from './index.nvue'
 
const progress = function (options: any) {
  const container = document.createElement('div')
  const vm = createVNode(progressComponent, options)
  render(vm, container)
  document.body.appendChild(container)
}
const progressApi = {
  install(app: any) {
    // 配置此应用
    console.log(app);
    
    app.config.globalProperties.$progress = progress
  }
}
export default progressApi