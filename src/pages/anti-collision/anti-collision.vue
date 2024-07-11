<template>
	<view class="content">
		<view class="">

		</view>
		<!-- <button @tap="xuanweizhi" style="margin-top: 160px;">选取位置</button> -->
		<!-- <view class="dqwz" v-if="name">
			当前位置: {{name}}
		</view>
		<view class="dqwz"  style="margin-top: 20px;">
			lng: {{lng}}
		</view>
		<view class="dqwz"  style="margin-top: 20px;">
			lat: {{lat}}
		</view> -->
		<sylj-selectLocation ref="selectLocationPop" ></sylj-selectLocation>
	</view>
</template>

<script>
import syljSelectLocation from '@/components/sylj-selectLocation/sylj-selectLocation.vue'
	export default {

		data() {
			return {
				name: "",

				lng: "",
				lat: ""
			}
		},
    components: {
			'sylj-selectLocation ': syljSelectLocation
		},
		onUnload() {
			const app = getApp()
			app.globalData.setTimer(false)
			if(app.globalData.setTimer){
				app.globalData.setTimer = null
			}
		},
		onHide() {
			

			const app = getApp()

			app.globalData?.setTimer(false)
			
		},

		onShow(){
			const app = getApp()
			if(app?.globalData?.setTimer){
				app.globalData.setTimer(true)
			}
		
		},
		onLoad() {
			// setTimeout(() => {
			// 	this.$refs.selectLocationPop.open(12, 121,
			// 			'13078c561bcc74e8444fce41f89fcf94');
			// }, 200)
			uni.getLocation({
				type: 'wgs84',
				success: (res) => {
					uni.hideLoading();
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);

					this.$refs.selectLocationPop.open(res.longitude, res.latitude,
						'13078c561bcc74e8444fce41f89fcf94');

				},
				fail: function(err) {
					console.log('获取失败');
					uni.hideLoading();

				},

			});
		},
		methods: {
			selectedOk(data) {
				// console.log(data)
				this.ismap = false
				this.name = data.name
				this.lng = data.location.lon
				this.lat = data.location.lat
			},
			xuanweizhi() {
				var that = this;
				// if (that.lng) {

				// 	that.$refs.selectLocationPop.open(that.lng, that.lat, '********');
				// } else {
				// 	that.$refs.selectLocationPop.open(121, 32, '*****');
				// }

				/*uni.showLoading({
					//content: '',
					mask: true
				})
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						uni.hideLoading();
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						 that.$refs.selectLocationPop.open( res.longitude,res.latitude,'******');  
				
					},
					fail: function(err) {
						console.log('获取失败');
						uni.hideLoading();
						 
					},
				
				});*/
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						uni.hideLoading();
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						that.$refs.selectLocationPop.open(res.longitude, res.latitude,
							'13078c561bcc74e8444fce41f89fcf94');
							
					},
					fail: function(err) {
						console.log('获取失败');
						uni.hideLoading();

					},

				});

			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}


	.dqwz {
		width: 90%;
		margin: 0 auto;
		margin-top: 50px;
		text-align: left;
		font-size: 14px;
		color: #666666;
	}
</style>