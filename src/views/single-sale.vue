<template>
  <div class='single_sale'>
    <navbar />
    <topbar />
    <div v-if='shop.singleProduct.product.id && imageSource'
         class="single_sale__main">
         <h5 class="single_sale__main__title">
           <span class="single_sale__main__title--season" v-html='shop.singleProduct.product.acf.season' />
           <span class='single_sale__main__title--title' v-html='shop.singleProduct.product.name' />
         </h5>
         <div class="single_sale__main__left">
           <zoom-img :imageSource='imageSource' />
           <div class="single_sale__main__left__text">
             <template v-if='shop.singleProduct.product.acf.details'>
               <p class="single_sale__main__left__text--head">Description</p>
               <p class="single_sale__main__left__text--main"
                  v-html='shop.singleProduct.product.acf.details' />
              </template>
            </div>
            <div class="single_sale__main__left__payment">
              <!-- <template v-for='attr in shop.singleProduct.product.attributes'>
                <select v-if='!attr.variation'
                        v-model='selectedAttribute.value'
                        :key='attr.name'>
                  <option disabled value='' 
                          v-html='attr.name' />
                  <option v-for='option in attr.options'
                          :key='option'
                          :value='option'
                          v-html='option'/>
                  {{attr.name}}
                </select>
              </template> -->
              <template v-if='shop.singleProduct.variations.length > 0'>
                <div class="single_sale__main__left__payment__form">
                  <form @submit.prevent='purchase'>
                    <select   v-model='selectedVariation'>
                      <option disabled value='' 
                              v-html='shop.singleProduct.variations[0].attributes[0].name' />
                      <option v-for='variation in shop.singleProduct.variations'
                              :disabled='!variation.in_stock'
                              :key='variation.id'
                              :value='variation.attributes[0].option'
                              v-html='variation.attributes[0].option'/>
                    </select>
                    <input type='submit' value='Order' />
                  </form>
                </div>
              </template>
              <template v-else>
                <div class="single_sale__main__left__payment__form">
                  <form @submit.prevent='purchase'>
                    <input type='submit' value='Order' />
                  </form>
                </div>
              </template>
           </div>
         </div>
         <div class="single_sale__main__right">
           <aboutSophie />
         </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import zoomImg from '@/components/zoomImg'
import aboutSophie from '@/components/about-sophie'

export default {
  name: 'single-sale',
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
    topbar,
    zoomImg,
    aboutSophie
  },
  data() {
    return {
      selectedVariation: '',
      selectedAttribute: {
        value: ''
      }
    }
  },
  computed: {
    ...mapState(['main', 'shop']),
    ...mapGetters(['productVariationByOption']),
    variableProduct() {
      if (this.shop.singleProduct.variations.length > 0) return true
      else return false
    },
    imageSource() {
      if (this.shop.singleProduct.variations.length > 0) {
        console.log(this.productVariationByOption(this.selectedVariation))
        if (this.selectedVariation === '') return this.shop.singleProduct.product.acf.image.sizes['s-h-medium']
        else return this.productVariationByOption(this.selectedVariation).image.src
      } else {
        return this.shop.singleProduct.product.acf.image.sizes['s-h-medium']
      }
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART',
      'CLEAR_SINGLE_PRODUCT']),
    addToCart() {
      console.log('add to cart variable')
      if (this.variableProduct === true) {
        const variation = this.productVariationByOption(this.selectedVariation)
        console.log(variation)
        this.ADD_TO_CART({
          product: this.shop.singleProduct.product,
          variation: variation,
          attribute: this.selectedAttribute
        })
      } else {
        console.log('add to cart simple')
        console.log(this.shop.singleProduct.product)
        this.ADD_TO_CART({
          product: this.shop.singleProduct.product,
          attribute: this.selectedAttribute
        })
      }
    },
    purchase() {
      if (this.variableProduct) {
        if (this.selectedVariation !== '') {
          this.addToCart()
          this.$router.push({name: 'checkout'})
        } else {
          window.alert('please choose an option first')
        }
      } else {
        this.addToCart()
        this.$router.push({name: 'checkout'})
      }
    }
  },
  destroyed() {
    this.CLEAR_SINGLE_PRODUCT()
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.single_sale {
  @include single;

  &__main {
    &__title {
      width: calc(100% - #{$left-col-width});
      margin-bottom: 10px;
      color: $black;

      @include screen-size('small') {
        width: 100%;
      }

      &--season {
        color: $grey-darker;
        display: inline;

        &::before {
          content: '\2605';
          font-size: 20px;
          margin-right: 6px;
        }
      }
    }

    &__left {
      position: relative;
      clear: none;
      float: left;
      width: calc(100% - #{$left-col-width});

      @include screen-size('medium') {
        width: calc(100% - 20px);
        margin-bottom: 40px;
      }

      @include screen-size('small') {
        width: 100%;
      }

      &__text {
        width: 50%;
        float: left;
        font-size: $font-size-s;
        line-height: $line-height-s;
        padding-right: 20px;

        &--head {
          color: $grey-darker;
        }

        &--main {
          margin-bottom: $line-height-s;
        }

        @include screen-size('small') {
          width: 66%;
        }
      }

      &__payment {
        font-size: $font-size-s;
        line-height: $line-height-s;
        width: 50%;
        float: right;

        @include screen-size('small') {
          width: 33%;
        } 
      }
    }

    &__right {
      padding-left: 20px;
      width: $left-col-width;
      position: relative;
      float: right;

      @include screen-size('small') {
        padding: 0;
        float: left;
        width: 100%;
      }
    }
  }
}
</style>
