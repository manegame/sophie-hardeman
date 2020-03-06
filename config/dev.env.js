var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  STOREFRONT_DOMAIN: '"hardeman-co.myshopify.com"',
  STOREFRONT_TOKEN: '"f095b4984e9599237417036673cf7d8b"',
  STOREFRONT_API_KEY: '"a035062c97021edba972a7a22a770832"',
  STOREFRONT_API_PASSWORD: '"26856bb9e0f8a59447e33e02cf336868"',
  STOREFRONT_SHARED_SECRET: '"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"'
})
