import Debug from "debug"
import type { Balance, TickerPrice } from "../types"

export const debug = Debug("binance.ts").extend

export const findConversion = (tickers: TickerPrice[], symbol: string, to: string): number => {
  const found = tickers.find(t => t.symbol === `${symbol}${to}`)
  if (found) return parseFloat(found.price)

  const reversed = tickers.find(t => t.symbol === `${to}${symbol}`)
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
