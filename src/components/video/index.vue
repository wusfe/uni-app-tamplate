<template>
	<view class="content">
		<view class="preview" id="video-containe1212r" :isBack="isBack" :change:isBack="ezuikit.handleChange" :info="info" :change:info="ezuikit.renderez"></view>
		
		<view :class="{'operate':true, 'text-left':isBack, 'text-right':!isBack}" @click="ezuikit.handleBack">
			<view class="operate-wrap">
				<uni-icons
				v-if="isBack"
				type="arrow-left"
				color="#007aff"
				size="18"
			/>
			<text class="pric">{{isBack?'返回直播':"查看回看"}}</text>
			<uni-icons
				v-if="!isBack"
				type="arrow-right"
				color="#007aff"
				size="18"
			/>
			</view>
		</view>
		<!-- <button @click="ezuikit.pause">pause</button>
		<button @click="ezuikit.play">play</button> -->
		<!-- <view>
			<button @click="ezuikit.stop">stop</button>
			<button @click="ezuikit.play">play</button>
			<button @click="ezuikit.openSound">openSound</button>
			<button @click="ezuikit.closeSound">closeSound</button>
			<button @click="ezuikit.startSave">startSave</button>
			<button @click="ezuikit.stopSave">stopSave</button>
			<button @click="ezuikit.capturePicture">capturePicture</button>
			<button @click="ezuikit.fullScreen">fullScreen</button>
			<button @click="ezuikit.getOSDTime">getOSDTime</button>
			<button @click="ezuikit.ezopenStartTalk">开始对讲</button>
			<button @click="ezuikit.ezopenStopTalk">结束对讲</button>
			<button @click="ezuikit.destroy">销毁</button>
		</view> -->
	</view>
</template>

<script>
	
	export default {
        props:{
			bid: {
				type: String,
				default: 'video-containe1212r'
			},
			ac:{
				type: String,
				default: ''
			},
			url:{
				type: String,
				default: ''
			},
			mode: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				strings: ' ',
				id: Date.now(),
				isBack: false,
				sysInfo: {},
				info: {}
			}
		},
		mounted(){
			// this.sysInfo = uni.getSystemInfoSync();

			this.info.sysInfo = uni.getSystemInfoSync();
			this.info.ac = this.ac;
			this.info.url = this.url;


		},	
		onHide(){
			console.log('销毁2')
			
		},
		onhide(){
			console.log('销毁3')
			
		},
		destroyed(){
			console.log('destroyed2')
		},
		methods: {
			getsysInfo (){
				return uni.getSystemInfoSync();
			},
			handler(){
				console.log(1)
			},
			handleBk(v){
				this.isBack = !this.isBack

				
			}
		}
	}
</script>

