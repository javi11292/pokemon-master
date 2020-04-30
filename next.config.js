const withPWA = require("next-offline")

module.exports = withPWA({
  env: {
    homepage: process.env.npm_package_homepage,
  },
  generateBuildId: async () => 'current',
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.npm_package_homepage : "",
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT ? "service-worker.js" : `${__dirname}/public/service-worker.js`,
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 200
          }
        }
      }
    ]
  }
})