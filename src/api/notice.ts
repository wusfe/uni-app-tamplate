import { http } from '@/utils/http'


export const getNewsNotice = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/sysNotice/newsNotice',
      data,
    })
  }
export const getUnReadList = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/sysNotice/unReadList',
      data,
    })
  }