<script module="ezuikit" lang="renderjs">
	import EZUIKit from 'ezuikit-js';
	var themeData = {
	     "header": {
	       "color": "red",
	       "activeColor": "#FFFFFF",
	       "backgroundColor": "#000000",
	       "btnList": [
	         {
	           "iconId": "deviceID",
	           "part": "left",
	           "defaultActive": 0,
	           "memo": "顶部设备序列号",
	           "isrender": 1
	         },
	         {
	           "iconId": "deviceName",
	           "part": "left",
	           "defaultActive": 0,
	           "memo": "顶部设备名称",
	           "isrender": 1
	         },
	         {
	           "iconId": "cloudRec",
	           "part": "right",
	           "defaultActive": 1,
	           "memo": "云存储",
	           "isrender": 0
	         },
	         {
	           "iconId": "rec",
	           "part": "right",
	           "defaultActive": 0,
	           "memo": "SD卡回放",
	           "isrender": 0
	         }
	       ]
	     },
	     "footer": {
	       "color": "#FFFFFF",
	       "activeColor": "#1890FF",
	       "backgroundColor": "#00000021",
	       "btnList": [
			  
	         {
	           "iconId": "play",
	           "part": "left",
	           "defaultActive": 1,
	           "memo": "播放",
	           "isrender": 1
	         },
			 // {
			 //   "iconId": "rec",
			 //   "part": "left",
			 //   "defaultActive": 0,
			 //   "memo": "SD卡回放",
			 //   "isrender": 1
			 // },
			 
	         {
	           "iconId": "capturePicture",
	           "part": "left",
	           "defaultActive": 0,
	           "memo": "截屏按钮",
	           "isrender": 1
	         },
	         {
	           "iconId": "sound",
	           "part": "left",
	           "defaultActive": 0,
	           "memo": "声音按钮",
	           "isrender": 1
	         },
	         {
	           "iconId": "pantile",
	           "part": "left",
	           "defaultActive": 0,
	           "memo": "云台控制按钮",
	           "isrender": 1
	         },
	         {
	           "iconId": "recordvideo",
	           "part": "left",
	           "defaultActive": 0,
	           "memo": "录制按钮",
	           "isrender": 1
	         },
	         {
	           "iconId": "talk",
	           "part": "left",
	           "defaultActive": 0,
	           "memo": "对讲按钮",
	           "isrender": 1
	         },
	         {
	           "iconId": "zoom",
	           "part": "left",
	           "defaultActive": 0,
	           "memo": "电子放大",
	           "isrender": 1
	         },
			 
			 
	         {
	           "iconId": "hd",
	           "part": "right",
	           "defaultActive": 0,
	           "memo": "清晰度切换按钮",
	           "isrender": 1
	         },
			 
	         // {
	         //   "iconId": "webExpend",
	         //   "part": "right",
	         //   "defaultActive": 0,
	         //   "memo": "网页全屏按钮",
	         //   "isrender": 1
	         // },
	         {
	           "iconId": "expend",
	           "part": "right",
	           "defaultActive": 0,
	           "memo": "全局全屏按钮",
	           "isrender": 1
	         }
	       ]
	     }
	   };
		
		
	var player = null;

	export default {
	
		mounted() {
		},
		destroyed(){
			console.log('destroyed')
		},
		beforeDestroy(){
			console.log('销毁')
			this.destroy()
		},
		onHide(){
			console.log('销毁4')
			
		},
		onhide(){
			console.log('销毁5')
			
		},
		methods: {
			handleChange(n){

				console.log('-------------的凝视对方单方面能否得到 ---------------')
				window.isBack = n
				
			},
			handleBack(event, ownerInstance){
				// console.log(window.isBack)
				// console.log('-------------dasasdnasmdnsmadnsmandmsd---------------')
				player.Theme.changeTheme(!window.isBack?'mobileRec':'mobileLive')

				const {  ac:accessToken, url } = window.values;
				if(window.isBack){
				player.changePlayUrl({
							url,
							accessToken
						})
				}
			
				window.isBack = !window.isBack

				ownerInstance.callMethod('handleBk', !window.isBack)
			//    player.changePlayUrl({
			// 	url: 'ezopen://open.ys7.com/K81920045/1.rec',
			// 	accessToken: 'at.0gdd8a317becfxa74mqggq473q0k9clw-1ov8dhukwh-0swmjbo-wynkclbbv'
			//    })

			   
            },
			renderez(newValue, oldValue, ownerInstance, instance){

				// console.log('newValue:', newValue)
				// console.log('oldValue:', oldValue)
				// console.log('ownerInstance:', ownerInstance)
				// console.log('instance:', instance)
				
				window.values = newValue

				this.initPlayer()

			},
			pause(){
				// player.pause()
				console.log(player);
				// player.chan(ezopen://open.ys7.com/813962203/27)
				// player.stop()

			},
			handleY(){
				console.log(player);
			},
			initPlayer() {
				
				const { windowWidth } = window.values.sysInfo
			

				// console.log( window.values, ' window.values.')

			

				const {  ac:accessToken, url } = window.values;

				console.log(accessToken, url, windowWidth)
				// console.log('video-' + this.id, `'video-' + this.id'video-' + this.id`);
				player = new EZUIKit.EZUIKitPlayer({
				  id: 'video-containe1212r', // 视频容器ID
				  accessToken,
				  url,
				  // simple - 极简版; pcLive-pc直播；pcRec-pc回放；mobileLive-移动端直播；mobileRec-移动端回放;security - 安防版;voice-语音版;
				  // template: 'security',
				  template: 'mobileLive',
				//   themeData:themeData,
				   plugin: ['talk'], // 加载插件，talk-对讲
				  width: windowWidth ,
				  height: windowWidth * 2 / 3,
				//   useHardDev: true,
				  handleSuccess(){
					// player.pause()

					
				  }
				});
				window.player = player;

				
			},
			play() {
				var playPromise = player.play();
				playPromise.then((data) => {
					console.log("promise 获取 数据", data)
				})
			},
			stop() {
				var stopPromise = player.stop();
				stopPromise.then((data) => {
					console.log("promise 获取 数据", data)
				})
			},
			getOSDTime() {
				var getOSDTimePromise = player.getOSDTime();
				getOSDTimePromise.then((data) => {
					console.log("promise 获取 数据", data)
				})
			},
			capturePicture() {
				var capturePicturePromise = player.capturePicture(`${new Date().getTime()}`);
				capturePicturePromise.then((data) => {
					console.log("promise 获取 数据", data)
				})
			},
			openSound() {
				var openSoundPromise = player.openSound();
				openSoundPromise.then((data) => {
					console.log("promise 获取 数据", data)
				})
			},
			closeSound() {
				var openSoundPromise = player.closeSound();
				openSoundPromise.then((data) => {
					console.log("promise 获取 数据", data)
				})
			},
			startSave() {
				var startSavePromise = player.startSave(`${new Date().getTime()}`);
				startSavePromise.then((data) => {
					console.log("promise 获取 数据", data)
				})
			},
			stopSave() {
				var stopSavePromise = player.stopSave();
				stopSavePromise.then((data) => {
					console.log("promise 获取 数据", data)
				})
			},
			ezopenStartTalk() {
				player.startTalk();
			},
			ezopenStopTalk() {
				player.stopTalk();
			},
			fullScreen() {
				player.fullScreen();
			},
			destroy() {
				var destroyPromise = player.destroy();
				destroyPromise.then((data) => {
					console.log("promise 获取 数据", data)
				})
			}
		}
	}
