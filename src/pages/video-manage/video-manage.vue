<template>
  <!-- <uni-nav-bar class="zh-nav-bar" backgroundColor="rgb(248, 248, 248)"  color="rgb(0, 0, 0)" left-icon="left" right-icon="cart" title="标题" :border="false" statusBar fixed/> -->
  <view class="flex flex-col h-100%">
    <!-- 头部 -->
    <view class="bg-#ffffff shrink-0">
      <dropDownBox class="pt-3">
        <template v-slot:top>
          <view class="pl-4 pr-4 pb-3">
            <searchBar v-model="searchInput.searchKey" placeholder="输入站点名称" radius="60" @confirm="handleConfirm" @clear="handleConfirm" />
          </view>
        </template>
        <!-- <view class="flex pl-4">
          <view class="mr-2"><dropDownScrollView v-model="searchInput.goodsType" placeholder="物料类型" :list="goodTypeList" @finally="handleConfirm" /></view>

        
        </view> -->
      </dropDownBox>
    </view>

    <view class="grow-1 pt-2 min-h-0 pb-2">
      <mc-uni
        :fixed="false"
        style="height: 100%"
        @init="mescrollInit"
        :up="upOptions"
        :down="downOptions"
        @down="downCallback"
        @up="upCallback"
      >
        <view class="data-item" v-for="v in data">
          <view class="ml-2 mr-2 ">
            <view class="pt-3 pb-3 pl-3 pr-3 flex flex-col bg-#ffffff">
              <view class="flex items-baseline mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text >物料编号</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{ v?.goodsCode }}</text></view>
              </view>

              <view class="flex items-baseline mb-3">
                
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text >物料类型</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{ getGoodLabel(v?.goodsType) }}</text></view>
              </view>

              <view class="flex iitems-baseline mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text >物料名称</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{ v?.goodsName }}</text></view>
              </view>

              <view class="flex items-baseline mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text >物料型号</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{ v?.goodsModel }}</text></view>
              </view>

              <view class="flex items-baseline mb-3">
                <view class="w-136rpx text-align-last-justify ">
                  <text >物料单价</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text>{{ v?.goodsUnitPrice }} 元</text></view>
              </view>

              <!-- <view class="flex items-center mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">购入日期</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">2021-05-13</text></view>
              </view> -->

              <!-- <view class="flex items-center mb-3">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text class="align-middle">使用期限</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{ v?.useperiod }}</text></view>
              </view> -->

              <view class="flex items-baseline mb-3">
                <view class="w-136rpx text-align-last-justify ">
                  <text >预警值</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text >{{ v?.alertNumber }}</text></view>
              </view>

              <view class="flex items-baseline mb-3">
                <view class="w-136rpx text-align-last-justify ">
                  <text class="">库存量</text>
                </view>
                <text>：</text>
                <view class="ml-1 "><text class="align-base ">{{ v?.goodsNumber }}</text></view>
              </view>

              <view class="flex items-baseline mb-3">
                <view class="w-136rpx text-align-last-justify ">
                  <text class="">厂家</text>
                </view>
                <text>：</text>
                <view class="ml-1 flex items-center"><text class="align-base ">{{ v?.goosManufacturer }}</text></view>
              </view>


              <view class="text-right">
                <button type="primary" plain size="mini" class="mr-2">补货</button>
                <button type="primary" plain size="mini" class="mr-2" @click="handleToDetail(v)">详情</button>
                <button type="primary" plain size="mini" @click="handleToEdit(v)">编辑</button>
              </view>
            </view>
          </view>
        </view>
      </mc-uni>
    </view>
  </view>

  <uni-popup style="z-index: 999" ref="popup" type="bottom">
    <view class="bg-#ffffff">
      <!-- <view class="b1">
        <button class="btn-no-border">按员工查</button>
      </view>

      <view class="b1">
        <button class="btn-no-border">资产流水</button>
      </view> -->

      <view class="b1" @click="handleToPurchase">
        <button class="btn-no-border">
          <text>资产购入</text>
          <uni-icons
          type="arrow-right"
          
         
        />
        </button>
        
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="tsx">
import singleSelect from '@/components/single-select/index.vue'
import searchBar from '@/components/search-bar/index.vue'
import { sleep, useMescroll } from '@/composables'
import { computed, ref } from 'vue'
import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import dropDownScrollView from '@/components/drop-down-scroll-view/index.vue'
import dropDownBox from '@/components/drop-down-scroll-view/drop-down-box.vue'
import { onNavigationBarButtonTap } from '@dcloudio/uni-app'
import { useDictStore } from '@/stores'
import { getGoodsinforList } from '@/api'

