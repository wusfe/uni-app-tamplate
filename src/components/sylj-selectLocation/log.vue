<template>
  <view class="xlist">
    <view class="xlist1">
      <text class="font-900">{{ this.item?.terminalId }}:</text>{{ info.name }}
    </view>
    <view class="xlist2">
      {{ info?.addressComponent?.city }} ({{ info?.location?.lon }},{{ info?.location?.lat }})
    </view>
  </view>
</template>

<script>
export default {
  props: ['item', 'apikey'],

  data() {
    return {
      info: {},
    }
  },

  created() {
    const { lat, lon } = this.item

    // console.log(lat, lon, this.item.i)
    uni.request({
      //url: 'https://service.sdmap.gov.cn/geodecode',
      url: 'https://api.tianditu.gov.cn/geocoder',
      method: 'GET',
      data: {
        postStr: JSON.stringify({
          lon,
          lat,
          ver: 1,
        }),
        type: 'geocode',
        tk: this.apikey,
      },

      success: (res) => {
        console.log(res)
        //console.log(res);
        if (res.data.result) {
          var fobg = res.data.result
          fobg.name = res.data.result.formatted_address
          this.info = fobg

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
}
</script>

<style lang="scss" scoped>
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

  border-bottom: 1px solid #f3f3f3;
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