</script>

<style>
	 .content {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		/* justify-content:center; */
		height: 100%;
	}

	/deep/ .preview {
		flex-shrink: 0;
		background-color: black;
		order: 0;
	}
	
	/deep/ .mucontent{
		order: 1!important;
		flex-shrink: 0;
		
		/* background-color: red; */
		text-align: right;
	}
	/deep/ .mobile-ez-ptz-container   .live-ptz-title {
		display: none!important;
	}
	
	.content > /deep/ .mobile-ez-ptz-container{
		flex-grow: 1;
		/* width: auto!important;
		height: 80%!important; */
		order: 2!important;
	}
	
	/deep/ .mobile-ez-ptz-container  .live-ptz-intro {
		display: none;
	}
	.content /deep/ .text-left {
		align-items: start;
		text-align: left;
	}
	.content /deep/ .text-right {
		align-items: end;
		text-align: right!important;
	}
	.content /deep/ .date-switch-container-wrap{
		order: 2;
	}
	.content /deep/ .rec-type-container-wrap{
		order: 3;
	}
	.content /deep/ .mobileRec-wrap{
		order: 4;
	}

	.operate-wrap{
		padding: 15rpx 30rpx;
		display: flex;
		align-items: center;
	}
	.pric{
		color: #007aff;
		margin-right: 10rpx;
	}
	.operate{
		display: flex;
		/* align-items: center; */
	}
	.operate.text-right {
		justify-content: end;
	}

	
</style>
