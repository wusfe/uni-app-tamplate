import { http } from '@/utils/http'


export const getNumberTask = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/taskinfor/getNumberTask',
      data,
    })
  }
export const taskinforPage = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/taskinfor/page',
      data,
    })
  }
export const taskinforAdd = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/taskinfor/add',
      data,
    })
  }
export const taskinforDetail = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/taskinfor/detail',
      data,
    })
  }
export const taskinforUpdate = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/taskinfor/update',
      data,
    })
  }

  