import { http } from '@/utils/http'


export const getNumberTask = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/taskinfor/getNumberTask',
      data,
    })
  }