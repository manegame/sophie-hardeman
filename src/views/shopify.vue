<template>
  <div class='sale'>
    <navbar />
    <topbar />
    <div  class="sale__main">
      Hey
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loadImg from '@/components/base/load-img'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'shopify',
  head: {
    title: () => {
      return {
        inner: 'Shopify'
      }
    },
    meta: () => {
      return [
        { name: 'title', content: 'Shop' }
      ]
    }
  },
  components: {
    navbar,
    topbar,
    loadImg
  },
  computed: {
    ...mapState(['main', 'shopify'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

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

    &::after {
      content: "";
      flex: auto;

      @include screen-size('small') {
        flex: none;
      }
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
