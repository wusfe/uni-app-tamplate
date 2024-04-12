import { http } from '@/utils/http'


export const postLoginApi = (data: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/sysAuth/login',
      data,
    })
  }