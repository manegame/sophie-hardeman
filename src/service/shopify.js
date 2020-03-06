import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: process.env.STOREFRONT_DOMAIN,
  storefrontAccessToken: process.env.STOREFRONT_TOKEN
})

export default {
  /**
   *
   * PRODUCTS
   *
   */

  /**
   * Get all products
   *
   */
  getProducts: () => {
    return new Promise((resolve, reject) => {
      client.product.fetchAll()
        .then(
          product => {
            resolve(product)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   * Get a single product by its ID
   *
   * @param {String} id
   */
  getProductByID: (id) => {
    return new Promise((resolve, reject) => {
      client.product.fetch(id)
        .then(
          product => {
            resolve(product)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   * Get a single product by its handle
   *
   * * @param {String} handle
   */
  getProductByHandle: (handle) => {
    return new Promise((resolve, reject) => {
      client.product.fetchByHandle(handle)
        .then(
          product => {
            resolve(product)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   *
   * COLLECTIONS
   *
   */

  /**
   * Get all collections, including their products
   */
  getCollections: () => {
    return new Promise((resolve, reject) => {
      console.log('get collections')
      client.collection.fetchAllWithProducts()
        .then(
          collections => {
            console.log('colkectuibssss')
            resolve(collections)
          },
          error => {
            console.error(error)
            reject(error)
          }
        )
    })
  },

  /**
   * Get a single collection, including its products
   *
   * * @param {String} id
   * * @param {Number} amount - The amount of products to include
   */
  getCollection: (id, amount) => {
    return new Promise((resolve, reject) => {
      client.collection.fetchWithProducts(id, {productsFirst: amount})
        .then(
          collection => {
            resolve(collection)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   *
   * CHECKOUTS
   *
   */

  /**
   * Create a new checkout
   *
   */
  createCheckout: () => {
    return new Promise((resolve, reject) => {
      client.checkout.create()
        .then(
          checkout => {
            resolve(checkout)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   * Update checkout attributes
   *
   * @param {String} id - ID of the checkout
   * @param {Object} input - Input with structure {customAttributes: [{key: "MyKey", value: "MyValue"}]}
   */
  updateCheckout: (id, input) => {
    return new Promise((resolve, reject) => {
      client.checkout.updateAttributes(id, input)
        .then(
          checkout => {
            resolve(checkout)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   * Add an item to the checkout
   *
   * @param {String} id - the id of the checkout
   * @param {Array} lineItemsToAdd - Line items to add. With following structure:
    [
      {
        variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==',
        quantity: 5,
        customAttributes: [{key: "MyKey", value: "MyValue"}]
      },
      {
        ...
      },
    ]
   */
  addLineItems: (id, lineItemsToAdd) => {
    return new Promise((resolve, reject) => {
      client.checkout.addLineItems(id, lineItemsToAdd)
        .then(
          checkout => {
            // console.log(checkout.lineItems); // Array with one additional line item
            resolve(checkout)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   * Update an existing line item
   *
   * @param {String} id - the id of the checkout
   * @param {Array} lineItemsToUpdate - Line items to add. With following structure:
    [
      {id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=', quantity: 2}
    ]
   */
  updateLineItems: (id, lineItemsToUpdate) => {
    return new Promise((resolve, reject) => {
      client.checkout.updateLineItems(id, lineItemsToUpdate)
        .then(
          checkout => {
            // console.log(checkout.lineItems); // Array with updated line item
            resolve(checkout)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   * Update an existing line item
   *
   * @param {String} id - the id of the checkout
   * @param {Array} lineItemsToRemove - Line items to remove. Array of IDs
    [
      Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=
    ]
   */
  removeLineItems: (id, lineItemsToRemove) => {
    return new Promise((resolve, reject) => {
      client.checkout.updateLineItems(id, lineItemsToRemove)
        .then(
          checkout => {
            // console.log(checkout.lineItems); // Array without removed line item
            resolve(checkout)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   * Get an existing checkout
   *
   * @param {String} id - ID of the checkout
   */
  getCheckout: (id) => {
    return new Promise((resolve, reject) => {
      client.checkout.fetch(id)
        .then(
          checkout => {
            // console.log(checkout.lineItems); // Array without removed line item
            resolve(checkout)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   *
   * DISCOUNTS
   *
   */

  /**
   * Add a discount
   *
   * @param {String} id - Checkout ID
   * @param {String} code - Discount code
   */
  addDiscount: (id, code) => {
    return new Promise((resolve, reject) => {
      client.checkout.addDiscount(id, code)
        .then(
          checkout => {
            resolve(checkout)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   * Remove a discount
   *
   * @param {String} id - Checkout ID
   */
  removeDiscount: (id) => {
    return new Promise((resolve, reject) => {
      client.checkout.removeDiscount(id)
        .then(
          checkout => {
            resolve(checkout)
          },
          error => {
            reject(error)
          }
        )
    })
  },

  /**
   * Update shipping address
   *
   * @param {String} id
   * @param {Object} address
   */
  updateShippingAddress: (id, address) => {
    return new Promise((resolve, reject) => {
      client.checkout.updateShippingAddress(id, address)
        .then(
          checkout => {
            resolve(checkout)
          },
          error => {
            reject(error)
          }
        )
    })
  }

}
