<template >
	<view >
		<view v-if="isshow" :style="{ height: (winHeight)+ 'px',width: winWidth+'px',overflow:'hidden'}">


			<!-- <view class="jfh" :style="{ height: (iStatusBarHeight + 44 )+ 'px' }">
				<view class="jfhz" @tap="guanbi">
					取消
				</view>
				<view class="jfhy" @tap="ok">
					确定
				</view>
			</view> -->
			<view id="mapDiv" class="mapDiv" :option="option" :change:option="Trenderjs.updateEcharts" 
				:style="{height:(winHeight-0-180)+'px'}"></view>
 
			<image src="./xwz_dw.png" mode="" class="mapDiv21"
				:style="{top:((winHeight-iStatusBarHeight-180)/2)+'px'}"></image>

			<view class="xlistw">
				<view class="xlistt">
					当前地址
				</view>
				<view class="xlist" v-for="(i,index) in arr_list" :key="index">
					<view class="xlist1">
						{{i.name}}
					</view>
					<view class="xlist2">
						{{i.addressComponent.city}} ({{i.location.lon}},{{i.location.lat}})
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		
		name: 'syljSelectlocation',
		props: {

			apikey: {
				type: String,
				default: '13078c561bcc74e8444fce41f89fcf94'
			}
		},
		data() {
			return {
				winHeight: 500,
				winWidth: 300,
				iStatusBarHeight: 0,
				arr_list: [],
				lng: "",
				lat: "",
				isshow: false,
				option: {
					lng: "",
					lat: "",
					apikey: "13078c561bcc74e8444fce41f89fcf94",
				}
			}
		},

		onLoad(e) {
			var that = this;
			that.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			uni.getSystemInfo({
				success: function(res) {
					that.winWidth = res.windowWidth
					that.winHeight = res.windowHeight


				}
			});



		},
		onHide() {
			//console.log('hide')
		},
		methods: {
			ok() {
				this.$emit('ok', this.arr_list[0])
				this.isshow = false
				this.$destroy();
			},
			open(e, f, g) {
				var that = this;
				that.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
				uni.getSystemInfo({
					success: function(res) {
						that.winWidth = res.windowWidth
						that.winHeight = res.windowHeight


					}
				});

				if (e && f && g) {
					that.isshow = true
					that.lng = e
					that.lat = f
					that.option = {
						lng: e,
						lat: f,
						apikey: g
					}
					// that.nijiexi({
					// 	lng: e,
					// 	lat: f,
					// 	apikey: g
					// })
				} else {
					if (g) {
						that.lng = 116.40769
						that.lat = 32.89945
						that.nijiexi({
							lng: e,
							lat: f,
							apikey: g
						})
					} else {
						uni.showToast({
							title: '请输入天地图apikey',
							icon: 'none',
							//mask: true,
							duration: 2000
						});
					}

				}

			},
			guanbi() {
				var that = this;
				that.isshow = false
				this.$emit('guanbi', this.arr_list[0])
				//console.log(888)
				//this.$destroy();
				  //that.$refs.selectLocationPop.$destroy()
			},
			queding() {
				var that = this;
				uni.navigateBack();
			},
			nijiexi(e) {
				////console.log(e)
				var that = this;
				uni.showLoading({
					//content: '',
					mask: true
				})
				
				
						
				uni.request({
					//url: 'https://service.sdmap.gov.cn/geodecode',
					url: 'https://api.tianditu.gov.cn/geocoder',
					method: 'GET',
					data: {
						postStr: JSON.stringify({
							lon: e.lng,
							lat: e.lat,
							ver: 1,
						}),
						type: 'geocode',
						tk: e.apikey
					},

					success: res => {
						//console.log(res);
						if (res.data.result) {
							var fobg = res.data.result
							fobg.name = res.data.result.formatted_address
							that.arr_list = [
								fobg
							]

							//that.dqdz=res.data.result.point.name

						} else {

						}



					},
					fail: () => {
						//console.log('获取失败')
					},
					complete: () => {
						uni.hideLoading();
					}
				});

			}
		}
	}
