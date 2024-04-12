import { http } from '@/utils/http'


export const getTodayColorAll = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/xcx/getTodayColorAll',
      data,
    })
  }