import { http } from '@/utils/http'

// 消息中心
export const pageReceived= (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/sysNotice/pageReceived',
      data,
    })
  }
// 删除消息公告
export const sysNoticeDelete= (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/sysNotice/delete',
      data,
    })
  }
// 添加公告
export const sysNoticeAdd= (data?: any) => {
    return http<any>({
      method: 'POST',
      url: '/api/sysNotice/add',
      data,
    })
  }
// 任务执行人列表(下拉框 )
export const getsysUsertaskUserId= (data?: any) => {
    return http<any>({
      method: 'GET',
      url: '/api/taskinfor/SysUsertaskUserIdDropdown',
      data,
    })
  }
// 获取公告详情
export const noticeDetail= (id?: any) => {
    return http<any>({
      method: 'GET',
      url: `/api/sysNotice/noticeDetail/${id}`,
      
    })
  }
// 获取公告详情
export const sysNoticeSetRead= (data?: any) => {
    return http<any>({
      method: 'POST',
      url: `/api/sysNotice/setRead`,
      data
    })
  }
// 获取公告详情
export const getAppVersion= (data?: any) => {
    return http<any>({
      method: 'GET',
      url: `/api/sysConfig/appVersion`,
      data
    })
  }

export const APPReturnMoney= (outTradeNumber?: any) => {
    return http<any>({
      method: 'POST',
      url: `/api/xcx/APPReturnMoney/${outTradeNumber}`,
      
    })
  }
// 获取公告详情
export const AddOperationsCar= (data?:any) => {
    return http<any>({
      method: 'POST',
      url: `/api/xcx/AddOperationsCar`,
      data
    })
  }

  

