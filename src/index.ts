import getGot from "./got"

const key = process.env.API_KEY || ""
const secret = process.env.API_SECRET || ""

const got = getGot(key, secret)

!(async () => {
  const data = await got("api/v3/openOrders")
  console.log(data.body)
})()
