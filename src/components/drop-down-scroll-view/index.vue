<template>
  <view class="drop-down-scroll-view">
    <view @tap.stop="showModal" class="flex justify-between items-center pt-3 pb-3 drop-menu-item">
      <text
        v-if="!label"
        class="mr-1 text-sm"
        :style="{ color: isShowModal ? '#007aff' : '#333333' }"
        >{{ this.placeholder }}</text
      >
      <text
        v-if="label"
        class="mr-1 text-sm"
        :style="{ color: isShowModal ? '#007aff' : '#333333' }"
        >{{ label }}</text
      >

      <uni-icons
        :type="isShowModal ? 'up' : 'down'"
        :color="isShowModal ? '#007aff' : '#333333'"
        size="18"
      />

      <!-- <input
          v-model="_value"
          :style="disabled ? 'color:#c0c4cc' : ''"
          :placeholder="placeholder"
          placeholder-style="color: rgba(102, 102, 102, 0.25);"
          placeholder-class="zqs-select-placeholder-class"
          read-only
        /> -->

      <!-- <image src="@/static/right_icon.png" class="selector-icon"></image> -->
    </view>

    <view v-if="isShowModal" class="drop-down-popup">
      <view>
        <!-- <view class="title-main">
          <text class="title-detail">{{ title }}</text>
        </view> -->

        <view class="search-box" v-if="showSearch">
          <searchBar v-model="searchInput" @confirm="handleSearchConfirm" @clear="handleSearchConfirm" />
        </view>

        <scroll-view class="select-content" scroll-y>
          <view
            class="select-item"
            v-for="(item, index) in filter(list)"
            :key="index"
            :style="
              valueIndexOf(item)
                ? 'color:' + selectColor + ';background-color:' + selectBgColor + ';'
                : 'color:' + color + ';'
            "
            @click="select(item)"
          >
            <view class="title">{{ getLabelKeyValue(item) }}</view>

            <uni-icons type="checkmarkempty" color="" size="18" v-if="valueIndexOf(item)" />

            <!-- <text class="selectIcon icongou" v-if="valueIndexOf(item)"></text> -->
          </view>
        </scroll-view>

        <view class="select-bar bg-white">
          <button plain="true" class="mini-btn action" type="default" size="default" @tap="empty">
            {{ emptyText }}
          </button>
          <button class="mini-btn action" type="primary" size="default" @tap="confirmClick">
            {{ confirmText }}
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import popup from '@/components/popup/index.vue'
import searchBar from '@/components/search-bar/index.vue'

/**
 * 参考：https://ext.dcloud.net.cn/plugin?id=10416
 */
