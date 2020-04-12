<template>
  <router-link  tag='div'
              :to="`/shopify/${product.handle}`"
              class="product" >
      <span v-if='!product.availableForSale'
            class="product__sold_out"
            v-html='"sold out"'/>
      <span class="product__price-tag">
        {{ priceRange(product.id) }}
      </span>
      <img v-if="product.images.length > 0" v-lazy="product.images[0].src" class="product__image" />
      <div class="product__meta">
        <h6>
          <span class='product__meta__star'>
            ⭑
          </span>
          <span class='product__meta__season' 
                v-html='"SEASON"' />
          <span class="product__meta__title" 
                v-html='product.title' />
          <span class="product__meta__price" 
                v-html='priceRange(product.id)' />
        </h6>
      </div>
</router-link>
</template>

<script>
import { mapState } from 'vuex'
import utils from './mixins/utils'

export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  mixins: [utils],
  computed: {
    ...mapState(['shopify'])
  }
}
</script>

<style lang="scss">
@import '../../style/helpers/_mixins.scss';
@import '../../style/helpers/_responsive.scss';
@import '../../style/_variables.scss';

img[lazy] {
  transition: all 0.5s;
}

img[lazy=loading] {
  object-fit: none;
  object-position: bottom;
  background-color: rgb(240, 240, 240);
  animation-name: glow;
  animation-duration: 2s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes glow {
  from {
    background-color: rgb(240, 240, 240);
  }
  to {
    background-color: rgb(255, 255, 255);
  }
}

.product {
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

  &--no_border {
    border: none;
  }

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

  &__center {
    position: absolute;
    width: 100%;
    text-align: center;
    z-index: 8;
    color: $orange;
    background: $white;
    top: 50%;

    &:hover {
      text-decoration: underline;
    }
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

</style>