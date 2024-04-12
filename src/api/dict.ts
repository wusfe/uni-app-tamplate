import { http } from '@/utils/http'


export const getTypeDict = (data?: {code:string}) => {
    return http<any>({
      method: 'GET',
      url: '/api/sysDictType/dataList',
      data,
    })
  }