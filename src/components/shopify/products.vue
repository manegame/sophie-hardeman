<template>
  <section class="sale__main">
    <product v-for='product in products' :product="product" :key='product.id'/>
    <a href="#" v-if="hasNextPage" @click.prevent="showNextPage" class="sale__main__item sale__main__item--no_border">
                <span class="sale__main__item__center"
                v-html='"load more items"' />
    </a>
  </section>
</template>

<script>
import product from '@/components/shopify/product'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'products',
  data () {
    return {
      activePage: 1,
      itemsPerPage: 9,
      interval: null
    }
  },
  props: {
    collection: {
      type: String,
      required: false
    }
  },
  components: {
    product
  },
  methods: {
    ...mapActions(['GET_MORE_PRODUCTS']),
    showNextPage () {
      this.activePage++
    },
    loadMore () {
      if (this.hasNextPage) {
        console.log('loading more')
        this.showNextPage()
      } else {
        console.log('all loaded')
        clearInterval(this.interval)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.interval = setInterval(this.loadMore, 1000)
    })
  },
  computed: {
    ...mapState(['shopify']),
    hasNextPage () {
      return this.products.length < this.shopify.products.length
    },
    products () {
      return this.shopify.products.slice(0, this.activePage * this.itemsPerPage)
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../style/helpers/_mixins.scss';
@import '../../style/helpers/_responsive.scss';
@import '../../style/_variables.scss';

.sale {
  @include single;

  &__main {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    padding-bottom: 80px;

    @include screen-size('small') {
      justify-content: center;
    }
  }
}
</style>