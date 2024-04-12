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


// 获取订单表
export const orderinforDetail= async (data?:any) => http<any>({
  url: "/api/orderinfor/detail",
  method: 'GET',
  data
})