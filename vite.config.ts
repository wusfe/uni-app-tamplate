import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import unocss from 'unocss/vite'
import vuejsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/kk': {
        target: 'https://api.tianditu.gov.cn',
        changeOrigin: true,
        rewrite:  (path) => path.replace(/^\/kk/, ''),
      },
    },
  },

  build: {
    // 开发阶段启用源码映射：https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#需主动开启-sourcemap
    sourcemap: process.env.NODE_ENV === 'development',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  plugins: [uni(), unocss(), vuejsx()],
})
