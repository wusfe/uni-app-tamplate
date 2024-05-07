<template>
  <view class="flex flex-col h-100%">
    <view class="shrink-0">
      <view class="flex justify-between items-center bg-#ffffff pt-3 pb-3 pl-3 pr-3">
        

        <view class="flex justify-between items-center grow-1">
          <view class="text-color-primary">今日船只：{{ total }}</view>
          <view class="flex items-center"><text class="text-color-primary text-sm" @click="handleTo">今日统计</text><uni-icons
            type="arrow-right"
             color="#007aff"
            size="18"
          /></view>
        </view>
        <!-- <view class="flex justify-between items-center">
          <text class="text-color-primary text-xs mr-1">选择时间</text>

          <i class="zhfont zh-xuanzeshijian"> </i>
        </view> -->
      </view>
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
        <view v-for="v in data" class="pl-3 pr-3 mt-3">
          <view
            class="bg-#ffffff px-4 py-4 rounded-20rpx border-1px border-color-gray-3 border-solid"
          >
            <view class="flex justify-between items-center">
              <view class="color-gray-4">船号：{{ v?.shipCode }}</view>
              
              <view class="color-gray-4">状态：
                <text :class="{pric: v?.shipState, 'text-danger': !v?.shipState}">{{ v?.shipState || '离港' }}</text>
                
                <!-- <text class="text-sm scolor" v-if="v?.shipState">运行中</text>
              <text class="text-sm text-danger" v-if="!v?.shipState">停运</text> -->
              </view>
            </view>

            <view class="flex items-center mt-4">
             
              <view class="w-100rpx h-100rpx bg-#12C11D rounded-50% mb-2 flex justify-center items-center">
                  <i class="zhfont zh-Ship- color-#ffffff  text-56rpx"></i>
                </view>


                <view class="ml-40rpx" >
                  <!-- 到港 -->
                    <template v-if="v?.shipState">
                      <!-- 如果车道到存在 则另外一个港口不可点击 -->
                      <view class="flex items-center">
                        <button  type="primary" :disabled="v?.shipNumber === 2" size="mini" plain class="block mr-20rpx" style="border-radius: 30rpx;padding: 0rpx 40rpx" @click="handleLeave(v)">{{v?.shipNumber === 1?'离港':'到港'}}1</button>
                      <button type="primary"  :disabled="v?.shipNumber === 1" size="mini" plain class="block mr-20rpx" style="border-radius: 30rpx;padding: 0rpx 40rpx" @click="handleLeave(v)">{{v?.shipNumber === 2?'离港':'到港'}}2</button>

                      <uni-icons

                        class="mr-28rpx"
                        type="staff"
                        color=""
                        size="28"

                        @click="handleAddPerson(v)"
                      />
                      <auth-btn @click="handleCarCode" ac="orderinfor:check">
                        <uni-icons type="scan" color="" size="28" ></uni-icons>
                        </auth-btn>
                      

                      </view>
                    </template>
                  
                    <!-- 离港 -->
                    <template v-if="!v?.shipState">
                      <button type="primary" size="mini" plain class="block mr-20rpx" style="border-radius: 30rpx;padding: 0rpx 40rpx" @click="handleArrive(v, 1)">到港1</button>
                      <button type="primary" size="mini" plain class="block mr-20rpx" style="border-radius: 30rpx;padding: 0rpx 40rpx" @click="handleArrive(v, 2)">到港2</button>
                    </template> 

                  <!-- <button type="primary" size="mini" plain class="block mr-30rpx" style="border-radius: 30rpx;padding: 0rpx 40rpx" @click="handleArrive(v, 1)">到达1</button>

                  <button type="primary" size="mini" plain class="block" style="border-radius: 30rpx;padding: 0rpx 40rpx" @click="handleArrive(v, 2)">到达2</button> -->
                </view>
              
            </view>
          </view>
        </view>
      </mc-uni>
    </view>
  </view>

  <qrPopup ref="qrPopupRef"></qrPopup>


  <uni-popup ref="inputDialog" type="dialog">
				<popupDialog ref="inputClose"  mode="input" beforeClose inputType="number"  title="输入人数" 
					placeholder="请输入人数" @confirm="dialogInputConfirm"></popupDialog>
			</uni-popup>

</template>

<script setup lang="ts">
import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import { ref, computed } from 'vue'
import { sleep, useMescroll } from '@/composables'
import { peopleandcarnumberAdd, shipinforPage, shipinforUpdate, updateePeoplenumber } from '@/api';
import popupDialog from '@/components/popup-dialog/popup-dialog.vue'
import qrPopup from '@/components/qr-popup/index.vue'
const searchInput = ref({
  
})

const total = ref('')
const { mescrollInit, getMescroll } = useMescroll(onPageScroll, onReachBottom) // 调用mescroll的hook

const mescroll = computed(() => getMescroll()) as any // 必须使用计算属性才可及时获取到mescroll对象,此处是me-video中使用


// 控制上拉加载的参数
const upOptions = ref({
  use: true, // 是否启用上拉加载; 默认true
  auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
  isBoth: false,
  page: {
    num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
    size: 30, // 每页数据的数量
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
    const res = await shipinforPage({
      page: ms.optUp.page.num,
      pageSize: ms.optUp.page.size,
      ...searchInput.value,
    })

    data.value = isUp.value ? res?.result?.items : data.value.concat(res?.result?.items || [])

    total.value =  res?.result?.total

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

const handleArrive = (v:any, carNumber:number) => {
  peopleandcarnumberAdd({
    shipCode: v?.shipCode,
    shipRoadCode: carNumber
  }).then(res => {
    v.shipNumber = carNumber
    v.shipState ='到港'
    uni.showToast({
      title: '操作成功'
    })
  })
}

const handleTo = () => {
  uni.navigateTo({
    url:'/pages/mancar-manage/mancar-manage',
  })
}

const handleLeave = (v:any) => {
  v.shipNumber = null
  v.shipState = null
  shipinforUpdate(v).then(res => {
    uni.showToast({
      title: '操作成功'
    })
  })
}


const qrPopupRef = ref()
const handleCarCode = () => {
  console.log(qrPopupRef);
  
  // console.log( qrPopupRef.value.ETC);
  
  qrPopupRef.value.ETC()
}

const inputDialog = ref()

const selectItem = ref()
const handleAddPerson = (v:any) => {

  inputDialog.value.open()

  selectItem.value = v;
}

const inputClose = ref()
const dialogInputConfirm = (v:any) => {

 
  
  if(!v){
    uni.showToast({
      title:'请输入人数',
      icon: 'none'
    })
    return
  }

  inputClose.value?.close()
  
  updateePeoplenumber({
    shipCode: selectItem.value.shipCode,
    peopleNumber: v
  }).then(res => {
    // selectItem.value.shipNumber = v
    uni.showToast({
      title: '添加成功'
    })
  })
}
</script>

<style scoped></style>
