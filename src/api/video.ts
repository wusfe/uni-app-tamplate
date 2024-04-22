import { http } from '@/utils/http'


export const videomonitorList= (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/videomonitor/list',
      data,
    })
  }



