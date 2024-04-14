import { http } from '@/utils/http'

// 新增调度
export const addDispatchinfor = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/dispatchinfor/add',
      data,
    })
  }
  // 调度列表 -> 分页
export const dispatchinforPage = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/dispatchinfor/page',
      data,
    })
  }
  // 调度详情
export const dispatchinforDetail = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/dispatchinfor/detail',
      data,
    })
  }

  // 近期调用
export const dispatchinforList = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/dispatchinfor/list',
      data,
    })
  }