const dictStore = useDictStore();


const goodTypeList = computed(() => {
  return dictStore.goodtype?.map((item:any) => ({
    lable: item.value,
    value: item.code
  }))
})


const getGoodLabel = (code:any) => {
  if(!code) return ''
  return  dictStore.goodtype?.find((item:any) => item.code == code)?.value
}

onLoad(() => {
  dictStore.getGoodtype()
})

const searchInput = ref({
  goodsType: '',
  searchKey: ''
}) 

const handleToPurchase = () => {
  uni.redirectTo({ url: '/pages/store-purchase/store-purchase' })
}
const handleToEdit = (v:any) => {
  uni.redirectTo({ url: `/pages/store-edit/store-edit?id=${v.id}` })
}
const handleToDetail = (v:any) => {
  uni.redirectTo({ url: `/pages/store-manage-detail/store-manage-detail?id=${v.id}` })
}


const handleConfirm = () =>{
  downCallback(mescroll.value)
  
}

const popup = ref()
onNavigationBarButtonTap(() => {
 
  popup.value.open('bottom')
})


const { mescrollInit, getMescroll } = useMescroll(onPageScroll, onReachBottom) // 调用mescroll的hook

const mescroll = computed(() => getMescroll()) as any // 必须使用计算属性才可及时获取到mescroll对象,此处是me-video中使用


// 控制上拉加载的参数
const upOptions = ref({
  use: true, // 是否启用上拉加载; 默认true
  auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
  isBoth: false,
  page: {
    num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
    size: 10, // 每页数据的数量
    time: null, // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
  },
  noMoreSize: 5,
  textNoMore: '-- END --', // 没有更多数据的提示文本
  empty: {
    use: true, // 是否显示空布局
    icon: 'https://www.mescroll.com/img/mescroll-empty.png', // 图标路径
    tip: '~ 暂无相关数据 ~', // 提示
    // btnText: '去逛逛 >', // 按钮
    fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
    top: '100rpx', // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
    zIndex: 99, // fixed定位z-index值
  },
})

// 控制下拉刷新
const downOptions = ref({
  top: 0,
  use: true, // 是否启用下拉刷新; 默认true
  auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
  autoShowLoading: true, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
  // offset: 120,
  // inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
  // 	outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
  // 	bottomOffset: 20, // 当手指touchmove位置在距离body底部20upx范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
  // 	minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
  // beforeEndDelay: 0, // 延时结束的时长 (显示加载成功/失败的时长, android小程序设置此项结束下拉会卡顿, 配置后请注意测试)
  // bgColor: "#E75A7C", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
  // textColor: "#fff", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
  textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
  textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
  textLoading: '加载中 ...', // 加载中的提示文本
})

const data = ref<any>([])

const isUp = ref(true)

// 上拉加载函数
const upCallback = async (ms: any) => {
  try {
    const res = await getGoodsinforList({
      page: ms.optUp.page.num,
      pageSize: ms.optUp.page.size,
      ...searchInput.value,
    })

    // data.value = isUp.value ? res?.result?.items : data.value.concat(res?.result?.items || [])
    // mescroll.value.endSuccess(res?.result?.items?.length, res?.result?.totalPages)
    data.value = []
    mescroll.value.endSuccess(0, false)

    isUp.value = false
  } catch (_) {
    ms.endErr()
  }
}

// 下拉刷新函数
const downCallback = async (ms: any) => {
  isUp.value = true
  ms?.resetUpScroll()
}
</script>

<style lang="scss" scoped>
.text-align-last-justify {
  text-align-last: justify;
}
.data-item {
  position: relative;

  &::after {
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
}
</style>
