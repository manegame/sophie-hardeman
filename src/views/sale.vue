<template>
  <div class='sale'>
    <navbar />
    <topbar />
    <div class="sale__main">
      <template v-if='$route.params.slug === "all"'>
        <!-- ALL GARMENTS -->
        <router-link tag='div'
                     v-for='item in main.garments'
                     :key='item.id'
                     :to="{ name: 'single sale', params: {slug: $route.params.slug, item: item.slug}}"
                     class="sale__main__item" >
               <span class="sale__main__item__price-tag" v-if='!item.acf.linked_product'>
                 Not for sale ;-
               </span>
               <span class="sale__main__item__price-tag" v-else>
                 <!-- get the product by linked id and display price -->
                 {{productById(item.acf.linked_product[0].ID).price}}
               </span>
               <img class="sale__main__item__image"
                    :class='{"sale__main__item__image--emphasis": item.acf.emphasis}'
                    :src='item.acf.image.sizes["s-h-large"]' />
               <div class="sale__main__item__meta">
                 <h6>
                   <span class='sale__main__item__meta__season' v-html='item.acf.season'></span>
                   <span class="sale__main__item__meta__title">{{item.title.rendered}}</span>
                   <span class="sale__main__item__meta__price"
                         v-if='!item.acf.linked_product'>T.B.A.</span>
                   <span class="sale__main__item__meta__price"
                         v-else>{{productById(item.acf.linked_product[0].ID).price}}</span>
                   <span class="sale__main__item__meta__brackets">
                     (amsterdam west)
                   </span>
                 </h6>
               </div>
        </router-link>
      </template>
      <!-- BY CATEGORY -->
      <template v-else>
        <router-link tag='div'
                     v-for='item in main.garments'
                     :key='item.id'
                     :to="{ name: 'single sale', params: {slug: $route.params.slug, item: item.slug}}"
                     class="sale__main__item" >
               <span class="sale__main__item__price-tag" v-if='!item.acf.linked_product'>
                 Not for sale ;-
               </span>
               <span class="sale__main__item__price-tag" v-else>
                 <!-- get the product by linked id and display price -->
                 {{productById(item.acf.linked_product[0].ID).price}}
               </span>
               <img class="sale__main__item__image"
                    :class='{"sale__main__item__image--emphasis": item.acf.emphasis}'
                    :src='item.acf.image.sizes["s-h-medium"]' />
               <div class="sale__main__item__meta">
                 <h6>
                   <span class='sale__main__item__meta__season' v-html='item.acf.season'></span>
                   <span class="sale__main__item__meta__title">{{item.title.rendered}}</span>
                   <span class="sale__main__item__meta__price"
                         v-if='!item.acf.linked_product'>T.B.A.</span>
                   <span class="sale__main__item__meta__price"
                         v-else>{{productById(item.acf.linked_product[0].ID).price}}</span>
                   <span class="sale__main__item__meta__brackets">
                     (amsterdam west)
                   </span>
                 </h6>
               </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'sale',
  components: {
    navbar,
    topbar
  },
  computed: {
    ...mapState(['main']),
    ...mapGetters(['productById'])
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
