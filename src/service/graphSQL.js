/**
 * TEST
 */
const allCollectionsQuery = `{
  shop {
  collections(first:20) {
    edges{
      node {
        id
        handle
        title
      }
    }
  }
}
}`

const productTypesQuery = `{
  products(first:250)	{
    edges{
      node{
        productType
      }
    }
  }
}`

export default class GraphSql {
  construct () {}

  allCollectionsQuery() {
    return allCollectionsQuery
  }

  productTypesQuery() {
    return productTypesQuery
  }
}
