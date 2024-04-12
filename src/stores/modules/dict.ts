
import {  getTypeDict } from '@/api'
import { defineStore } from 'pinia'

// 定义 Store
export const useDictStore = defineStore('dict', {
  state: () => ({
    carType:[],
    chargeType: [],
    loading: false,
    loading2: false
  }),
  actions: {
    
    async getCarTypeList() {
      if(this.loading) return
      if(this.carType?.length > 0) return;

      this.loading = true
      let res = await getTypeDict({code: 'carType'});

      this.carType = res?.result || []
      this.loading = false
    },
    async getChargeTypeList() {
      if(this.loading2) return
      if(this.chargeType?.length > 0) return;
      this.loading2 = true
      let res = await getTypeDict({code:'sftype'});

      this.chargeType = res?.result || []
      this.loading2 = false
    },

  },
})