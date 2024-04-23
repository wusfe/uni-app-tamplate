import { http } from '@/utils/http'

// 分页查询仓库管理
const AK = "MZTKujiXyZxEKrxrld2NH8Ut"
				const SK = "G5obupDFiEuI9Zs4HDVaJZcq34xN5hCC"
export const getBaiDuAccessToken = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + AK +
      '&client_secret=' + SK
      
    })
  }

