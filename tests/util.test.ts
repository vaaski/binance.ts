import test from "ava"
import Binance from "../src"
import { combineTo } from "../src/util"

import type { TickerPrice, UserData } from "../types"

const KEY = process.env.API_KEY as string
const SECRET = process.env.API_SECRET as string

let account: UserData
let tickers: TickerPrice[]

test.before(async () => {
  const bn = new Binance(KEY, SECRET)
  account = await bn.account()
  tickers = await bn.tickerPrice()
})

test("get combined account balance in USDT", async t => {
  const combined = combineTo(account.balances, tickers, "USDT")

  t.truthy(combined)
})
