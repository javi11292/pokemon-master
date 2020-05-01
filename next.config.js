const withPWA = require("next-offline")
const withWorkers = require("@zeit/next-workers")

const homepage = process.env.NODE_ENV === "production" ? process.env.npm_package_homepage : ""

module.exports = withWorkers(
  withPWA(
    {
      env: {
        homepage,
      },
      generateBuildId: async () => "current",
      workerLoaderOptions: { publicPath: `${homepage}/_next/`, name: "static/[hash].worker.js" },
      assetPrefix: homepage,
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
    }
  )
)