<template>
  <div class='single_sale'>
    <navbar />
    <topbar />
    <div class="single_sale__main" v-if="shopify.product">
      <h5 class="single_sale__main__title">
        <span class="single_sale__main__title--season" v-html='shopify.product.title' />
        <span class='single_sale__main__title--title' v-html='shopify.product.title' />
      </h5>
      <div class="single_sale__main__left">

      <template v-if='hasSwiper'>
        <div  class='single_sale__main__left__slider'>
          <div class="swiper-container" id='swiper_container'>
            <div class="swiper-wrapper">
              <div  class="swiper-slide"
                    v-for='image in shopify.product.images'
                    :key='image.id'>
                <zoom-img :imageSource='image.src' />
              </div>
            </div>
            <div class="arrow-right swiper-button-next swiper-button-white" @click='nextButton'></div>
            <div class="arrow-left swiper-button-prev swiper-button-white" @click='prevButton'></div>
          </div>
        </div>
        <div class="swiper-container gallery-thumbs" id="gallery-thumbs">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
                  v-for='image in shopify.product.images'
                  :key='"bottom" + image.id'
                  :style='"background-image:url("+ image.src +")"' />
          </div>
          <!-- Add Arrows -->
          <div class="swiper-button-next swiper-button-next--thumb swiper-button-white"></div>
          <div class="swiper-button-prev swiper-button-prev--thumb swiper-button-white"></div>
        </div>
      </template>

      <div v-else class="single_sale__main__left__slider">
        <zoom-img :imageSource='shopify.product.images[0].src' />
      </div>
      <div class="single_sale__main__left__text">
          <template>
            <p class="single_sale__main__left__text--head">Description</p>
            <p class="single_sale__main__left__text--main"
              v-html='shopify.product.descriptionHtml' />
          </template>
        </div>
        <div class="single_sale__main__left__info">
          <template>
            <div class="single_sale__main__left__info__form">
              <fieldset class='form__item'>
                <legend v-html='"price"' />
                <span class='form__item__price' 
                      v-html='priceRange(shopify.product)'></span>
              </fieldset>
              <form class='form__item'
                    @submit.prevent=''>
                <fieldset v-if="optionsAvailable > 0">
                  <legend v-html='"options"' />
                  <select v-for='(option, index) in shopify.product.options'
                          :key='"option" + option.name'
                          v-model='selectedOptions[option.name]'>
                    <option value="" disabled>
                      Select a {{option.name}}
                    </option>
                    <option v-for='value in option.values'
                            :key='value.value'
                            :value='value.value'
                            v-html='value.value' />
                  </select>
                </fieldset>
                <!-- <input @click="ADD_WISHLIST(selectedVariant.id)" class='form__item' type='submit' value='Add to wishlist' /> -->
                <input @click="ADD_LINE_ITEMS({
                  id: shopify.checkout.id,
                  lineItemsToAdd: {
                    variantId: selectedVariant.id,
                    quantity: 1
                  }
                })" class='form__item' type='submit' value='Order' />
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
import { mapState, mapActions } from 'vuex'
import Swiper from 'swiper'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import zoomImg from '@/components/base/zoomImg'
import aboutSophie from '@/components/about-sophie'
import utils from '@/components/shopify/mixins/utils'

export default {
  name: 'shopify-single',
  mixins: [utils],
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
      selectedOptions: null,
      swiper: null,
      galleryThumbs: null
    }
  },
  updated() {
    this.$nextTick(() => {
      if (this.hasSwiper) this.initSwiper()
    })
  },
  created () {
    this.$store.watch((state, getters) => {
      return state.shopify.product
    }, (to, from) => {
      if (to !== null) {
        this.initSelection()
      }
    })
  },
  computed: {
    ...mapState(['main', 'shopify']),
    hasSwiper() {
      return this.shopify.product.images.length > 1
    },
    selectedVariant () {
      const variant = this.shopify.product.variants.find((variant) => {
        // On each variation, check all the selected options. They should all be included in the object
        let values = []
        for (let i = 0; i < variant.selectedOptions.length; i++) {
          const key = variant.selectedOptions[i].name
          const value = variant.selectedOptions[i].value
          if (this.selectedOptions[key] === value) {
            values.push(true)
          }
        }
        if (values.length === variant.selectedOptions.length) {
          return true
        } else {
          return false
        }
      })
      return variant
    },
    optionsAvailable () {
      return this.shopify.product.options.map((option) => {
        return option.name
      }).filter((name) => name !== 'Title').length
    }
  },
  methods: {
    ...mapActions(['ADD_LINE_ITEMS', 'ADD_WISHLIST']),
    nextButton() {
      this.swiper.slideNext()
    },
    prevButton() {
      this.swiper.slidePrev()
    },
    slideToIndex(index) {
      this.swiper.activeIndex = index
    },
    initSelection () {
      const newSelection = {}
      this.shopify.product.options.forEach((option) => {
        newSelection[option.name] = option.values[0].value
      })
      this.selectedOptions = newSelection
    },
    initSwiper() {
      this.swiper = new Swiper('#swiper_container', {
        preloadImages: true,
        updateOnImagesReady: true,
        touchRatio: 1,
        spaceBetween: 4,
        on: {
          slideChange: () => {
            this.swiper.navigation.update()
          }
        },
        navigation: {
          nextEl: '.swiper-button-next--top',
          prevEl: '.swiper-button-prev--top'
        }
      })
      this.galleryThumbs = new Swiper('.gallery-thumbs', {
        preloadImages: true,
        updateOnImagesReady: true,
        spaceBetween: 4,
        slidesPerView: 'auto',
        touchRatio: 0.4,
        slideToClickedSlide: true,
        centeredSlides: true,
        virtualTranslate: false,
        slidesOffsetAfter: this.swiperWidth,
        on: {
          slideChange: () => {
            this.galleryThumbs.navigation.update()
          }
        },
        navigation: {
          nextEl: '.swiper-button-next--thumb',
          prevEl: '.swiper-button-prev--thumb'
        }
      })
      if (this.swiper.controller) {
        this.swiper.controller.control = this.galleryThumbs
        this.galleryThumbs.controller.control = this.swiper
        this.swiper.navigation.update()
        this.galleryThumbs.navigation.update()
      }

      console.log(this.galleryThumbs)
    }
  },
  watch: {
    selectedOptions: {
      handler (to) {
        console.log(this)
        if (this.selectedVariant) {
          const index = this.shopify.product.images.map(img => { return img.id }).indexOf(this.selectedVariant.image.id)
          if (this.swiper) {
            this.slideToIndex(index)
          }
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

.form__item {
  min-height: $line-height * 2;
}

.swiper-container {
  height: 100%;
  width: 100%;

  &.gallery-thumbs {
    padding: 0;
    margin-bottom: 40px;

    .swiper-slide {
      background-color: $grey;
      object-fit: contain;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

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
      width: 100%;
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
        float: right;
        width: 100%;
      }

      &__slider {
        width: 100%;
        background-color: #e5e5e5;
        // margin-bottom: $line-height;
        margin-bottom: 4px;
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
          width: 100%;
        }
      }

      &__info {
        font-size: $font-size-s;
        line-height: $line-height-s;
        width: 50%;
        float: right;

        @include screen-size('small') {
          width: 100%;
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
