import { http } from '@/utils/http'

// 分页查询仓库管理
export const getGoodsinforList = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/goodsinfor/page',
      data,
    })
  }
export const getGoodsinforgoodsCodeList = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/goodsturnover/goodsinforgoodsCodeDropdown',
      data,
    })
  }
export const getSysUserUserList = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/goodsturnover/SysUserUserIdDropdown',
      data,
    })
  }
export const addGoodsturnover = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/goodsturnover/add',
      data,
    })
  }

export const getGoodsturnoverList = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/goodsturnover/page',
      data,
    })
  }

// 获取仓库详情

export const getGoodsinforDetail = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/goodsinfor/detail',
      data,
    })
  }

  // 获取订单表
export const updateGoodsinforDetail= async (data?:any) => http<any>({
  url: "/api/goodsinfor/update",
  method: 'POST',
  data
})
export const goodsturnoverDetail= async (data?:any) => http<any>({
  url: "/api/goodsturnover/detail",
  method: 'GET',
  data
})

// 领用申请
export const goodsturnoverOut= async (data?:any) => http<any>({
  url: "/api/goodsturnover/out",
  method: 'POST',
  data
})
// 领用申请
export const goodsturnoverUpdateState= async (data?:any) => http<any>({
  url: "/api/goodsturnover/updateState",
  method: 'POST',
  data
})


