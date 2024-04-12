import { http } from '@/utils/http'


export const getUserBaseInfo = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/sysAuth/userInfo',
      data,
    })
  }