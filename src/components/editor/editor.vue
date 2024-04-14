<template>
  <view class="edit-container">
    <view class="page-body">
      <view class="wrapper">
        <view class="shrink-0 flex justify-between items-center bb1 py-20rpx px-20rpx">
          <view @click="handlecancel">取消</view>
          <view class="pric" @tap="getCon">保存</view>
        </view>

        <view class="toolbar" @tap="format">
          <view
            :class="formats.bold ? 'ql-active' : ''"
            class="iconfont icon-zitijiacu"
            data-name="bold"
          >
          </view>
          <view
            :class="formats.italic ? 'ql-active' : ''"
            class="iconfont icon-zitixieti"
            data-name="italic"
          >
          </view>
          <view
            :class="formats.underline ? 'ql-active' : ''"
            class="iconfont icon-zitixiahuaxian"
            data-name="underline"
          ></view>
          <view
            :class="formats.strike ? 'ql-active' : ''"
            class="iconfont icon-zitishanchuxian"
            data-name="strike"
          ></view>
          <!-- #ifndef MP-BAIDU -->
          <view
            :class="formats.align === 'left' ? 'ql-active' : ''"
            class="iconfont icon-zuoduiqi"
            data-name="align"
            data-value="left"
          ></view>
          <!-- #endif -->
          <view
            :class="formats.align === 'center' ? 'ql-active' : ''"
            class="iconfont icon-juzhongduiqi"
            data-name="align"
            data-value="center"
          ></view>
          <view
            :class="formats.align === 'right' ? 'ql-active' : ''"
            class="iconfont icon-youduiqi"
            data-name="align"
            data-value="right"
          ></view>
          <view
            :class="formats.align === 'justify' ? 'ql-active' : ''"
            class="iconfont icon-zuoyouduiqi"
            data-name="align"
            data-value="justify"
          ></view>
          <!-- #ifndef MP-BAIDU -->
          <view
            :class="formats.lineHeight ? 'ql-active' : ''"
            class="iconfont icon-line-height"
            data-name="lineHeight"
            data-value="2"
          ></view>
          <view
            :class="formats.letterSpacing ? 'ql-active' : ''"
            class="iconfont icon-Character-Spacing"
            data-name="letterSpacing"
            data-value="2em"
          ></view>
          <view
            :class="formats.marginTop ? 'ql-active' : ''"
            class="iconfont icon-722bianjiqi_duanqianju"
            data-name="marginTop"
            data-value="20px"
          ></view>
          <view
            :class="formats.marginBottom ? 'ql-active' : ''"
            class="iconfont icon-723bianjiqi_duanhouju"
            data-name="marginBottom"
            data-value="20px"
          ></view>
          <!-- #endif -->

          <view class="iconfont icon-clearedformat" @tap="removeFormat"></view>

          <!-- #ifndef MP-BAIDU -->
          <view
            :class="formats.fontFamily ? 'ql-active' : ''"
            class="iconfont icon-font"
            data-name="fontFamily"
            data-value="Pacifico"
          ></view>
          <view
            :class="formats.fontSize === '24px' ? 'ql-active' : ''"
            class="iconfont icon-fontsize"
            data-name="fontSize"
            data-value="24px"
          ></view>
          <!-- #endif -->
          <view
            :class="formats.color === '#0000ff' ? 'ql-active' : ''"
            class="iconfont icon-text_color"
            data-name="color"
            data-value="#0000ff"
          ></view>
          <view
            :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''"
            class="iconfont icon-fontbgcolor"
            data-name="backgroundColor"
            data-value="#00ff00"
          ></view>
          <view class="iconfont icon-date" @tap="insertDate"></view>
          <view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
          <view
            :class="formats.list === 'ordered' ? 'ql-active' : ''"
            class="iconfont icon-youxupailie"
            data-name="list"
            data-value="ordered"
          ></view>
          <view
            :class="formats.list === 'bullet' ? 'ql-active' : ''"
            class="iconfont icon-wuxupailie"
            data-name="list"
            data-value="bullet"
          ></view>

          <view class="iconfont icon-undo" @tap="undo"></view>
          <view class="iconfont icon-redo" @tap="redo"></view>

          <view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
          <view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
          <view class="iconfont icon-fengexian" @tap="insertDivider"></view>
          <view class="iconfont icon-charutupian" @tap="insertImage"></view>
          <view
            :class="formats.header === 1 ? 'ql-active' : ''"
            class="iconfont icon-format-header-1"
            data-name="header"
            :data-value="1"
          ></view>
          <view
            :class="formats.script === 'sub' ? 'ql-active' : ''"
            class="iconfont icon-zitixiabiao"
            data-name="script"
            data-value="sub"
          ></view>
          <view
            :class="formats.script === 'super' ? 'ql-active' : ''"
            class="iconfont icon-zitishangbiao"
            data-name="script"
            data-value="super"
          ></view>

          <view class="iconfont icon-shanchu" @tap="clear"></view>

          <view
            :class="formats.direction === 'rtl' ? 'ql-active' : ''"
            class="iconfont icon-direction-rtl"
            data-name="direction"
            data-value="rtl"
          ></view>
        </view>

        <view class="editor-wrapper">
          <editor
            id="editor"
            class="ql-container"
            placeholder="开始输入..."
            show-img-size
            show-img-toolbar
            show-img-resize
            @statuschange="onStatusChange"
            :read-only="readOnly"
            @ready="onEditorReady"
          >
          </editor>
        </view>
        <!-- <view>
          <button @tap="getCon">打印文本内容</button>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import { useTokenStore } from '@/stores'

