<template>
  <div class='sale'>
    <navbar />
    <topbar />
    <div  class="sale__main"
          v-if='this.main.garment_categories.length > 0'>
      <template v-if='$route.params.slug === "all"'>
        <!-- ALL GARMENTS -->
        <router-link  tag='div'
                      v-for='item in shop.products'
                      v-if='item.catalog_visibility !== "hidden"'
                      :event='!item.in_stock ? "" : "click"'
                      :key='item.id'
                      :to="{ name: 'single sale', params: {slug: $route.params.slug, item: item.slug}}"
                      class="sale__main__item" >
              <span v-if='!item.in_stock'
                    class="sale__main__item__sold_out"
                    v-html='"sold out"'/>
              <span class="sale__main__item__price-tag">
                <!-- get the product by linked id and display price -->
                {{item.price}}
              </span>
              <img  class="sale__main__item__image"
                    :src='item.acf.image.sizes["s-h-pixel"]'
                    @load='handleLoaded($event, item)' />
              <div class="sale__main__item__meta">
                <h6>
                  <span class='sale__main__item__meta__season' 
                        v-html='item.acf.season' />
                  <span class="sale__main__item__meta__title" 
                        v-html='item.name' />
                  <span class="sale__main__item__meta__price" 
                        v-html='item.price' />
                  <!-- <span class="sale__main__item__meta__brackets">
                    (amsterdam west)
                  </span> -->
                </h6>
              </div>
        </router-link>
      </template>
      <!-- BY CATEGORY -->
      <template v-else >
        <router-link tag='div'
                      v-for='item in shop.products'
                      v-if='item.acf.garment_category.term_id && item.acf.garment_category.term_id === currentCategory && item.catalog_visibility !== "hidden"'
                      :event='!item.in_stock ? "" : "click"'
                      :key='item.id'
                      :to="{ name: 'single sale', params: {slug: $route.params.slug, item: item.slug}}"
                      class="sale__main__item" >
              <span v-if='!item.in_stock'
                    class="sale__main__item__sold_out" 
                    v-html='"sold out"'/>
              <span class="sale__main__item__price-tag">
                <!-- get the product by linked id and display price -->
                {{item.price}}
              </span>
              <img  class="sale__main__item__image"
                    :src='item.acf.image.sizes["s-h-pixel"]'
                    @load='handleLoaded($event, item)' />
              <div class="sale__main__item__meta">
                <h6>
                  <span class='sale__main__item__meta__season' 
                        v-html='item.acf.season' />
                  <span class="sale__main__item__meta__title" 
                        v-html='item.name' />
                  <span class="sale__main__item__meta__price" 
                        v-html='item.price' />
                  <!-- <span class="sale__main__item__meta__brackets">
                    (amsterdam west)
                  </span> -->
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
  head: {
    title: () => {
      return {
        inner: 'Sale'
      }
    },
    meta: () => {
      return [
        { name: 'title', content: 'Sale' }
      ]
    }
  },
  components: {
    navbar,
    topbar
  },
  computed: {
    ...mapState(['main', 'shop']),
    ...mapGetters(['productById']),
    currentCategory() {
      if (this.$route.name === 'sale') {
        return this.main.garment_categories.filter(c => {
          return c.slug === this.$route.params.slug
        })[0].id
      } else return 0
    }
  },
  methods: {
    handleLoaded(event, item) {
      event.currentTarget.src = item.acf.image.sizes['s-h-medium']
    }
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

        &::after {
          content: " €"
        }
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
