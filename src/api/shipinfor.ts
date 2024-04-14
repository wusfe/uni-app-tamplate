import { http } from '@/utils/http'


export const shipinforPage= (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/shipinfor/page',
      data,
    })
  }



