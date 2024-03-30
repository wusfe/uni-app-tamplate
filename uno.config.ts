// uno.config.ts
import { defineConfig } from 'unocss'
import { presetUni } from '@uni-helper/unocss-preset-uni'
import presetIcons from '@unocss/preset-icons';

export default defineConfig({
  presets: [
    presetUni(),
    presetIcons()
  ]
})