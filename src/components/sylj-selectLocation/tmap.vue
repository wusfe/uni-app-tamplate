<template>
  <view>
    <view
      v-if="isshow"
      :style="{ height: winHeight + 'px', width: winWidth + 'px', overflow: 'hidden' }"
    >
      <!-- <view class="jfh" :style="{ height: (iStatusBarHeight + 44 )+ 'px' }">
				<view class="jfhz" @tap="guanbi">
					取消
				</view>
				<view class="jfhy" @tap="ok">
					确定
				</view>
			</view> -->
      <view
        id="mapDiv"
        class="mapDiv"
        :option="option"
        :change:option="Trenderjs.updateEcharts"
        :r="d"
        :change:r="Trenderjs.krenderMap"
        :style="{ height: winHeight - 0 - 180 + 'px' }"
      ></view>

      <!-- <image src="./xwz_dw.png" mode="" class="mapDiv21"
				:style="{top:((winHeight-iStatusBarHeight-180)/2)+'px'}"></image> -->

      <view class="xlistw">
        <view class="xlistt">轨迹日志</view>
        <view class="xlist" v-for="(i, index) in arr_list" :key="i.lat + i.lon">
          <logVue :item="i" :apikey="apikey" :key="i.lat + i.lon" />

          <!-- <view class="xlist1">
            {{ i.name }}
          </view>
          <view class="xlist2">
            {{ i.addressComponent.city }} ({{ i.location.lon }},{{ i.location.lat }})
          </view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import logVue from './log.vue'
import { getLocationinfoList } from '@/api'
export default {
  name: 'syljSelectlocation',
  components: {
    logVue,
  },
  props: {
    apikey: {
      type: String,
      default: '13078c561bcc74e8444fce41f89fcf94',
    },
  },

  data() {
    return {
      winHeight: 500,
      winWidth: 300,
      iStatusBarHeight: 0,
      arr_list: [],
      lng: '',
      lat: '',
      isshow: false,
      option: {
        lng: '',
        lat: '',
        apikey: '13078c561bcc74e8444fce41f89fcf94',
        api: () => getLocationinfoList(),
      },

      d: [],
    }
  },

  onLoad(e) {
    var that = this
    that.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
    uni.getSystemInfo({
      success: function (res) {
        that.winWidth = res.windowWidth
        that.winHeight = res.windowHeight
      },
    })
  },

  methods: {
    convertMapToObject(map) {
      let obj = {}
      for (let [k, v] of map) {
        obj[k] = v
      }

      return JSON.stringify(obj)
    },
    async tinitEcharts() {
      const app = getApp()

      app.globalData.setTimer = (flag) => {
        if (flag) {
          // show
          if (!this.timer) {
            upda()
          }
        } else {
          clearTimeout(this.timer)
          this.timer = null
        }
      }

      const that = this
      const self = this
      const getData = () => {
        return new Promise((r, c) => {
          const logArr = []
          getLocationinfoList().then((res) => {
            if (res.result) {
              logArr.push(...res.result)

              this.nijiexi(logArr)
              //   that.$ownerInstance.callMethod('nijiexi', logArr)
            }

            r(res.result || [])
          })
        })
      }

      // 得到Tab

      // 得到每个tab下面的记录数据

      // 得到页面的获取页面的point

      let data = await getData()

      const mapData = new Map()

      const renderMap = () => {
        // that.d.splice(0, 1, mapData)
        //  this.$set(this.d, 0 ,this.convertMapToObject(mapData))

        this.d = [this.convertMapToObject(mapData)]
      }

      const initMap = () => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index]
          const valueGet = mapData.get(element.terminalId)

          if (element.terminalId && !valueGet) {
            mapData.set(element.terminalId, {
              Polyline: null,
              point: [],
              data: [...(element.lat && element.lon ? [element] : [])],
            })
          } else if (valueGet) {
            mapData.set(element.terminalId, {
              ...valueGet,
              data: [...valueGet.data, ...(element.lat && element.lon ? [element] : [])],
            })
          }
        }

        // that.$ownerInstance.callMethod('nijiexi', {
        // 	d: mapData
        // })
        renderMap()
      }

      initMap(data)

      const upda = async () => {
        clearTimeout(this.timer)
        this.timer = null
        this.timer = setTimeout(async () => {
          let data = await getData()
          updateMap(data)
          upda()
        }, 30 * 1000)
      }

      upda()

      const updateMap = (d) => {
        // 与原先的map对比，找到差异的队列

        for (let index = 0; index < d.length; index++) {
          const element = d[index]
          const valueGet = mapData.get(element.terminalId)

          if (
            element.lat &&
            element.lon &&
            !valueGet.data.some((t) => t.lat === element.lat && t.lon === element.lon)
          ) {
            valueGet.data.push(element)
          }
        }

        // that.$ownerInstance.callMethod('nijiexi', {
        // 	d: mapData
        // })
        renderMap()
      }
    },
    ok() {
      this.$emit('ok', this.arr_list[0])
      this.isshow = false
      this.$destroy()
    },
    open(e, f, g) {
      var that = this
      that.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
      uni.getSystemInfo({
        success: function (res) {
          that.winWidth = res.windowWidth
          that.winHeight = res.windowHeight
        },
      })

      if (e && f && g) {
        that.isshow = true
        that.lng = e
        that.lat = f
        that.option = {
          lng: e,
          lat: f,
          apikey: g,
          api: () => getLocationinfoList(),
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
            apikey: g,
            // api: getLocationinfoList,
          })
        } else {
          uni.showToast({
            title: '请输入天地图apikey',
            icon: 'none',
            //mask: true,
            duration: 2000,
          })
        }
      }
    },

    guanbi() {
      var that = this
      that.isshow = false
      this.$emit('guanbi', this.arr_list[0])
      //console.log(888)
      //this.$destroy();
      //that.$refs.selectLocationPop.$destroy()
    },
    queding() {
      var that = this
      uni.navigateBack()
    },
    nijiexi(e) {
      ////console.log(e)
      var that = this

      const filterArr = e?.filter((item) => item.lat && item.lon) || []
      this.arr_list.push(...filterArr)

      //   console.log(this.arr_list, 'this.arr_list');

      return
      uni.showLoading({
        //content: '',
        mask: true,
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
          tk: e.apikey,
        },

        success: (res) => {
          console.log(res)
          //console.log(res);
          if (res.data.result) {
            var fobg = res.data.result
            fobg.name = res.data.result.formatted_address
            that.arr_list = [fobg]

            //that.dqdz=res.data.result.point.name
          } else {
          }
        },
        fail: () => {
          //console.log('获取失败')
        },
        complete: () => {
          uni.hideLoading()
        },
      })
    },
  },
}
</script>

