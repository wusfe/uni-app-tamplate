import { http } from '@/utils/http'

// 分页查询仓库管理
const AK = "Bmbn5LApE3QWzpoNGT1xWpiv"
				const SK = "grN1BVlfBX2B1wEunTgeqv3sdYuklQfJ"
export const getBaiDuAccessToken = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + AK +
      '&client_secret=' + SK
      
    })
  }

