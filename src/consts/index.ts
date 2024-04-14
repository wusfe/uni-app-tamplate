const  orderErlun =  "/static/order-erlun.png";
const  orderSanlun  =  "/static/order-sanlun.png";
const orderJiaoche = "/static/order-jiaoche.png";
const etczf = "/static/etczf.png";
const cash = "/static/cash.png";
const moveCash = "/static/move-cash.png";
const orderSanke = "/static/order-sanke.png";

export const ORDERSTATUSTEXT:any = {
  0: '待付款',
  1: '已付款',
  2: '已完成',
  ['-1']: '已退票',
  4: '已开票',
  3: '正在开票',
}

export const ORDERCHARGETYPELIST  = [
  {
    text: '现金',
    value: 1
  },
  {
    text: '移动',
    value: 2
  },
  {
    text: 'ETC',
    value: 3
  },
  {
    text: '小程序',
    value: 4
  }
]


export const ORDER_COMMONICON = {
  "散客": orderSanke,
  "二轮车": orderErlun,
  "三轮车": orderSanlun,
  "轿车":orderJiaoche,
  "现金": cash,
  "移动": moveCash,
  "ETC": etczf
};