<script module="Trenderjs" lang="renderjs">
// import { getLocationinfoList } from '@/api';

let Tmap
export default {
	data() {
		return {
			isinit: false,
			data: []
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
   createRotatedIcon(url, angle) {
      return new Promise((r, c) => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = url;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            context.translate(img.width / 2, img.height / 2);
            context.rotate(angle * Math.PI / 180);
            context.drawImage(img, -img.width / 2, -img.height / 2);


            r(canvas.toDataURL())
        };


        // return canvas.toDataURL();
      })
    },
		async krenderMap(newValue, oldValue, ownerInstance, instance){
			if(newValue.length === 0) return

      const mapData = JSON.parse(newValue[0])

			this.Tmap?.clearOverLays()

				const renderPoint = [];

				for (const k in mapData) {

          // console.log(k);
					// const [key, value] = k
          const value = mapData[k]

					const points = [];


          // for(let index =0; index < value.data.length; index++){

          // }
					for(let index = 0; index < value.data.length; index++){
            const item = value.data[index]
						const lngLat  = new T.LngLat(item.lon, item.lat)


						// console.log(index, value.data);
						// var icon = new T.Icon({
						// 	iconUrl: (index + 1) == value.data.length && value.data.length> 0 ?'static/marker-icon.png':'static/logo-df.png',
						// 	iconSize: new T.Point(25, 25),
						// 	iconAnchor: new T.Point(12, 25),
						// 	label: `<div class="font-marker">&#xf041;</div>`
						// 	// label: '中sds手动'
            			// });

             let rotatedIconUrl;
             if(!((index + 1) == value.data.length && value.data.length> 1)){
              rotatedIconUrl = await this.createRotatedIcon('static/logo-df.png', item.direction || 0)
             }

						let marker =  new T.Marker(lngLat, (index + 1) == value.data.length && value.data.length> 1 ?{
							icon: new T.Icon({
								iconUrl: 'static/location-end.png',
								iconSize: new T.Point(50, 50),
								// iconAnchor: lngLat,

            				})

						}: {
							icon: new T.Icon({
								iconUrl: rotatedIconUrl,
								iconSize: new T.Point(25, 25),
								// iconAnchor: lngLat,


            				})
						});

						// console.log(marker.setLabel, 'marker', );

						// marker.setLabel(new T.Label({
						// 	text: '起点',
						// 	offset: new T.Point(20, -10)
                		// }))

						this.Tmap.addOverLay(marker);


            // setTimeout(() => {

            //   var iconElement = marker.getElement();
            //   iconElement.style.transform = iconElement.style.transform + 'rotateZ(' + (item.direction || 0 ) + 'deg)'
            //   iconElement.style.transformOrigin = 'center center'
            //   // console.log(iconElement.style, '.iconElement.style');
            //   // iconElement.style.transform = 'rotate(' + 90 + 'deg)';
            // }, 0);




						let labelMarker;

						if(index + 1 === value.data.length){

							 labelMarker = new T.Label({
								text: item.terminalId + '',
								position: lngLat,
								// offset: new T.Point(-20, -20),
								backgroundColor: 'rgba(255, 255, 255, 0)',
								fontSize: '6px',
								zIndex: 999
							});
							this.Tmap.addOverLay(labelMarker);
						}



						// labelMarker.setStyle({
						//     color: '#0000ff', // 设置文字颜色为蓝色
						//     backgroundColor: 'rgba(255, 255, 255, 0.5)' // 设置背景颜色为半透明白色
						// });

						// console.log(labelMarker.setOpacity(0.3));
						// labelMarker.element.style.backgroundColor = 'red';




						// marker.setIcon(new T.Icon({
						// 	// iconUrl: "static/avr.png",  // 标记图标的URL
						// 	iconSize: new T.Point(24, 24),  // 图标尺寸
						// 	iconAnchor: new T.Point(12, 12)  // 图标的锚点
						// }));

						points.push(lngLat)

						renderPoint.push(lngLat)
					}

					value.point = points

					value.Polyline = new T.Polyline(value.point, {
						// color: "black",
						weight: 2,
						// opacity: 0.1,
						// lineStyle: "solid"
       				});

				   this.Tmap.addOverLay(value.Polyline)
				}

				// console.log(mapData.get(2012).point);

				if (renderPoint.length === 1) {

					this.Tmap.centerAndZoom(renderPoint[0], 15);

				} else {

					this.Tmap.setViewport(renderPoint);
				}
		},
		updateEcharts(newValue, oldValue, ownerInstance, instance) {
			console.log('----------------updateEcharts-----------------');

			// console.log(JSON.stringify(newValue), '---------newValuenewValuenewValue---------');
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


			// console.log(uni, 'uniuniuni');
			// console.log(window.doptions.apikey)

			// console.log(window.doptions.api)

			// const app = window.doptions.app




			var that = this;


			this.Tmap = new T.Map('mapDiv', {
				projection: 'EPSG:4326'
			});

			this.$ownerInstance.callMethod('tinitEcharts')

			// Tmap.centerAndZoom(new T.LngLat(119.86297, 32.2849), 15)

			// getLocationinfoList().then(res => {
			// 	if(res.result){
			// 		logArr.push(...res.result)

			// 		that.$ownerInstance.callMethod('nijiexi', logArr)
			// 	}

			// })


			return
			// const getData = () => {
			// 	return new Promise((r, c) => {
			// 		const logArr = [];
			// 		window.doptions.api().then(res => {
			// 			console.log(11);
			// 			if(res.result){
			// 				logArr.push(...res.result)

			// 				that.$ownerInstance.callMethod('nijiexi', logArr)
			// 			}

			// 			r(res.result || [])
			// 		})

			// 		// setTimeout(() => {
			// 		// 	r([
			// 		// 		{
			// 		// 			terminalId:2801,



			// 		// 			lat: 39.904211,
			// 		// 			lon: 116.407394,


			// 		// 			direction: null,
			// 		// 			gpsTime:"2024-05-17 15:36:10"
			// 		// 		},
			// 		// 		{
			// 		// 			terminalId:2012,
			// 		// 			lat: null,
			// 		// 			lon: null,

			// 		// 			// lat: 39.904211,
			// 		// 			// lon: 116.412394,

			// 		// 			direction: null,
			// 		// 			gpsTime:"2024-05-17 15:36:10"
			// 		// 		},
			// 		// 		{
			// 		// 			terminalId:8,
			// 		// 			lat: null,
			// 		// 			lon: null,
			// 		// 			direction: null,
			// 		// 			gpsTime:"2024-05-17 15:36:10"
			// 		// 		}
			// 		// 	])

			// 		// }, 2000)
			// 	})
			// }

			// 得到Tab

			// 得到每个tab下面的记录数据

			// 得到页面的获取页面的point


			// let data = await getData()


			// console.log(data, 'T.Map');




			// const mapData = new Map()

			// // 首次加载获取数据，需要渲染
			// const renderMap = () => {

			// 	Tmap?.clearOverLays()

			// 	const renderPoint = [];

			// 	for (const k of mapData) {

			// 		const [key, value] = k


			// 		const points = [];


			// 		value.data?.forEach((item, index) => {

			// 			const lngLat  = new T.LngLat(item.lon, item.lat)


			// 			// console.log(index, value.data);
			// 			// var icon = new T.Icon({
			// 			// 	iconUrl: (index + 1) == value.data.length && value.data.length> 0 ?'static/marker-icon.png':'static/logo-df.png',
			// 			// 	iconSize: new T.Point(25, 25),
			// 			// 	iconAnchor: new T.Point(12, 25),
			// 			// 	label: `<div class="font-marker">&#xf041;</div>`
			// 			// 	// label: '中sds手动'
            // 			// });

			// 			let marker =  new T.Marker(lngLat, (index + 1) == value.data.length && value.data.length> 1 ?{
			// 				icon: new T.Icon({
			// 					iconUrl: 'static/location-end.png',
			// 					iconSize: new T.Point(50, 50),
			// 					// iconAnchor: lngLat,

            // 				})

			// 			}: {
			// 				icon: new T.Icon({
			// 					iconUrl: 'static/logo-df.png',
			// 					iconSize: new T.Point(25, 25),
			// 					// iconAnchor: lngLat,


            // 				})
			// 			});

			// 			// console.log(marker.setLabel, 'marker', );

			// 			// marker.setLabel(new T.Label({
			// 			// 	text: '起点',
			// 			// 	offset: new T.Point(20, -10)
            //     		// }))

			// 			Tmap.addOverLay(marker);


			// 			let labelMarker;

			// 			if(index + 1 === value.data.length){

			// 				 labelMarker = new T.Label({
			// 					text: item.terminalId + '',
			// 					position: lngLat,
			// 					// offset: new T.Point(-20, -20),
			// 					backgroundColor: 'rgba(255, 255, 255, 0)',
			// 					fontSize: '6px',
			// 					zIndex: 999
			// 				});
			// 				Tmap.addOverLay(labelMarker);
			// 			}


			// 			// labelMarker.setStyle({
			// 			//     color: '#0000ff', // 设置文字颜色为蓝色
			// 			//     backgroundColor: 'rgba(255, 255, 255, 0.5)' // 设置背景颜色为半透明白色
			// 			// });

			// 			// console.log(labelMarker.setOpacity(0.3));
			// 			// labelMarker.element.style.backgroundColor = 'red';




			// 			// marker.setIcon(new T.Icon({
			// 			// 	// iconUrl: "static/avr.png",  // 标记图标的URL
			// 			// 	iconSize: new T.Point(24, 24),  // 图标尺寸
			// 			// 	iconAnchor: new T.Point(12, 12)  // 图标的锚点
			// 			// }));

			// 			points.push(lngLat)

			// 			renderPoint.push(lngLat)
			// 		})

			// 		value.point = points

			// 		value.Polyline = new T.Polyline(value.point, {
			// 			// color: "black",
			// 			weight: 2,
			// 			// opacity: 0.1,
			// 			// lineStyle: "solid"
       		// 		});

			// 		Tmap.addOverLay(value.Polyline)
			// 	}

			// 	// console.log(mapData.get(2012).point);

			// 	if (renderPoint.length === 1) {

			// 		Tmap.centerAndZoom(renderPoint[0], 15);

			// 	} else {

			// 		Tmap.setViewport(renderPoint);
			// 	}

			// 	// console.log(renderPoint);
			// 	// Tmap.setViewport(renderPoint);
			// }


			// const initMap = () => {
			// 	for (let index = 0; index < data.length; index++) {
			// 	const element = data[index];
			// 	const valueGet  = mapData.get(element.terminalId)

			// 		if(element.terminalId && !valueGet ){
			// 			mapData.set(element.terminalId, {
			// 				Polyline: null,
			// 				point: [],
			// 				data:  [ ...( element.lat && element.lon? [element]: []) ]
			// 			})
			// 		}else if(valueGet){
			// 			mapData.set(element.terminalId, {
			// 				...valueGet,
			// 				data: [ ...valueGet.data, ...( element.lat && element.lon? [element]: [])  ]
			// 			})
			// 		}

			// 	}




			// 	// that.$ownerInstance.callMethod('nijiexi', {
			// 	// 	d: mapData
			// 	// })
			// 	renderMap()
			// }


			// initMap(data)


			// let index = 0

			// const upda = async () => {
			// 	clearTimeout(this.timer)
			// 	this.timer = null
			// 	this.timer = setTimeout(async () => {
			// 		// const d = [
			// 		// {
			// 		// 				terminalId:2801,

			// 		// 				lat: index == 1? 39.909211: 39.908211,
			// 		// 				lon:index == 1? 116.431394: 116.411394,
			// 		// 				direction: null,
			// 		// 				gpsTime:"2024-05-17 15:36:10"
			// 		// 			},
			// 		// 			{
			// 		// 				terminalId:2012,
			// 		// 				lat: null,
			// 		// 				lon: null,
			// 		// 				direction: null,
			// 		// 				gpsTime:"2024-05-17 15:36:10"
			// 		// 			},
			// 		// 			{
			// 		// 				terminalId:8,
			// 		// 				lat: null,
			// 		// 				lon: null,
			// 		// 				direction: null,
			// 		// 				gpsTime:"2024-05-17 15:36:10"
			// 		// 			}
			// 		// ]
			// 		let data = await getData()


			// 		updateMap(data)
			// 		// updateMap(d)
			// 		// if(index === 0){
			// 		// 	console.log('执行了');
			// 		// 	upda()
			// 		// }
			// 		// index++

			// 		upda()
			// 	}, 30 * 1000)
			// }

			// upda()

			// const updateMap = (d) => {
			// 	// 与原先的map对比，找到差异的队列

			// 	for (let index = 0; index < d.length; index++) {
			// 		const element = d[index];
			// 		const valueGet  = mapData.get(element.terminalId)


			// 		if(element.lat && element.lon && !valueGet.data.some(t=> (t.lat === element.lat && t.lon === element.lon))){
			// 			valueGet.data.push(element)
			// 		}


			// 	}

			// 	// that.$ownerInstance.callMethod('nijiexi', {
			// 	// 	d: mapData
			// 	// })
			// 	renderMap()

			// }





			// renderMap(data)

			// 第二次定时获取数据后 【怎么怎么做】

			// Tmap.addEventListener("move", function(e) {
			// 	console.log(2);

			// })


			// Tmap.addEventListener("moveend", function(e) {
			// 	console.log(1);

			// })

			// 拿到了这个数据
			// const {lng, lat, apikey} = window.doptions
			// Tmap.centerAndZoom(new T.LngLat(116.407394, 39.904211), 15)
			// Tmap.removeEventListener("moveend");
			// Tmap.addEventListener("moveend", function(e) {
			// 	////console.log(e.target.getCenter().getLng() + "," + e.target.getCenter().getLat())
			// 	that.$ownerInstance.callMethod('nijiexi', {
			// 		lng: e.target.getCenter().getLng(),
			// 		lat: e.target.getCenter().getLat(),
			// 		apikey: apikey
			// 	})
			// });

				// that.$ownerInstance.callMethod('nijiexi', {
				// 	lng: 116.408394,
				// 	lat: 39.9068956,
				// 	apikey: apikey
				// })


	// 		var points = [
	// 		new T.LngLat(116.407394, 39.904211), // 点1
    //        new T.LngLat(116.408394, 39.9068956), // 点2
    //        new T.LngLat(116.409394, 39.906211), // 点3
    //        new T.LngLat(116.410394, 39.907211), // 点4
    //        new T.LngLat(116.411394, 39.908211)  // 点5
    //    ];

    //    points.forEach(function(point) {
    //        var marker = new T.Marker(point);
    //        Tmap.addOverLay(marker);

	// 	marker.setIcon(new T.Icon({
    //        iconUrl: "static/avr.png",  // 标记图标的URL
    //        iconSize: new T.Point(24, 24),  // 图标尺寸
    //        iconAnchor: new T.Point(12, 12)  // 图标的锚点
    //    }));

    //    });

       // 绘制路径
    //    var polyline = new T.Polyline(points, {
    //        color: "black",
    //        weight: 3,
    //        opacity: 0.5,
    //        lineStyle: "solid"
    //    });

	// console.log(polyline );
    //    Tmap.addOverLay(polyline);


	// Tmap.setViewport(points);

	// console.log('1adbasdb')
			//var statisticsForm=this.data.bsForm

		},

	}
}
</script>

<style>
page {
  background-color: #fff;
}

.rotated-marker {
  transform-origin: center;
  transition: transform 0.3s;
}

.mapDiv {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1008;
  background: #ededed;
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
  background: #3e89f7;
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
  border-bottom: 1px solid #f3f3f3;
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
  color: #1a1a1a;
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
  color: #bebebe;
}
</style>
