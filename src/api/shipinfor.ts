import { http } from '@/utils/http'


export const shipinforPage= (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/shipinfor/page',
      data,
    })
  }
export const shipinforUpdate= (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/shipinfor/update',
      data,
    })
  }
export const updateePeoplenumber= (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/peopleandcarnumber/updateePeoplenumber',
      data,
    })
  }