export default {
  components: { popup, searchBar },
  inject: ['provideRegistryDropCom', 'provideHidePup', 'provideMask'],
  data() {
    return {
      isShowModal: false,
      searchInput: '',
      options: [],
      _value: '',
      temlateValue: '',
    }
  },
  // model:{
  //   prop: 'value',
  //   event: 'input'
  // },
  props: {
    showSearch: {
      // 是否显示搜索框
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [Number, String, Array, Object],
      default: null,
    },
    placeholder: {
      // 占位符
      default: '',
      type: String,
    },
    multiple: {
      // 是否多选
      default: false,
      type: Boolean,
    },
    list: {
      default: () => [],
      type: Array,
    },
    valueKey: {
      // 指定list中valueKey的值作为下拉框绑定内容
      default: 'value',
      type: String,
    },
    labelKey: {
      // 指定list中labelKey的值作为下拉框显示内容
      default: 'lable',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    clearable: {
      default: false,
      type: Boolean,
    },
    emptyText: {
      default: '重置',
      type: String,
    },
    title: {
      default: '选择内容',
      type: String,
    },
    confirmText: {
      default: '确定',
      type: String,
    },
    color: {
      default: '#000000',
      type: String,
    },
    selectColor: {
      default: '#0081ff',
      type: String,
    },
    bgColor: {
      default: '#ffffff',
      type: String,
    },
    selectBgColor: {
      default: '#FFFFFF',
      type: String,
    },
    valueType: {
      default: 'single',
      type: String, // single || all
    },
    showSearchBtn: {
      default: true,
      type: Boolean, // single || all
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    defaultValue: {
      any: true,
    },
  },
  emits: ['openDeepScroll', 'closeDeepScroll', 'input', 'change'],

  computed: {
    label() {
      // 根据来显value显示标签内容
      if (this._value) {
        return this._value
          ?.map((item) => {
            let findItem = this.list.find((c) => c[this.valueKey] === item)
            if (findItem) return findItem?.[this.labelKey]
          })
          ?.join(',')
      }
      return ''
    },
  },
  created() {
    this.provideRegistryDropCom && this.provideRegistryDropCom(this)
  },
  methods: {
    filter(){
      if(!this.searchInput || this.searchInput?.trim()?.length === 0) return this.list;
      return this.list?.filter(item => item.lable?.includes(this.searchInput))
    },
    handleSearch() {
      this.$emit('search', this.searchInput)
    },
    get_value(val) {
      // 将数组值转换为以,隔开的字符串
      if (val || val === 0) {
        if (Array.isArray(val)) {
          let chooseAttr = []
          val.forEach((item) => {
            let choose = this.list.find((temp) => {
              let val_val = this.getValueKeyValue(temp)
              return item === val_val
            })
            // 判断是否存在
            if (choose) {
              chooseAttr.push(choose)
            }
          })
          let values = ''
          if (chooseAttr.length > 0) {
            values = chooseAttr.map((temp) => this.getLabelKeyValue(temp)).join(',')
          }

          return values
        } else {
          let choose = this.list.find((temp) => {
            let val_val = this.getValueKeyValue(temp)
            return val === val_val
          })
          if (choose) {
            return this.getLabelKeyValue(choose)
          } else {
            return val
          }
        }
      } else {
        if (this.multiple) return []
        return ''
      }
    },

    select(item) {
      let v = this.getValueKeyValue(item)
      let index = this.temlateValue?.indexOf(v)
      if (index > -1) {
        this.multiple && this.temlateValue?.splice(index, 1)
      } else {
        this.multiple ? this.temlateValue.push(v) : (this.temlateValue = [v])
      }
      // this.$emit('input', val)
      // this.$emit('change', item)
    },
    valueIndexOf(item) {
      let val = this.getValueKeyValue(item)
      return this.temlateValue?.includes(val)
      // if (Array.isArray()) {
      //   return this._value.indexOf(val) != -1
      // } else {
      //   return this._value === val
      // }
    },
    getLabelKeyValue(item) {
      // 获取label
      return item[this.labelKey]
    },
    getValueKeyValue(item) {
      // 获取value
      return item[this.valueKey]
    },
    empty() {
      // 清空
      this.temlateValue = []

      this._value = []

      this.$emit('update:modelValue', this.defaultValue)

      this.$emit('change', this.defaultValue || (this.multiple ? [] : ''))

      this.$emit('finally', this.defaultValue || (this.multiple ? [] : ''))

      this.hideModal()

      this.provideMask && this.provideMask(false)
    },
    // cancelClick() {
    //   // 点击取消
    //   this.$emit('cancel', this._value)
    //   this.hideModal()
    // },

    confirmClick() {
      // 点击确定

      let v = ''
      if (this.valueType === 'all') {
        v = this.options
      } else {
        v = !this.multiple ? this.temlateValue[0] : this.temlateValue
      }

      this._value = this.temlateValue
      this.$emit('update:modelValue', v)

      this.$emit('confirm', v)
      this.$emit('finally', v)

      this.hideModal()

      this.provideMask && this.provideMask(false)
    },
    showModal() {
      this.isShowModal = !this.isShowModal
      // 打开禁止穿透滚动
      // this.$emit('openDeepScroll');

      this.provideHidePup && this.provideHidePup(this)

      this.provideMask && this.provideMask(this.isShowModal)

      // this.$emit('open')
      
      // console.log('open')
    },
    hideModal() {
      // 隐藏model
      this.isShowModal = false
      this.temlateValue = this._value
      this.searchInput = ''
      // 关闭禁止穿透滚动

      // this.$emit('close')
      // console.log('close')
    },
    handleSearchConfirm(v){
      console.log(12, v);
    }
  },
  watch: {
    searchInput(val) {
      if (!this.$props.showSearchBtn) this.$emit('search', val)
    },
    modelValue: {
      handler(nValue, value) {
        let currentValue = ''
        if (Array.isArray(nValue)) {
          currentValue = nValue
        } else if (nValue || nValue === 0) {
          currentValue = [nValue]
        }
        this._value = currentValue
        this.temlateValue = currentValue
      },
      immediate: true,
    },
  },
}
</script>
<style>
.title-main {
  text-align: center;
  padding: 20rpx 0;
}

.selectIcon {
  font-family: 'selectIcon' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="scss" scoped>
.bg-white {
  background-color: #ffffff;
}

.select-content {
  // background-color: #F1F1F1;
  max-height: 50vh;
  .select-item {
    text-align: left;
    padding: 24rpx 40rpx;
    display: flex;
    align-items: center;
    position: relative;
    ::after {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      height: 1px;
      content: '';
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      background-color: #e5e5e5;
    }

    .title {
      flex: 1;
    }
  }
}

.select-bar {
  margin-top: 20rpx;
  padding: 0 80rpx;
  display: flex;
  position: relative;
  align-items: center;
  min-height: 80rpx;
  justify-content: space-between;
  margin-bottom: 50rpx;

  .action {
    display: flex;
    align-items: center;
    height: 78rpx;
    justify-content: center;
    max-width: 100%;
    padding: 0 100rpx;
  }
}

.search-box {
  margin: 10rpx 0;
  align-items: center;
  padding: 10rpx 40rpx;
}

.search-input {
  display: flex;
  flex: 1;
  // width: 560rpx;
  height: 67rpx;
  line-height: 67rpx;
  border-radius: 40rpx;
  background: #f5f2f2;
}

.search-text {
  padding-left: 30rpx;
}

.drop-down-scroll-view {
}
.drop-down-popup {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  z-index: 998;
  top: 100%;
}
</style>
