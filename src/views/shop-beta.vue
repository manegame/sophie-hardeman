<template>
  <div class='shop'>
    <navbar />
    <topbar />
    <div v-if='main.big_cartel.products.length > 0'
         class="shop__main">
         <a           v-for='item in main.big_cartel.products'
                      :key='item.id'
                      :href='"http://hardeman.bigcartel.com" + item.url'
                      class="shop__main__item" >
                <span class="shop__main__item__price-tag">
                  {{item.price}}
                </span>
                <img class="shop__main__item__image"
                     :src='item.images[0].url' />
                <div class="shop__main__item__meta">
                  <h6>
                    <span class='shop__main__item__meta__season'>ssXX</span>
                    <span class="shop__main__item__meta__title">{{item.title}}</span>
                    <span class="shop__main__item__meta__price">{{item.price}}</span>
                    <span class="shop__main__item__meta__brackets">
                      (amsterdam HOOD)
                    </span>
                  </h6>
                </div>
         </a>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'shop-beta',
  components: {
    navbar,
    topbar
  },
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.shop {
  @include single;

  &__main {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;

    &::after {
      content: "";
      flex: auto;
    }

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

        &::after {
          content: " €"
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
  }
}
</style>
