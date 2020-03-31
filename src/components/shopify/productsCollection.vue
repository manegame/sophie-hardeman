<template>
  <section class="sale__main">
    <router-link  tag='div'
                  v-for='item in collection.products'
                  :key='item.id'
                  :to="`/shopify/${item.handle}`"
                  class="sale__main__item" >
          <span v-if='!item.availableForSale'
                class="sale__main__item__sold_out"
                v-html='"sold out"'/>
          <span class="sale__main__item__price-tag">
            {{ priceRange(item.id) }}
          </span>
          <load-img  class="sale__main__item__image"
                    :item='item.images[0].src' />
          <div class="sale__main__item__meta">
            <h6>
              <span class='sale__main__item__meta__season' 
                    v-html='"SEASON"' />
              <span class="sale__main__item__meta__title" 
                    v-html='item.title' />
              <span class="sale__main__item__meta__price" 
                    v-html='priceRange(item.id)' />
            </h6>
          </div>
    </router-link>
  </section>
</template>

<script>
import loadImg from '@/components/base/load-img'
import { mapState } from 'vuex'

export default {
  name: 'products-collection',
  components: {
    loadImg
  },
  methods: {
    priceRange (id) {
      const product = this.collection.products.find((pr) => {
        return pr.id === id
      })

      if (product.variants.length > 1) {
        let p = product.variants.map((vr) => {
          return Number.parseFloat(vr.priceV2.amount)
        })
        const u = new Set(p)
        const prizes = [...u]
        return 'Starting from ' + product.variants[0].priceV2.currencyCode + ' ' + Math.min(prizes)
      } else {
        return product.variants[0].priceV2.currencyCode + ' ' + product.variants[0].priceV2.amount
      }
    }
  },
  computed: {
    ...mapState(['shopify']),
    collection () {
      return this.shopify.collections.find((col) => {
        return col.handle === this.$route.params.handle
      })
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

    // &::after {
    //   content: "";
    //   flex: auto;

    //   @include screen-size('small') {
    //     flex: none;
    //   }
    // }

    &__item {
      width: $left-col-width;
      height: $left-col-width;
      position: relative;
      border-radius: 8px;
      margin-right: 20px;
      margin-bottom: 30px;
      border: 1px solid $grey-darker;
      overflow: hidden;
      cursor: pointer;
      align-self:flex-start;

      @include screen-size('small') {
        margin-right: 0;
      }

      &__price-tag {
        z-index: 7;
        background: $white;
        position: absolute;
        left: 0;
        font-family: $sans-serif-stack;
        font-size: $font-size;
        line-height: 100%;
        color: $orange;
        padding: 4px 6px;
        border-radius: 0 0 6px 0;
        border-bottom: 1px solid $grey-darker;
        border-right: 1px solid $grey-darker;
        white-space: nowrap;
      }

      &__sold_out {
        position: absolute;
        width: 100%;
        text-align: center;
        z-index: 8;
        color: $orange;
        background: $white;
        border-bottom: $border;
        border-top: $border;
        top: 40%;
      }

      &__image {
        z-index: 6;
        width: 100%;
        display: block;
        height: calc(100% - 60px);
        object-fit: contain;
        object-position: top center;

        &--emphasis {
          display: block;
          width: 100%;
          height: calc(100% - 60px);
          object-fit: cover;
          object-position: center;
        }
      }

      &__meta {
        border-top: 1px solid $grey-darker;
        padding: 8px 20px;
        height: 60px;

        &__season {
          color: $grey-darker;

          &::before {
            content: '\2605';
            margin-right: 4px;
          }
        }

        &__title {
          color: $blue;
        }

        &__price {
          font-family: $sans-serif-stack;
          font-size: $font-size;
          line-height: 100%;
          color: $orange;
          padding: 2px 6px;
          border-radius: 6px;
          border: 1px solid $grey-dark;
          white-space: nowrap;
        }

        &__brackets {
          font-family: sans-serif;
          font-size: $font-size-s;
        }
      }
    }
  }
}
</style>