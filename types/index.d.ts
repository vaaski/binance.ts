export interface UserData {
  makerCommission: number
  takerCommission: number
  buyerCommission: number
  sellerCommission: number
  canTrade: boolean
  canWithdraw: boolean
  canDeposit: boolean
  updateTime: number
  accountType: string
  balances: Balance[]
  permissions: string[]
}

export interface Balance {
  asset: string
  free: string
  locked: string
}

export interface AvgPrice {
  mins: number
  price: string
}

export interface TickerPrice {
  symbol: string
  price: string
}
