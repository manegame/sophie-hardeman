<template>
  <div class='single_sale'>
    <navbar />
    <topbar />
    <div v-if='shop.singleProduct.product.id && imageSource'
         class="single_sale__main">
         <!-- TITLE -->
         <h5 class="single_sale__main__title">
           <span class="single_sale__main__title--season" v-html='shop.singleProduct.product.acf.season' />
           <span class='single_sale__main__title--title' v-html='shop.singleProduct.product.name' />
         </h5>
         <!-- IMAGE -->
         <div class="single_sale__main__left">
           <zoom-img :imageSource='imageSource' />
           <div class="single_sale__main__left__text">
             <!-- DESCRIPTION -->
             <template v-if='shop.singleProduct.product.acf.details'>
               <p class="single_sale__main__left__text--head">Description</p>
               <p class="single_sale__main__left__text--main"
                  v-html='shop.singleProduct.product.acf.details' />
              </template>
            </div>
            <!-- OPTIONS -->
            <div class="single_sale__main__left__payment">
              <!-- ALL PRODUCTS -->
              <template>
                <div class="single_sale__main__left__payment__form">
                  <form @submit.prevent='purchase'>
                    <!-- ATTRIBUTES -->
                    <select v-for='attr in shop.singleProduct.product.attributes'
                            v-if='selectedAttributes[attr.name]'
                            :key='attr.id'
                            v-model='selectedAttributes[attr.name].value'>
                      <option disabled 
                              :value='""'
                              v-html='attr.name' />
                      <option v-for='option in attr.options'
                              :key='option'
                              :value='option'
                              v-html='option'/>
                    </select>
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
import zoomImg from '@/components/base/zoomImg'
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
      selectedAttributes: {},
      variationId: ''
    }
  },
  computed: {
    ...mapState(['main', 'shop']),
    ...mapGetters(['productVariationByOption']),
    variableProduct() {
      if (this.shop.singleProduct.variations.length > 0) return true
      else return false
    },
    variationName() {
      return this.shop.singleProduct.variations[0].attributes[0].name
    },
    imageSource() {
      if (this.shop.singleProduct.variations.length > 0) {
        console.log(this.productVariationByOption(this.variationId))
        if (this.variationId === '') return this.shop.singleProduct.product.acf.image.sizes['s-h-medium']
        else return this.productVariationByOption(this.variationId).image.src
      } else {
        return this.shop.singleProduct.product.acf.image.sizes['s-h-medium']
      }
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART',
      'CLEAR_SINGLE_PRODUCT'
    ]),
    addToCart() {
      if (this.variableProduct === true) {
        const variation = this.productVariationByOption(this.variationId)
        this.ADD_TO_CART({
          product: this.shop.singleProduct.product,
          variation: variation,
          attributes: this.selectedAttributes
        })
      } else {
        console.log('add to cart simple')
        console.log(this.shop.singleProduct.product)
        this.ADD_TO_CART({
          product: this.shop.singleProduct.product,
          attributes: this.selectedAttributes
        })
      }
    },
    purchase() {
      this.addToCart()
      this.$router.push({name: 'checkout'})

      // if (this.variableProduct) {
      //   if (this.variationId !== '') {
      //     this.addToCart()
      //     this.$router.push({name: 'checkout'})
      //   } else {
      //     // window.alert('please choose an option first')
      //   }
      // } else {
      //   this.addToCart()
      //   this.$router.push({name: 'checkout'})
      // }
    }
  },
  destroyed() {
    this.CLEAR_SINGLE_PRODUCT()
  },
  watch: {
    'shop.singleProduct.product.attributes'(val) {
      for (let i = 0; i < val.length; i++) {
        let valueToSet = {
          id: val[i].id,
          key: val[i].name,
          value: val[i].name
        }
        this.$set(this.selectedAttributes, val[i].name, valueToSet)
      }
    }
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
