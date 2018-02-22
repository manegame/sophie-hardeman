<template>
  <div class='collection'>
    <navbar />
    <topbar />
    <div class="collection__main">
      <!-- LOOKBOOK -->
      <div  v-if='$route.params.section === "lookbook"'
            class="collection__main__lookbook">
            <!-- CAROUSEL -->
            <div class="collection__main__lookbook__carousel"
                 v-if='main.single.garments.length > 1'>
              <!-- SWIPER -->
              <div class="swiper-container gallery-top">
                <div class="swiper-wrapper">
                  <div class="swiper-slide"
                       v-for='g in main.single.garments'
                       :style='"background-image:url("+ g.acf.image.sizes["s-h-large"] +")"' />
                </div>
                <!-- Add Arrows -->
                <div class="swiper-button-next swiper-button-white"></div>
                <div class="swiper-button-prev swiper-button-white"></div>
              </div>
              <div class="swiper-container gallery-thumbs">
                <div class="swiper-wrapper">
                  <div class="swiper-slide"
                       v-for='g in main.single.garments'
                       :style='"background-image:url("+ g.acf.image.sizes["s-h-small"] +")"' />
                </div>
              </div>
              <!-- END SWIPER -->
            </div>
            <div class="collection__main__lookbook__info">
              <!-- TEXT -->
              <h1>
                {{main.single.acf.season}} {{main.single.title.rendered}}
              </h1>
              <p v-html='main.single.acf.info' />
              <p>
                The following items are for sale:
              </p>
            </div>
      </div>
      <!-- VIDEO -->
      <div v-if='$route.params.section === "video"'
           class="collection__main__video"
           v-for='video in main.single.videos'
           v-html='video.acf.video'>
      </div>
      <!-- CAMPAIGN -->
      <div v-if='$route.params.section === "campaign"'>
        <img v-for='item in this.main.single.acf.campaign[0].images'
             :src='item.image.sizes["s-h-large"]' />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import Swiper from 'swiper'

export default {
  name: 'collection',
  components: {
    navbar,
    topbar
  },
  data() {
    return {
      galleryTop: '',
      galleryThumbs: ''
    }
  },
  updated() {
    this.$nextTick(() => {
      this.swipers()
    })
  },
  methods: {
    swipers() {
      if (this.galleryTop === '') {
        this.galleryTop = new Swiper('.gallery-top', {
          spaceBetween: 4,
          preloadImages: true,
          updateOnImagesReady: true,
          observer: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            init: () => {
              console.log('INITIALIZED')
            }
          }
        })
        this.galleryThumbs = new Swiper('.gallery-thumbs', {
          spaceBetween: 4,
          preloadImages: true,
          updateOnImagesReady: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true,
          on: {
            init: () => {
              console.log('initialized')
            }
          }
        })
        this.galleryTop.controller.control = this.galleryThumbs
        this.galleryThumbs.controller.control = this.galleryTop
        console.log('swipers', this)
        this.galleryTop.on('imagesReady', () => {
          console.log('now')
        })
      }
    }
  },
  computed: {
    ...mapState(['main'])
  },
  watch: {
    'main.single'() {
      console.log('watching single state')
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/vendor/swiper.css';
@import '../style/_variables.scss';

.collection {
@include single;

  &__main {
    height: calc(100vh - 60px);
    &__title {
      color: $black;
    }

    &__lookbook {
      height: 100%;
      display: flex;
      flex-flow: row nowrap;

      &__carousel {
        height: 100%;
        width: 350px;
        flex-basis: 800px;

        .swiper-button-next {
          width: 20px;
          height: 20px;
          background-size: contain;
          right: 4px;
          background-image: url('data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93QXJ0Ym9hcmQgMTwvdGl0bGU+PHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjAgMCAwIDEwMCAxMDAgNTAgMCAwIi8+PC9zdmc+')
        }

        .swiper-button-prev {
          width: 20px;
          height: 20px;
          background-size: contain;
          left: 4px;
          background-image: url('data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93QXJ0Ym9hcmQgMSBjb3B5PC90aXRsZT48cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTAwIDAgMTAwIDEwMCAwIDUwIDEwMCAwIi8+PC9zdmc+')
        }

        .swiper-button-disabled {
          opacity: 0;
        }
      }
    }

    &__video {
      padding-top: $margin-top;
    }
  }
}


.swiper-container {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}
.swiper-slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.gallery-top {
  height: 80%;
  width: 100%;

  .swiper-slide {
    background-size: contain;
    background-color: $white;
    background-repeat: no-repeat;
  }
}
.gallery-thumbs {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 4px;
}
.gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
</style>
