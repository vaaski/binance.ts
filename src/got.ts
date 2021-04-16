import { debug } from "./util"
import { createHmac } from "crypto"
import _got, { Got } from "got"

const sig = (secret: string, data: string) => {
  return createHmac("sha256", secret).update(data).digest("hex")
}

const log = debug("got.ts")

export default _got.extend({
  prefixUrl: "https://api.binance.com",
  responseType: "json",
  hooks: {
    beforeError: [
      error => {
        const { response } = error
        if (response?.body) {
          const body = response.body as Record<string, string>
          log.extend("error")(body)

          error.message = body.msg
          error.name = `ERROR CODE ${body.code}`
        }

        return error
      },
    ],
  },
})

export const withKey = (got: Got, key: string): Got =>
  got.extend({
    hooks: {
      beforeRequest: [
        options => {
          options.headers["X-MBX-APIKEY"] = key
        },
      ],
    },
  })

export const withSignature = (got: Got, secret: string): Got =>
  got.extend({
    hooks: {
      beforeRequest: [
        options => {
          options.url.searchParams.set("timestamp", Date.now().toString())

          const signature = sig(secret, options.url.searchParams.toString())
          options.url.searchParams.set("signature", signature)
        },
      ],
    },
  })
