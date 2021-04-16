import { Got } from "got"
import got, { withKey, withSignature } from "./got"

import type { AvgPrice, TickerPrice, UserData } from "../types"

export { combineTo, findConversion } from "./util"

export default class Binance {
  private got: Got
  private gotKey: Got | null = null
  private gotSig: Got | null = null
  private SIG_REQUIRED = "API KEY & SECRET required for this endpoint."

  constructor(key?: string, secret?: string) {
    this.got = got
    if (key) this.gotKey = withKey(this.got, key)
    if (this.gotKey && secret) this.gotSig = withSignature(this.gotKey, secret)
  }

  avgPrice = async (symbol: string): Promise<AvgPrice> => {
    return await this.got("api/v3/avgPrice", {
      searchParams: { symbol },
    }).json()
  }

  account = async (): Promise<UserData> => {
    if (!this.gotSig) throw Error(this.SIG_REQUIRED)

    return await this.gotSig("api/v3/account").json()
  }

  async tickerPrice(): Promise<TickerPrice[]>
  async tickerPrice(symbol: string): Promise<TickerPrice>
  async tickerPrice(symbol?: string): Promise<TickerPrice[] | TickerPrice> {
    const searchParams = new URLSearchParams()
    if (symbol) searchParams.set("symbol", symbol)

    return await this.got("api/v3/ticker/price", { searchParams }).json()
  }
}
