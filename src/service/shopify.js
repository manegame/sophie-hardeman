import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: process.env.STOREFRONT_DOMAIN,
  storefrontAccessToken: process.env.STOREFRONT_TOKEN
})

export default {
  getProducts: () => {
    return new Promise((resolve, reject) => {
      client.product.fetchAll()
        .then(
          products => {
            resolve(products)
          },
          error => {
            reject(error)
          }
        )
    })
  }
}
