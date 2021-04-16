module.exports = {
  apps: [
    {
      script: "./lib/index.js",
      name: "binance.ts",
      node_args: "-r dotenv/config",
    },
  ],
}
