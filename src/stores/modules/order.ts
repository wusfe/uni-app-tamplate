
import { getOrderStateList, getOrderTypeList } from '@/api'
import { defineStore } from 'pinia'

// 定义 Store
export const useOrderStore = defineStore('orderinfor', {
  state: () => ({
    orderTypeList:  [],
    orderStateList: [],
    loading: false,
    loading2: false,
  }),
  actions: {
    
    async getOrderTypeList() {
      if(this.loading) return
      if(this.orderTypeList?.length > 0) return;

      this.loading = true
      let res = await getOrderTypeList();

      this.orderTypeList = res?.result || []
      this.loading = false
    },
    async getOrderStateList() {
      if(this.loading2) return
      if(this.orderStateList?.length > 0) return;
      this.loading2 = true
      let res = await getOrderStateList();

      this.orderStateList = res?.result || []
      this.loading2 = false
    },

  },
})