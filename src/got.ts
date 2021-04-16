import { createHmac } from "crypto"
import got, { Got } from "got"

const sig = (secret: string, data: string) => {
  return createHmac("sha256", secret).update(data).digest("hex")
}

export default (key: string, secret: string): Got => {
  return got.extend({
    prefixUrl: "https://api.binance.com",
    responseType: "json",
    hooks: {
      beforeRequest: [
        options => {
          options.url.searchParams.set("timestamp", Date.now().toString())

          const signature = sig(secret, options.url.searchParams.toString())
          options.url.searchParams.set("signature", signature)

          options.headers["X-MBX-APIKEY"] = key

          // console.log(options.headers, options.url)
        },
      ],
      beforeError: [
        error => {
          const { response } = error
          if (response?.body) {
            const body = response.body as Record<string, string>

            error.message = body.msg
            error.name = `ERROR CODE ${body.code}`
          }

          return error
        },
      ],
    },
  })
}
