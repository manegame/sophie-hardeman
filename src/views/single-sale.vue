<template>
  <div class='single_sale'>
    <navbar />
    <topbar />
    <div v-if='main.single_garment.acf'
         class="single_sale__main">
         <h5 class="single_sale__main__title">
           <span class="single_sale__main__title--season"
                 v-html='main.single_garment.acf.season'></span>
           <span class='single_sale__main__title--title'
                 v-html='main.single_garment.title.rendered'></span>
         </h5>
         <div class="single_sale__main__left">
           <img class="single_sale__main__left__image"
                :src='main.single_garment.acf.image.sizes["s-h-small"]'/>
           <div class="single_sale__main__left__text">
             <template v-if='main.single_garment.acf.description'>
               <p class="single_sale__main__left__text--head">Description</p>
               <p class="single_sale__main__left__text--main"
                  v-html='main.single_garment.acf.description' />
             </template>
             <template v-if='main.single_garment.acf.details'>
               <p class="single_sale__main__left__text--head">Details</p>
               <p class="single_sale__main__left__text--main"
                  v-html='main.single_garment.acf.details' />
             </template>
             <template v-if='main.single_garment.acf.details_and_sizing'>
               <p class="single_sale__main__left__text--head">Details & sizing</p>
               <p class="single_sale__main__left__text--main"
                  v-html='main.single_garment.acf.details_and_sizing' />
             </template>
           </div>
           <div class="single_sale__main__left__payment">
            <!-- PRODUCT VARIABLE -->
            <template v-if='shop.singleProduct.product.attributes'>
              <div class="single_sale__main__left__payment__form"
                   v-for='attribute in shop.singleProduct.product.attributes'
                   :key='attribute.id'>
                <form v-if='attribute.name !== ""'
                      @submit.prevent='purchase'>
                  <select v-model='selected'>
                    <option disabled value=''>Have your pick</option>
                    <option v-for='option in attribute.options'
                            :key='option.id'
                            :value='option'
                            v-html='option'/>
                  </select>
                  <input type='submit' value='Purchase' />
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
import aboutSophie from '@/components/about-sophie'

export default {
  name: 'single-sale',
  components: {
    navbar,
    topbar,
    aboutSophie
  },
  data() {
    return {
      selected: ''
    }
  },
  computed: {
    ...mapState(['main', 'shop']),
    ...mapGetters(['productVariationByOption']),
    variableProduct() {
      if (this.shop.singleProduct.variations.length > 0) return true
      else return false
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART',
      'CLEAR_SINGLE_PRODUCT']),
    addToCart() {
      if (this.variableProduct === true) {
        const variation = this.productVariationByOption(this.selected)
        console.log(variation)
        this.ADD_TO_CART({
          product: this.shop.singleProduct.product,
          acf: this.main.single_garment.acf,
          variation: variation
        })
      } else {
        console.log('add to cart simple')
        this.ADD_TO_CART({ 
          product: this.shop.singleProduct.product,
          acf: this.main.single_garment.acf
        })
      }
    },
    purchase() {
      if (this.variableProduct && this.selected !== '') {
        this.addToCart()
        this.$router.push({name: 'checkout'})
      } else {
        window.alert('please choose an option first')
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

      &__image {
        width: 100%;
        height: 45vh;
        object-fit: contain;
        background: $grey;
        margin-bottom: 10px;
      }

      &__text {
        width: 50%;
        float: left;
        font-size: $font-size-s;
        line-height: $line-height-s;

        &--head {
          color: $grey-darker;
        }

        &--main {
          margin-bottom: $line-height-s;
        }

        @include screen-size('small') {
          width: 100%;
        }
      }

      &__payment {
        font-size: $font-size-s;
        line-height: $line-height-s;
        width: 50%;
        float: right;
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
