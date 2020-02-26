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
         <!-- ? Multiple -->
         <div class="single_sale__main__left">
          <template v-if='hasSwiper'>
            <div  class='single_sale__main__left__slider'>
              <div class="swiper-container" id='swiper_container'>
                <div class="swiper-wrapper">
                  <div  class="swiper-slide"
                        v-for='image in shop.singleProduct.product.acf.images'
                        :key='image.image.id'>
                    <zoom-img :imageSource='image.image.sizes.medium' />
                  </div>
                </div>
                <!-- Add Arrows -->
                <div class="arrow-right swiper-button-next swiper-button-white" @click='nextButton'></div>
                <div class="arrow-left swiper-button-prev swiper-button-white" @click='prevButton'></div>
              </div>
            </div>
          </template>
          <!-- ? Single -->
          <zoom-img v-else :imageSource='imageSource' />
          <!--  -->
          <div class="single_sale__main__left__text">
             <!-- DESCRIPTION -->
             <template v-if='shop.singleProduct.product.acf.details'>
               <p class="single_sale__main__left__text--head">Description</p>
               <p class="single_sale__main__left__text--main"
                  v-html='shop.singleProduct.product.acf.details' />
              </template>
            </div>
            <!-- OPTIONS -->
            <div class="single_sale__main__left__info">
              <!-- ALL PRODUCTS -->
              <template>
                <div class="single_sale__main__left__info__form">
                  <fieldset class='form__item'>
                    <legend v-html='"price"' />
                    <span class='form__item__price' 
                          v-html='shop[shop.currency.value] + price.price'></span>
                    <sup v-html='price.on_sale ? "sale!" : ""' />
                  </fieldset>
                  <form class='form__item'
                        @submit.prevent='purchase'>
                    <fieldset v-if='shop.singleProduct.product.attributes.length > 0'>
                      <legend v-html='"options"' />
                      <!-- ATTRIBUTES -->
                      <select v-for='attr in shop.singleProduct.product.attributes'
                              v-if='selectedAttributes[attr.name]'
                              :key='"attr" + attr.name'
                              v-model='selectedAttributes[attr.name].value'>
                        <option disabled 
                                :value='attr.name'
                                v-html='attr.name' />
                        <option v-for='option in attr.options'
                                :key='option'
                                :value='option'
                                v-html='option'/>
                      </select>
                    </fieldset>
                    <input class='form__item' type='submit' value='Order' />
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
import Swiper from 'swiper'
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
      selectedVariation: '',
      optionsSelected: false,
      swiper: null
    }
  },
  updated() {
    this.$nextTick(() => {
      if (this.hasSwiper) this.initSwiper()
    })
  },
  computed: {
    ...mapState(['main', 'shop']),
    ...mapGetters({ byAttr: 'singleProductVariationByAttributes' }),
    hasSwiper() {
      if (this.shop.singleProduct.product.acf.images) {
        return this.shop.singleProduct.product.acf.images.length > 1
      }
    },
    variableProduct() {
      if (this.shop.singleProduct.variations.length > 0) return true
      else return false
    },
    price () {
      if (this.selectedVariation === undefined || this.selectedVariation === '') {
        return {
          on_sale: this.shop.singleProduct.product.on_sale,
          price: this.shop.singleProduct.product.price
        }
      } else {
        return {
          on_sale: this.selectedVariation.on_sale,
          price: this.selectedVariation.price
        }
      }
      // return this.selectedVariation === undefined ? this.shop.singleProduct.product.price : this.selectedVariation.price
    },
    imageSource() {
      if (this.selectedVariation) {
        return this.selectedVariation.image.src
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
    nextButton() {
      this.swiper.slideNext()
    },
    prevButton() {
      this.swiper.slidePrev()
    },
    initSwiper() {
      this.swiper = new Swiper('#swiper_container', {
        preloadImages: true,
        updateOnImagesReady: true,
        touchRatio: 1,
        spaceBetween: 4,
        navigation: {
          nextEl: '.swiper-button-next--top',
          prevEl: '.swiper-button-prev--top'
        }
      })
      // this.swiper.navigation.update()
    },
    addToCart() {
      if (this.variableProduct === true) {
        console.log('add to cart variable')
        this.ADD_TO_CART({
          product: this.shop.singleProduct.product,
          variation: this.selectedVariation,
          attributes: this.selectedAttributes
        })
      } else {
        console.log('add to cart simple')
        this.ADD_TO_CART({
          product: this.shop.singleProduct.product,
          attributes: this.selectedAttributes
        })
      }
    },
    purchase() {
      console.log('purchase!!!')
      if (this.optionsSelected) {
        this.addToCart()
        this.$router.push({name: 'checkout'})
      } else {
        window.alert('please pick an option first!')
      }
    }
  },
  destroyed() {
    this.selectedAttributes = {}
    this.selectedVariation = ''
    this.CLEAR_SINGLE_PRODUCT()
  },
  watch: {
    'shop.singleProduct.product.attributes'(val) {
      console.log('has attributes?', val)
      if (val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          let valueToSet = {
            id: val[i].id,
            key: val[i].name,
            value: val[i].name
          }
          this.$set(this.selectedAttributes, val[i].name, valueToSet)
        }
      } else {
        this.$set(this.selectedAttributes, null, null)
      }
    },
    selectedAttributes: {
      handler(val) {
        if (val.null !== null) {
          this.selectedVariation = this.byAttr(val)
          // Loop over all attributes to compare them with variable products
          let allOptions = []
          // Check if the user has selected an option
          Object.keys(val).forEach(key => {
            allOptions.push(this.selectedAttributes[key].key !== this.selectedAttributes[key].value)
          })
          // check if all fields passed the test and return to value
          allOptions.every(option => option === true) ? this.optionsSelected = true : this.optionsSelected = false
        } else {
          this.optionsSelected = true
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';
@import '../style/_forms.scss';
@import '../style/vendor/swiper.css';
@include swiper;

.swiper-container {
  height: 100%;
  width: 100%;

  .swiper-slide {
    height: 100% !important;
  }

  .swiper-button-next {
    width: 20px;
    height: 20px;
    background-size: contain;
    right: 6px;
    background-image: url('data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93QXJ0Ym9hcmQgMTwvdGl0bGU+PHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjAgMCAwIDEwMCAxMDAgNTAgMCAwIi8+PC9zdmc+')
  }

  .swiper-button-prev {
    width: 20px;
    height: 20px;
    background-size: contain;
    left: 6px;
    background-image: url('data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93QXJ0Ym9hcmQgMSBjb3B5PC90aXRsZT48cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTAwIDAgMTAwIDEwMCAwIDUwIDEwMCAwIi8+PC9zdmc+')
  }

  .swiper-button-disabled {
    opacity: 0;
  }
}


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

      &__slider {
        width: 100%;
        height: 400px;
        margin-bottom: $line-height;

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

      &__info {
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
