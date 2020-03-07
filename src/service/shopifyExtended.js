import axios from 'axios'
import GraphSql from './GraphSQL.js'

export default class {
  constructor () {
    this.shopifyDomain = 'https://' + process.env.STOREFRONT_DOMAIN + process.env.STOREFRONT_GQL_URI
    this.shopifyToken = process.env.STOREFRONT_TOKEN
    this.graphSql = new GraphSql()
  }

  query (gsqlData, successCallback, errorCallback) {
    let config = {
      headers: {
        'X-Shopify-Storefront-Access-Token': this.shopifyToken,
        'content-Type': 'application/json',
        accept: 'application/json'
      }
    }

    axios.post(this.shopifyDomain, gsqlData, config)
      .then(successResponse => {
        successCallback(successResponse)
      })
      .catch(errorResponse => {
        console.log('Error ', errorResponse)
        errorCallback(errorResponse)
      })
  }

  allProductTypes (successCallback, errorCallback) {
    return new Promise((resolve, reject) => {
      const query = JSON.stringify({ query: this.graphSql.productTypesQuery() })
      this.query(query, responseSuccess => {
        console.log(responseSuccess)
        let result = responseSuccess.data.data.products.edges
        resolve(result)
      }, responseError => {
        reject(responseError)
      })
    })
  }
}
