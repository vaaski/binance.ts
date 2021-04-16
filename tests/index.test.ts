import test from "ava"
import Binance from "../src"

const KEY = process.env.API_KEY as string
const SECRET = process.env.API_SECRET as string

let bn: Binance

test.before(async () => {
  bn = new Binance(KEY, SECRET)
})

test("get user account data", async t => {
  const data = await bn.account()

  t.truthy(data.balances.length)
})

test("get all tickers", async t => {
  const data = await bn.tickerPrice()

  t.truthy(data.length)
  t.truthy(data[0].price)
})

test("get USDT ticker", async t => {
  const data = await bn.tickerPrice("BTCUSDT")

  t.truthy(data.price)
})

test("throw nonexistent ticker", async t => {
  const error = await t.throwsAsync(bn.tickerPrice("BINANCE.TS"))

  t.truthy(error.message)
  t.truthy(error.name)
})

test("get USDT average price", async t => {
  const data = await bn.avgPrice("BTCUSDT")

  t.truthy(data.price)
})

test("Binance instance without secret", async t => {
  const _bn = new Binance(KEY)
  t.truthy(_bn)

  await t.throwsAsync(_bn.account())
})

test("Binance instance without secret and key", t => {
  t.truthy(new Binance())
})
