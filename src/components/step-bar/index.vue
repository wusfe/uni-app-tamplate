<template>
  <view class="step-info">
    <view class="step-number">
      <block v-for="(item, index) in stepList" :key="index">
        <view @click.stop="openItem(item)" class="item-state">
          <view
            :class="{
              'state-img': true,
              'pre-current': index + 1 < step,
              current: step === index + 1,
            }"
          >
            <uni-icons v-if="index + 1 < step" type="checkmarkempty" color="#007aff" size="18" />
            <text v-if="index + 1 >= step">{{ index + 1 }}</text>
          </view>
          <!-- <image
            class="state-img"
            :src="getImg(index) || item.unCheckedImg || unCheckedImg"
          ></image> -->

          <view class="step-name">
            <view class="title">
              <text>{{ item.title }}</text>

             
            </view >

            <view class="stitle"> <text>{{ item.desc }}</text></view>
          </view>
        </view>
        <view
          class="line"
          :style="{ background: getLine(index) || item.unCheckedLine || unCheckedLine }"
          v-if="index < stepList.length - 1"
        ></view>
      </block>
    </view>
  </view>
</template>

<script>
import checkedImg from '/static/checkedImg.png'
import unCheckedImg from '/static/unCheckedImg.png'
export default {
  props: {
    //当前步骤
    step: {
      type: Number,
      default: 1,
    },
    //步骤列表
    stepList: {
      type: Array,
      default: null,
    },
    //已完成的图片路径
    checkedImg: {
      type: String,
      default: checkedImg,
    },
    //未完成的图片路径
    unCheckedImg: {
      type: String,
      default: unCheckedImg,
    },
    //已完成的字体颜色
    checkedColor: {
      type: String,
      default: '#287BF8',
    },
    //未完成的字体颜色
    unCheckedColor: {
      type: String,
      default: '#333333',
    },
    //已完成的线条颜色
    checkedLine: {
      type: String,
      default: '#007aff',
    },
    //未完成的线条颜色
    unCheckedLine: {
      type: String,
      default: '#bebebe',
    },
  },
  data() {
    return {}
  },
  methods: {
    //获取图片
    getImg(e) {
      let index = Number(e)
      if (this.step > index) return this?.stepList?.[index].checkedImg || this.checkedImg
    },
    //获取线
    getLine(e) {
      let index = Number(e)
      if (this.step > index + 1) return this?.stepList?.[index].checkedLine || this.checkedLine
    },
    //获取颜色
    getColor(e) {
      let index = Number(e)
      if (this.step > index) return this?.stepList?.[index].checkedColor || this.checkedColor
    },
    openItem(item) {
      this.$emit('clickStep', item)
    },
  },
}
</script>

<style scoped lang="scss">
.step-info {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}

.step-number {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.item-state {
  height: 64rpx;
  display: flex;
}

.state-img {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  margin: auto;
  border: 1px solid #c0c0c0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c0c0c0;
  &.pre-current {
    border-color: #007aff;
  }

  &.current {
    background-color: #007aff;
    border-color: transparent;

    text {
      color: #ffffff;
    }
  }
}

.line {
  width: 2px;
  height: 120rpx;
  // margin: 0 8rpx;
  margin-left: 32rpx;
  margin-top: 15rpx;
  margin-bottom: 12rpx;
}

.step-name {
  
  .title {
    font-size: 32rpx;
  }
  .stitle{
    font-size: 26rpx;
    color: #999;
    margin-top: 4rpx;
  }
  margin-left: 20rpx;
}

.name {
  font-size: 28rpx;
  line-height: 28rpx;
  color: #333333;
}
</style>
