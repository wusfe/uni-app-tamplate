import { http } from '@/utils/http'


export const getUserBaseInfo = (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/sysAuth/userInfo',
      data,
    })
  }
export const sysUserChangePwd = (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/sysUser/changePwd',
      data,
    })
  }

  // export const getUserBaseInfo = (data?: any) => {
  //   return http<any>({
  //     method: 'GET',
  //     url: '/api/sysAuth/userInfo',
  //     data,
  //   })
  // }
