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
                 id='swiper_container'>
              <!-- SWIPER -->
              <template v-if='main.single.garments.length > 0'>
                <div class="swiper-container gallery-top">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide"
                         v-for='g in main.single.garments'
                         :key='"gtop" + g.id'
                         :style='"background-image:url("+ g.acf.image.sizes["s-h-large"] +")"' />
                  </div>
                  <!-- Add Arrows -->
                  <div class="swiper-button-next swiper-button-next--top swiper-button-white"></div>
                  <div class="swiper-button-prev swiper-button-prev--top swiper-button-white"></div>
                </div>
                <div class="swiper-container gallery-thumbs">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide"
                         v-for='g in main.single.garments'
                         :key='"gbottom" + g.id'
                         :style='"background-image:url("+ g.acf.image.sizes["s-h-small"] +")"' />
                  </div>
                  <!-- Add Arrows -->
                  <div class="swiper-button-next swiper-button-next--thumb swiper-button-white"></div>
                  <div class="swiper-button-prev swiper-button-prev--thumb swiper-button-white"></div>
                </div>
              </template>
              <!-- END SWIPER -->
            </div>
            <div class="collection__main__lookbook__info">
              <!-- TEXT -->
              <h5 class="collection__main__lookbook__info__title">
                {{main.single.acf.season}} {{main.single.title.rendered}}
              </h5>
              <p class="collection__main__lookbook__info__text"
                 v-html='main.single.acf.info' />
                 <section v-if='main.single.acf.items_for_sale'
                          class="collection__main__lookbook__info__for_sale">
                   <!-- <p>The following items are for sale:</p>
                   <ul class="collection__main__lookbook__info__for_sale">
                     <router-link class="collection__main__lookbook__info__for_sale__item"
                                  v-for='c in main.single.acf.items_for_sale'
                                  tag='li'
                                  :key='c.id'
                                  :to='{name: "sale", params: {slug: c.slug}}'
                                  v-html='c.name' /> -->
                   </ul>
                 </section>
            </div>
      </div>
      <!-- VIDEO -->
      <div v-if='$route.params.section === "video"'
           class="collection__main__video">
        <div v-if='main.single.videos.length > 0'
             class="video-embed"
             v-html='embedCode' />
      </div>
      <!-- CAMPAIGN -->
      <div v-if='$route.params.section === "campaign"'>
        <div class="collection__main__campaign">
          <div class="collection__main__campaign__left">
            <template v-if='main.single.acf'>
              <img class="collection__main__campaign__left__image"
                   v-if='main.single.acf.campaign_images.length > 0'
                   v-for='item in main.single.acf.campaign_images'
                   :key='"img-"+item.id'
                   :src='item.image.sizes["s-h-large"]' />
            </template>
          </div>
          <div class="collection__main__campaign__right">
            <h5 class="collection__main__campaign__right--title">
              <span v-html='main.single.acf.season' />
              <span v-html='main.single.title.rendered' />
            </h5>
            <p v-html='main.single.acf.campaign_description' />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import embed from 'embed-video'
import Swiper from 'swiper'

export default {
  name: 'collection',
  head: {
    title: () => {
      return {
        inner: 'Collections'
      }
    },
    meta: () => {
      return [
        { name: 'title', content: 'Collections' }
      ]
    }
  },
  components: {
    navbar,
    topbar
  },
  data() {
    return {
      initiated: {
        top: false,
        thumb: false
      },
      galleryTop: '',
      galleryThumbs: ''
    }
  },
  updated() {
    this.$nextTick(() => {
      if (this.$route.params.section === 'lookbook') {
        this.swipers()
      }
    })
  },
  methods: {
    swipers() {
      this.galleryTop = new Swiper('.gallery-top', {
        preloadImages: true,
        updateOnImagesReady: true,
        touchRatio: 0,
        spaceBetween: 4,
        on: {
          slideChange: () => {
            this.galleryTop.navigation.update()
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
        centeredSlides: false,
        virtualTranslate: false,
        slidesOffsetAfter: this.swiperWidth,
        on: {
          slideChange: () => {
            this.galleryThumbs.navigation.update()
          },
          reachEnd: () => {
            console.log('last slide')
          }
        },
        navigation: {
          nextEl: '.swiper-button-next--thumb',
          prevEl: '.swiper-button-prev--thumb'
        }
      })
      if (this.galleryTop.controller) {
        this.galleryTop.controller.control = this.galleryThumbs
        this.galleryThumbs.controller.control = this.galleryTop
        this.galleryTop.navigation.update()
        this.galleryThumbs.navigation.update()
      }
    }
  },
  computed: {
    ...mapState(['main']),
    embedCode() {
      return embed(this.main.single.videos[0].acf.video, {query: {portrait: 0, color: '00f', quality: '1080p'}, attr: {class: 'inner'}})
    },
    swiperWidth() {
      let el = document.getElementById('swiper_container')
      return el.clientWidth * 0.75
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
    position: relative;
    clear: none;

    @include screen-size('small') {
      overflow-y: scroll;
    }

    &__lookbook {
      height: 100%;
      display: inline-block;

      @include screen-size('small') {
        height: auto;
        width: 100%;
      }

      &__carousel {
        height: 100%;
        width: $left-col-width;
        float: left;

        @include screen-size('medium') {
          width: 300px;
        }

        @include screen-size('small') {
          width: 100%;
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

      &__info {
        @include right-col;

        .bottom {
          position: absolute;
          bottom: 7px;

          @include screen-size('small') {
            position: relative;
          }
        }

        &__title,
        &__text {
          color: $black;
        }

        &__text {
          max-width: $left-col-width;
        }

        &__for_sale {
          @include small-list;
        }
      }
    }

    &__video {
      position: relative;
      width: calc(100% - 20px);
      height: auto;

      .video-embed {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
      }
    }

    &__campaign {
      position: relative;
      height: calc(100vh);

      &__left {
        position: relative;
        float: left;
        width: calc(100% - #{$left-col-width * 1.5});

        &__image {
          width: 100%;
          max-height: 75vh;
          object-fit: contain;
          object-position: left;
          margin-bottom: 20px;
        }
      }

      &__right {
        width: $left-col-width;
        height: calc(100% - #{$footer-height * 2 + $margin-top});
        display: block;
        position: fixed;
        left: calc(100% - #{$left-col-width * 1.5});
        padding: 0 20px 0 25px;
        font-size: $font-size-s;
        line-height: $line-height-s;

        &--title {
          margin-bottom: $line-height;
        }

        .bottom {
          position: absolute;
          bottom: $line-height;
        }
      }
    }
  }
}

iframe.inner,
.inner,
iframe,
object,
embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  background-position: top;
}
.gallery-top {
  height: $left-col-width * 1.5;
  width: 100%;

  @include screen-size('medium') {
    height: 450px;
  }

  @include screen-size('small') {
    height: 450px;
    width: 300px;
  }

  .swiper-slide {
    background-size: cover;
    background-color: $white;
    background-repeat: no-repeat;
  }
}
.gallery-thumbs {
  height: 140px;
  box-sizing: border-box;
  padding: 4px 0 0;

  @include screen-size ('medium') {
    height: 120px;
  }

  @include screen-size('small') {
    height: 120px;
    width: 300px;
  }
}
.gallery-thumbs .swiper-slide {
  width: calc(25% - 2px);
  height: 100%;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
</style>
