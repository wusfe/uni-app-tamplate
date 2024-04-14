
import {  getTypeDict } from '@/api'
import { defineStore } from 'pinia'

// 定义 Store
export const useDictStore = defineStore('dict', {
  state: () => ({
    carType:[],
    chargeType: [],
    goodtype: [],
    taskType: [],
    loading: false,
    loading2: false,
    loading3: false,
    loading4: false
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
    async getGoodtype() {
      if(this.loading3) return
      if(this.goodtype?.length > 0) return;
      this.loading3 = true
      let res = await getTypeDict({code:'goodtype'});
      this.goodtype = res?.result || []
      this.loading3 = false
    },
    async getTaskType() {
      if(this.loading4) return
      if(this.taskType?.length > 0) return;
      this.loading4 = true
      let res = await getTypeDict({code:'tasktype'});
      this.taskType = res?.result || []
      this.loading4 = false
    },
  },
})