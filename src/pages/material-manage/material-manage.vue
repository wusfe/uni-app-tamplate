<template>
  <view class="flex flex-col h-100%">
    <!-- 头部 -->
    <view class="bg-#ffffff shrink-0">
      <dropDownBox class="pt-3">
        <template v-slot:top>
          <view class="pl-4 pr-4 mb-1">
            <searchBar
              placeholder="输入名称"
              v-model="searchInput.searchKey"
              @confirm="handleConfirm"
              @clear="handleConfirm"
              radius="60"
            />
          </view>
        </template>
        <view class="flex pl-5 pr-5 nav-item justify-between">
          <view class="mr-5">
            <view class="mr-2"
              ><dropDownScrollView
                v-model="searchInput.goodsCode"
                placeholder="物料类型"
                :list="goodTypeList"
                @finally="handleConfirm"
            /></view>
          </view>

          <view class="mr-5">
            <view class="mr-2"
              ><dropDownScrollView
                v-model="searchInput.turnoverState"
                placeholder="领用状态"
                :list="turnoverStateTypeList"
                @finally="handleConfirm"
            /></view>
          </view>

          <view>
            <dropDownScrollView
              placeholder="申请人"
              v-model="searchInput.userId"
              showSearch
              :list="userList"
              @finally="handleConfirm"
            />
          </view>
        </view>
      </dropDownBox>
    </view>

    <view class="grow-1 min-h-0">
      <mc-uni
        :fixed="false"
        style="height: 100%"
        @init="mescrollInit"
        :up="upOptions"
        :down="downOptions"
        @down="downCallback"
        @up="upCallback"
      >
        <view class="bg-#ffffff data-item" v-for="v in data">
          <view class="pt-4 pb-2 pl-4 pr-3 flex">
            <view class="flex flex-col w-100%">
              <view class="flex items-baseline mb-2">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text>申请人</text>
                </view>
                <text>：</text>
                <view class="ml-1"
                  ><text class="align-bottom">{{ v?.userName }}</text></view
                >
              </view>
              <!-- 
              <view class="flex items-baseline mb-2">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text>物料类型</text>
                </view>
                <text>：</text>
                <view class="ml-1"><text class="align-bottom">{{ getGoodLabel(v?.goodsType) }}</text></view>
              </view> -->

              <view class="flex items-baseline mb-2">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text>物料名称</text>
                </view>
                <text>：</text>
                <view class="ml-1"
                  ><text class="align-bottom">{{ v?.goodsName }}</text></view
                >
              </view>

              <!-- <view class="flex items-baseline mb-2">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text >单价</text>
                </view>
                <text>：</text>
                <view class="ml-1"
                  ><text class="align-bottom">{{ v?.unitprice }}</text></view
                >
              </view> -->

              <view class="flex items-baseline mb-2">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text>数量</text>
                </view>
                <text>：</text>
                <view class="ml-1"
                  ><text class="align-bottom">{{ v?.turnoverNumber }}</text></view
                >
              </view>

              <view class="flex items-baseline mb-2">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text>状态</text>
                </view>
                <text>：</text>
                <view class="ml-1">
                  <text class="align-bottom pric" v-if="v?.turnoverState == 0">待领用</text>
                  <text class="align-bottom scolor" v-if="v?.turnoverState == 1">已领用</text>
                  <text class="align-bottom text-danger" v-if="v?.turnoverState == -1">已退回</text>
                  </view
                >
              </view>
              
              <!-- <view class="flex items-baseline mb-2">
                <view class="w-136rpx text-align-last-justify align-middle">
                  <text >生产产家</text>
                </view>
                <text>：</text>
                <view class="ml-1"
                  ><text class="align-bottom">{{  v?.manufacturer}}</text></view
                >
              </view> -->

              <view class="text-right w-100% flex justify-end">
                 <view class="mr-3"> <button type="primary" size="mini" v-if="v?.turnoverState == 0" class="cbtn ">确认领用</button></view>
                 <view> <button type="primary" size="mini" plain class="cbtn" @click="handleToDetail(v)">查看详情</button></view>
              </view>
            </view>
          </view>
        </view>
      </mc-uni>
    </view>
  </view>

  <uni-popup style="z-index: 999" ref="popup" type="bottom">
    <view class="bg-#ffffff">
      <view @click="handleToApply">
        <button class="btn-no-border">
          <text>领用申请</text>
          <uni-icons
          type="arrow-right"
          
         
        />
        </button>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="tsx">
import searchBar from '@/components/search-bar/index.vue'
import { useMescroll } from '@/composables'
import { computed, ref } from 'vue'
import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import dropDownScrollView from '@/components/drop-down-scroll-view/index.vue'
import dropDownBox from '@/components/drop-down-scroll-view/drop-down-box.vue'
import { onNavigationBarButtonTap } from '@dcloudio/uni-app'
import { getGoodsturnoverList, getSysUserUserList, getGoodsinforgoodsCodeList } from '@/api'
import { useDictStore } from '@/stores'

// const dictStore = useDictStore();

// const goodTypeList = computed(() => {
//   return dictStore.goodtype?.map((item:any) => ({
//     lable: item.value,
//     value: item.code
//   }))
// })
const goodTypeList = ref([] as any)
const userList = ref([] as any)
const turnoverStateTypeList = [
  {
    lable: '待领用',
    value: 0,
  },
  {
    lable: '已领用',
    value: 1,
  },
  {
    lable: '已退回',
    value: -1,
  },
]
// const getGoodLabel = (code:any) => {
//   if(!code) return ''
//   return  goodTypeList.value?.find((item:any) => item.value == code)?.label
// }

onLoad(() => {
  // dictStore.getGoodtype()

  getGoodsinforgoodsCodeList().then((res) => {
    goodTypeList.value = res?.result?.map((item: any) => ({
      lable: item.label,
      value: item.value,
    }))
  })

  getSysUserUserList().then((res) => {
    userList.value = res?.result?.map((item: any) => ({
      lable: item.label,
      value: item.value,
    }))
  })
})

const searchInput = ref({
  turnoverType: -1,
  searchKey: '',
  goodsCode: '',
  userId: undefined,
  turnoverState: undefined,
})

const popup = ref()
onNavigationBarButtonTap(() => {
  popup.value.open('bottom')
})

const handleConfirm = () => {
  downCallback(mescroll.value)
}

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
    const res = await getGoodsturnoverList({
      page: ms.optUp.page.num,
      pageSize: ms.optUp.page.size,
      ...searchInput.value,
    })

    data.value = isUp.value ? res?.result?.items : data.value.concat(res?.result?.items || [])
    mescroll.value.endSuccess(res?.result?.items?.length, res?.result?.totalPages)

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

// 右侧的筛选
const rightPopup = ref()

const showSearchPopup = () => {
  rightPopup.value?.open()
}

const  handleToApply = () => {
  uni.navigateTo(
    {
      url: '/pages/material-apply/material-apply'
    }
  )
}

const  handleToDetail = (v:any) => {
  uni.navigateTo(
    {
      url: `/pages/material-detail/material-detail?id=${v.id}`
    }
  )
}

</script>

<style lang="scss" scoped>
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
.nav-item :deep(.drop-menu-item) {
  justify-content: center !important;
}
</style>
