import callCheckVersion, { type UniUpgradeCenterResult } from './call-check-version'
// #ifdef UNI-APP-X
import { type ComponentPublicInstance } from 'vue'
// import { openSchema } from './utils.uts'
// #endif

// 推荐再App.vue中使用
const PACKAGE_INFO_KEY = '__package_info__'

// uni-app 项目无法从 vue 中导出 ComponentPublicInstance 类型，故使用条件编译
// // #ifdef UNI-APP-X
// export default function (component : ComponentPublicInstance | null = null) : Promise<UniUpgradeCenterResult>
// // #endif
// #ifndef UNI-APP-X
export default function (): Promise<UniUpgradeCenterResult> {
  // #endif
  return new Promise<UniUpgradeCenterResult>((resolve, reject) => {
    callCheckVersion()
      .then(async (uniUpgradeCenterResult) => {
        // NOTE uni-app x 3.96 解构有问题
        const code = uniUpgradeCenterResult.code
        const message = uniUpgradeCenterResult.message
        const url = uniUpgradeCenterResult.url // 安装包下载地址

        if (uniUpgradeCenterResult?.shouldUpdate) {
          return updateUseModal(uniUpgradeCenterResult)
        }
        // // 此处逻辑仅为示例，可自行编写
        // if (code > 0) {
        //   // 腾讯云和阿里云下载链接不同，需要处理一下，阿里云会原样返回
        //   const tcbRes = await uniCloud.getTempFileURL({ fileList: [url] })
        //   if (typeof tcbRes.fileList[0].tempFileURL !== 'undefined')
        //     uniUpgradeCenterResult.url = tcbRes.fileList[0].tempFileURL

        //   /**
        //    * 提示升级一
        //    * 使用 uni.showModal
        //    */
        // //   return updateUseModal(uniUpgradeCenterResult)
        //   return updateUseModal(uniUpgradeCenterResult)

        //   /**
        //    * 提示升级二
        //    * 官方适配的升级弹窗，可自行替换资源适配UI风格
        //    */
        //   //   // #ifndef UNI-APP-X
        //   //   uni.setStorageSync(PACKAGE_INFO_KEY, uniUpgradeCenterResult)
        //   //   uni.navigateTo({
        //   //     url: `/uni_modules/uni-upgrade-center-app/pages/upgrade-popup?local_storage_key=${PACKAGE_INFO_KEY}`,
        //   //     fail: (err) => {
        //   //       console.error('更新弹框跳转失败', err)
        //   //       uni.removeStorageSync(PACKAGE_INFO_KEY)
        //   //     }
        //   //   })
        //   //   // #endif
        //   //   // #ifdef UNI-APP-X
        //   //   component?.$callMethod('show', true, uniUpgradeCenterResult)
        //   //   // #endif

        //   return resolve(uniUpgradeCenterResult)
        // } else if (code < 0) {
        //   console.error(message)
        //   return reject(uniUpgradeCenterResult)
        // }
        // return resolve(uniUpgradeCenterResult)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 使用 uni.showModal 升级
 */
function updateUseModal(packageInfo: UniUpgradeCenterResult): void {
  // #ifdef APP
  const {
    title = '更新', // 标题
    contents = '', // 升级内容
    is_mandatory, // 是否强制更新
    url = 'http://39.99.242.50:8001/zhld.apk', // 安装包下载地址
    type = 'wgt',
    platform,
  } = packageInfo

  let isWGT = type === 'wgt'
  let isiOS = !isWGT ? platform.includes('iOS') : false

  // #ifndef UNI-APP-X
  // @ts-ignore
  let confirmText = isiOS ? '立即跳转更新' : '立即下载更新'
  // #endif
  // #ifdef UNI-APP-X
  // @ts-ignore
  let confirmText = '立即更新'
  // #endif

  return uni.showModal({
    title,
    content: 'APP有新版发布，点击 立即更新 进行最新版本下载。',
    showCancel: !is_mandatory,
    confirmText,
    success: (res) => {
      if (res.cancel) return

      // if (isiOS) {
      // 	// iOS 平台跳转 AppStore
      // 	// #ifndef UNI-APP-X
      // 	plus.runtime.openURL(url);
      // 	// #endif
      // 	// #ifdef UNI-APP-X
      // 	openSchema(url)
      // 	// #endif
      // 	return;
      // }

      // uni.showToast({
      //   title: '后台下载中……',
      //   duration: 1000,
      // })

      const dtask = plus.downloader.createDownload(url, {}, function (d: any, status) {
        // 下载完成
        if (status == 200) {
          // 下载好直接安装，下次启动生效
          // uni-app x 项目没有 plus5+ 故使用条件编译
          // #ifndef UNI-APP-X
          plus.runtime.install(
            plus.io.convertLocalFileSystemURL(d.filename),
            {
              force: false,
            },
            () => {
              if (is_mandatory) {
                //更新完重启app
                plus.runtime.restart()
                return
              }
              uni.showModal({
                title: '安装成功是否重启？',
                success: (res) => {
                  if (res.confirm) {
                    //更新完重启app
                    plus.runtime.restart()
                  }
                },
              })
            },
            (err) => {
              uni.showModal({
                title: '更新失败',
                content: err.message,
                showCancel: false,
              })
            },
          )
          // #endif

          // #ifdef UNI-APP-X
          uni.installApk({
            filePath: plus.io.convertLocalFileSystemURL(d.filename),
            success: () => {
              uni.showModal({
                title: '安装成功请手动重启',
              })
            },
            fail: (err: any) => {
              uni.showModal({
                title: '更新失败',
                content: err.message,
                showCancel: false,
              })
            },
          })
          // #endif
        } else {
          uni.showToast({
            title: '更新失败',
            icon: 'none',
          })
        }
      })

      try {
        dtask.start() //开启下载任务
        let prg = 0
        let showLoading = plus.nativeUI.showWaiting('正在下载')
        dtask.addEventListener('statechanged', function (task, status) {
          // 给下载任务设置监听
          switch (task.state) {
            case 1:
              showLoading.setTitle('正在下载')
              break
            case 2:
              showLoading.setTitle('已连接到服务器')
              break
            case 3:
              //@ts-ignore
              prg = parseInt((parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100)
              showLoading.setTitle('正在下载' + prg + '%')
              break
            case 4:
              // 下载完成
              plus.nativeUI.closeWaiting()
              break
          }
        })
      } catch (e) {
        plus.nativeUI.closeWaiting()
        uni.showToast({
          title: '更新失败',
          icon: 'none',
        })
      }
    },
  })
  // #endif
}
