<template>
  <div class='cart_item'>
    <span class="cart_item__amount">
      {{item.quantity}} items
      <button @click='ADD_TO_CART(item.data)'
              v-html='"+"' />
    </span>
    <!-- SHOW IMAGE FROM ACF OR VARIATION -->
    <img  class='cart_item__image' 
          :src='imageSource' />
    <div  class="cart_item__meta">
      <h6>
        <span class='cart_item__meta__season' 
              v-html='item.data.product.acf.season' />
          <span class="cart_item__meta__title">
            <span v-html='item.data.product.name'/>
            <span v-for='attribute in item.attributes'
                  :key='attribute.id'
                  v-html='"(" + attribute.value + ") "'/>
          </span>
          <span class="cart_item__meta__price"
                v-if='item.data.variation'
                v-html='item.data.variation.price' />
          <span class="cart_item__meta__price"
                v-else
                v-html='item.data.product.price' />
          <br />
      </h6>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'cart-item',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART',
      'REMOVE_FROM_CART'
    ])
  },
  computed: {
    imageSource() {
      if (this.item.data.variation) {
        return this.item.data.variation.image.src
      } else {
        return this.item.data.product.acf.image.sizes['s-h-medium']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/_variables.scss';

.cart_item {
  width: $left-col-width;
  height: $left-col-width;
  border-radius: 8px;
  margin-right: 20px;
  margin-bottom: 30px;
  border: 1px solid $grey-darker;
  overflow: hidden;
  position: relative;

  &__amount {
    background: $white;
    position: absolute;
    left: 0;
    font-family: $sans-serif-stack;
    font-size: $font-size;
    line-height: 100%;
    color: $orange;
    padding: 4px 6px;
    border-radius: 6px 0 6px 0;
    border-bottom: 1px solid $grey-darker;
    border-right: 1px solid $grey-darker;
  }

  &__image {
    z-index: 6;
    width: 100%;
    display: block;
    height: calc(100% - 60px);
    object-fit: contain;
    object-position: top center;
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
      white-space: nowrap;
      font-family: $sans-serif-stack;
      font-size: $font-size;
      line-height: 100%;
      color: $orange;
      padding: 2px 6px;
      border-radius: 6px;
      border: 1px solid $grey-dark;

      &::after {
        content: " €"
      }
    }

    &__brackets {
      font-family: sans-serif;
      font-size: $font-size-s;
    }
  }
}
</style>


