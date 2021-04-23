import Debug from "debug"
import type { Balance, TickerPrice } from "../types"

export const debug = Debug("binance.ts").extend

export const findConversion = (tickers: TickerPrice[], from: string, to: string): number => {
  from = from.toUpperCase()
  to = to.toUpperCase()

  if (from === to) return 1

  const found = tickers.find(t => t.symbol === `${from}${to}`)
  if (found) return parseFloat(found.price)

  const reversed = tickers.find(t => t.symbol === `${to}${from}`)
  if (reversed) return 1 / parseFloat(reversed.price)

  return 0
}

export const combineTo = (balances: Balance[], tickers: TickerPrice[], to: string): number => {
  const converted = balances.map(balance => {
    const price = findConversion(tickers, balance.asset, to)
    if (price) return price * parseFloat(balance.free)
    return 0
  })

  return converted.reduce((p, c) => p + c)
}
