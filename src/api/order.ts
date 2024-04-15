import { http } from '@/utils/http'


// 今日概览
export const orderTodayLiInfo   = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/orderinfor/orderTodayList',
      data,
    })
  }

  // 获取今日订单列表
export const getOrderinforList = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/orderinfor/page',
      data,
    })
  }
  // 获取订单类型
export const getOrderTypeList = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/orderinfor/orderTypeList',
      data,
    })
  }

    // 获取订单状态 
export const getOrderStateList = (data?: any) => {
  return http<any>({
    method: 'GET',
    url: '/api/orderinfor/orderStateList',
    data,
  })
}


// 获取订单详情
export const orderinforDetail= async (data?:any) => http<any>({
  url: "/api/orderinfor/detail",
  method: 'GET',
  data
})


// 扫描二维码
export const updateCompleteOrder= async (orderNumber:number) => http<any>({
  url: `/api/orderinfor/updateComplete/${orderNumber}`,
  method: 'POST',
  
})
// 财务统计
export const orderBydateList= async (dt:any) => http<any>({
  url: `/api/orderinfor/orderBydateList/${dt}`,
  method: 'GET',
 
})
// 财务统计
export const orderByMonthList= async (dtmonth:any) => http<any>({
  url: `/api/orderinfor/orderByMonthList/${dtmonth}`,
  method: 'GET',
 
})