export default {
  data() {
    return {
      readOnly: false,
      formats: {},
    }
  },
  props: {
    modelValue: {
      any: true,
    },
  },
  created() {},
  onLoad() {
    // #ifndef MP-BAIDU
    uni.loadFontFace({
      family: 'Pacifico',
      source: 'url("/static/font/Pacifico-Regular.ttf")',
      success() {
        console.log('success load font')
      },
      fail() {
        console.log('fail load font load')
      },
    })
    // #endif
  },
  methods: {
    readOnlyChange() {
      this.readOnly = !this.readOnly
    },
    getCon() {
      this.editorCtx.getContents({
        success: (res) => {
          this.$emit('confirm', res)
          //   console.log('文本详情：', res)
        },
        fail: (err) => {
          // console.log(err)
        },
      })
    },
    handlecancel() {
      this.$emit('cancel')
    },
    onEditorReady() {
      // setTimeout(() => {
      // 	console.log(this.modelValue, 1212);
      // },2000)
      // #ifdef MP-BAIDU
      this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor')
      // #endif

      // #ifdef APP-PLUS || MP-WEIXIN || H5
      uni
        .createSelectorQuery()
        .select('#editor')
        .context((res) => {
          this.editorCtx = res.context
			
		  if(this.modelValue){
			this.editorCtx.setContents({
            ...this.modelValue,
            success(res) {
              console.log('success', res)
            },
            fail(error) {
              console.log('erroe', error)
            },
          })
		  }
          

        })
        .exec()
      // #endif
    },
    undo() {
      this.editorCtx.undo()
    },
    redo() {
      this.editorCtx.redo()
    },
    format(e) {
      let { name, value } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      this.editorCtx.format(name, value)
    },
    onStatusChange(e) {
      const formats = e.detail
      this.formats = formats
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function () {
          console.log('insert divider success')
        },
      })
    },
    clear() {
      uni.showModal({
        title: '清空编辑器',
        content: '确定清空编辑器全部内容？',
        success: (res) => {
          if (res.confirm) {
            this.editorCtx.clear({
              success: function (res) {
                console.log('clear success')
              },
            })
          }
        },
      })
    },
    removeFormat() {
      this.editorCtx.removeFormat()
    },
    insertDate() {
      const date = new Date()
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.editorCtx.insertText({
        text: formatDate,
      })
    },
    insertImage() {
      uni.chooseImage({
        count: 1,
        sourceType: ['album'],
        // mediaType: ["image"],
        success: (res) => {
          // 本地路径
          const tempFilePaths = res.tempFilePaths
          const memberStore = useTokenStore()

          uni.uploadFile({
            url: 'https://data.njzlskj.com/api/sysFile/uploadFile', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              Authorization: memberStore.token?.accessToken
                ? `Bearer ${ memberStore.token?.accessToken}`
                : undefined,
            },
            success: (uploadFileRes) => {
              console.log(uploadFileRes)
              const result = JSON.parse(uploadFileRes.data)?.result
              const url = `https://data.njzlskj.com/${result?.filePath}/${result?.id}${result?.suffix}`
              this.editorCtx.insertImage({
                src: url,
                alt: '图像',
                success: function () {
                  console.log('insert image success')
                },
              })
            },
          })
        },
      })
    },
  },
}
</script>

<style>
@import './editor-icon.css';
.edit-container {
  /* height: 100vh;
		padding-top: calc(var(--window-top) + var(--status-bar-height));
		box-sizing: border-box; */
}
.page-body {
  /* height: calc(100vh - var(--window-top) - var(--status-bar-height)); */
  /* height: calc(100vh  - var(--status-bar-height)); */
  /* height: 100vh; */
  /* height: calc(100% - var(--window-top) - var(--status-bar-height)); */
  background-color: #ffffff;
}

.wrapper {
  height: 100vh;
  padding-top: calc(var(--window-top) + var(--status-bar-height));
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.editor-wrapper {
  /* height: calc(100vh - var(--window-top) - var(--status-bar-height) - 80px - 46px); */
  flex-grow: 1;
  overflow-y: auto;
  /* background: #fff; */
}

.iconfont {
  display: inline-block;
  padding: 8px 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 20px;
}

.toolbar {
  flex-shrink: 0;
  box-sizing: border-box;
  border-bottom: 0;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

.ql-container {
  box-sizing: border-box;
  padding: 12px 15px;
  width: 100%;
  min-height: 30vh;
  height: 100%;
  /* margin-top: 20px; */
  font-size: 16px;
  line-height: 1.5;
}

.ql-active {
  color: #06c;
}
</style>
