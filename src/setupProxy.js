// src/setupProxy.js (CommonJS)
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://fake-api-tau.vercel.app',
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/api': '/api/efood' }
    })
  )
}