</script>

<script module="Trenderjs" lang="renderjs">
	let Tmap
	export default {
		data() {
			return {
				isinit: false,
			 
			}
		},
		mounted(e) {
			
			// if (typeof window.T === 'function') {


			// 	//this.initEcharts()
			// } else {
			// 	////console.log('init00')
			// 	if (this.option&&this.option.apikey) {
			// 		const script = document.createElement('script')
			// 		// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
			// 		script.src = 'http://api.tianditu.gov.cn/api?v=4.0&tk=' + this.option.apikey
					
			// 		script.onload = this.initEcharts.bind(this)
			// 		document.head.appendChild(script)
					
					
			// 	}

			// }
		},
		methods: {
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				////console.log(9999)
				////console.log(newValue)
				////console.log(oldValue)
				window.doptions = newValue
				

				const { apikey } = window.doptions
				if (apikey) {
					
					 const script = document.createElement('script')
					 script.src = 'http://api.tianditu.gov.cn/api?v=4.0&tk=' + apikey
					 
					 script.onload = this.initEcharts.bind(this)
					 document.head.appendChild(script)
					 

				
				}



			},
			initEcharts() {
				var that = this;
				//return
				////console.log(window.T)
				Tmap = new T.Map('mapDiv', {
					projection: 'EPSG:4326'
				});
				//console.log(this.option)
				//console.log('init')
				

			
				const {lng, lat, apikey} = window.doptions
				Tmap.centerAndZoom(new T.LngLat(lng,lat), 17);
				//Tmap.removeEventListener("moveend");
				Tmap.addEventListener("moveend", function(e) {
					////console.log(e.target.getCenter().getLng() + "," + e.target.getCenter().getLat())
					that.$ownerInstance.callMethod('nijiexi', {
						lng: e.target.getCenter().getLng(),
						lat: e.target.getCenter().getLat(),
						apikey: apikey
					})
				});

				//var statisticsForm=this.data.bsForm

			},

		}
	}
</script>

<style>
	page {
		background-color: #FFF;
	}

	.mapDiv {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1008;
		background: #EDEDED;
	}

	.mapDiv2 {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;

	}

	.mapDiv21 {
		width: 30px;
		height: 30px;
		position: fixed;
		left: 50%;
		margin-left: -15px;
		top: 50%;
		margin-top: -15px;
		z-index: 10010000;
	}

	.jfh {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 44px;
		z-index: 10010000;
		background: rgba(0, 0, 0, 0);
	}

	.jfhz {
		widows: 40px;
		height: 26px;
		line-height: 26px;
		position: absolute;
		left: 4%;
		bottom: 9px;
		text-align: left;
		font-size: 14px;
		color: #464646;
	}

	.jfhy {
		width: 40px;
		height: 26px;
		line-height: 26px;
		position: absolute;
		right: 4%;
		bottom: 9px;
		text-align: center;
		font-size: 14px;
		color: white;
		background: #3E89F7;
		border-radius: 6px;
	}

	.xlistt {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 16px;
		font-weight: bold;
		color: #333333;
		border-bottom: 1px solid #F3F3F3;
	}

	.xlistw {
		overflow: scroll;
		position: fixed;
		height: 180px;
		left: 0;
		bottom: 0;
		background-color: white;
		width: 100%;
		z-index: 1006;

	}

	.xlist {
		width: 100%;
		height: auto;
		position: relative;
		line-height: 20px;

	}

	.xlist1 {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		position: relative;
		line-height: 20px;
		padding-top: 10px;
		padding-bottom: 5px;
		padding-left: 4%;
		padding-right: 4%;
		font-size: 16px;
		color: #1A1A1A;
	}

	.xlist2 {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		position: relative;
		line-height: 20px;
		padding-top: 0px;
		padding-bottom: 10px;
		padding-left: 4%;
		padding-right: 4%;
		font-size: 14px;
		color: #BEBEBE;
	}
</style>