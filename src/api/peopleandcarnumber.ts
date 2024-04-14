import { http } from '@/utils/http'

// 今日抵达
export const peopleandcarnumberListDay= (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/peopleandcarnumber/listDay',
      data,
    })
  }
export const peopleandcarnumberAdd= (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/peopleandcarnumber/add',
      data,
    })
  }

