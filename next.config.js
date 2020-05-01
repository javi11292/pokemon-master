const withPWA = require("next-offline")
const withWorkers = require("@zeit/next-workers")

const basePath = process.env.NODE_ENV === "production" ? process.env.npm_package_basePath : ""

module.exports = withWorkers(
  withPWA(
    {
      env: {
        basePath,
      },
      generateBuildId: async () => "current",
      workerLoaderOptions: { publicPath: `${basePath}/_next/`, name: "static/[hash].worker.js" },
      assetPrefix: basePath,
      dontAutoRegisterSw: true,
      experimental: { basePath: basePath },
      workboxOpts: {
        swDest: process.env.NEXT_EXPORT ? "service-worker.js" : `${__dirname}/public/service-worker.js`,
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: "CacheFirst",
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