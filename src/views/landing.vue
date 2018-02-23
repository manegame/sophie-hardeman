<template>
    <div class="landing">
      <!-- - -->
      <!-- - -->
      <!-- - -->
      <!-- LEFT -->
      <div class="landing__column_left landing__column">
        <h1 class="landing__column_left__title">
          hardeman
        </h1>
        <h4 class="landing__column_left__subtitle">
          <span class="landing__column_left__subtitle__highlight">amsterdam based</span> <br/>
          <span class="landing__column_left__subtitle__highlight">denim brand</span>
        </h4>
        <section class="landing__column_left__social">
          <a class="landing__column_left__social__item socicon-facebook"
             href='https://www.facebook.com/hardemanonline/'></a>
          <a class="landing__column_left__social__item socicon-instagram"
             href='https://www.instagram.com/hardeman_'></a>
        </section>
        <ul v-if='main.collections.length > 0' class="landing__column_left__links">
          <router-link tag='li'
                       class="landing__column_left__links__item"
                       :to="{name: 'collection', params: { slug: emphasizedCollection, section: 'lookbook'}}">collections</router-link>
          <router-link tag='li'
                       class="landing__column_left__links__item"
                       :to="{name: 'hardeman tv', params: { slug: 'xxx'}}">hardeman tv</router-link>
          <router-link tag='li'
                       class="landing__column_left__links__item"
                       :to="{name: 'sale', params: { slug: 'xxx', item: 'xxx'}}">for sale</router-link>
          <router-link tag='li'
                       class="landing__column_left__links__item"
                       :to="{name: 'stockist', params: { slug: 'xxx'}}">stockists</router-link>
        </ul>
        <h3 class="landing__column_left__weather_head">what to wear?</h3>
          <weather />
          <calendar />
      </div>
      <!-- - -->
      <!-- - -->
      <!-- - -->
      <!-- MIDDLE -->
      <div class="landing__column_middle landing__column">
        <!-- BANNER -->
        <div v-if='main.banner.sizes'
             class="landing__column_middle__banner">
          <a :href="bannerLink">
            <img :src='main.banner.sizes["s-h-medium"]'/>
          </a>
        </div>
        <div class="landing__column_middle__sections">
          <!-- - -->
          <!-- - -->
          <!-- - -->
          <!-- Collections -->
          <section v-if='emphasizedCollection'
                   class="landing__column_middle__sections__collections">
            <router-link :to="{ name: 'collection', params: {slug: emphasizedCollection, section: 'lookbook'} }"
                          tag='h2'>
                          collections
                          </router-link>
            <ul>
              <router-link class="landing__column_middle__sections__collections__collection"
                           tag='li'
                           v-for='collection in main.collections'
                           :class="{'landing__column_middle__sections__collections__collection--emphasis': collection.acf.emphasis}"
                           :key='collection.id'
                           :to="{name: 'collection', params: { slug: collection.slug, section: 'lookbook'}}">
                             <span class='landing__column_middle__sections__collections__collection--season'>{{collection.acf.season}}</span>
                             <span class="landing__column_middle__sections__collections__collection--title">{{collection.title.rendered}}
                               <sup v-for='label in collection.acf.labels'>{{label.post_title}}</sup></span>
                          </router-link>
            </ul>
          </section>
          <!-- - -->
          <!-- - -->
          <!-- - -->
          <!-- About -->
          <section class="landing__column_middle__sections__about">
            <router-link :to='{name: "about", params: {slug: "xxx"}}'
                          tag='h2' >
                          about hardeman
                          </router-link>
            <ul class="duo">
              <router-link tag='li'
                           v-for='item in main.about'
                           :key='item.id'
                           :to='{name: "about", params: {slug: item.slug}}'>
                             <span>{{item.title.rendered}}<sup v-for='label in item.acf.labels'>{{label.post_title}}</sup></span>
                           </router-link>
            </ul>
          </section>
          <!-- - -->
          <!-- - -->
          <!-- - -->
          <!-- Hardeman TV -->
          <section class="landing__column_middle__sections__tv">
            <router-link :to='{name: "hardeman tv", params: {slug: "xxx"}}'
                          tag='h2' >
                          hardeman tv
                          </router-link>
            <ul>
              <router-link tag='li'
                           v-for='video in main.videos'
                           :key='video.id'
                           :to='{name: "hardeman tv", params: {slug: video.slug}}'>
                           <span>{{video.title.rendered}}<sup v-for='label in video.acf.labels'>{{label.post_title}}</sup></span>
              </router-link>
            </ul>
          </section>
          <!-- - -->
          <!-- - -->
          <!-- - -->
          <!-- For Sale -->
          <section class="landing__column_middle__sections__shop">
            <router-link :to='{name: "sale", params: {slug: "xxx"}}'
                          tag='h2' >
                          for sale
                          </router-link>
            <ul class="duo">
              <router-link tag='li'
                           v-for='garment in main.garment_categories'
                           :key='garment.id'
                           :to='{name: "sale", params: {slug: garment.slug}}'>
                           <span>{{garment.name}}<sup v-for='label in garment.acf.labels'>{{label.post_title}}</sup></span>
              </router-link>
            </ul>
          </section>
          <!-- - -->
          <!-- - -->
          <!-- - -->
          <!-- Stockists -->
          <section v-if='main.stockists'
                   class="landing__column_middle__sections__stockists">
            <h2>stockists</h2>
            <ul>
              <router-link tag='li'
                           v-for='s in main.stockists'
                           :key='s.id'
                           :to='{name: "stockists", params: {slug: s.slug}}'>
                           <span>{{s.title.rendered}}<sup v-for='label in s.acf.labels'>{{label.post_title}}</sup></span>
              </router-link>
            </ul>
          </section>
        </div>
      </div>
      <!-- - -->
      <!-- - -->
      <!-- - -->
      <!-- RIGHT -->
      <div class="landing__column_right landing__column">
        <h3 class="landing__column_right__head">
          diary
        </h3>
        <ul class="landing__column_right__list">
          <router-link v-for='entry in main.diary'
                       tag='li'
                       class='naturel'
                       :key='entry.id'
                       :to="{
                         name: 'diary',
                         params: { slug: entry.slug}
                       }">
                       {{entry.title.rendered}}
                       <sup v-for='label in entry.acf.label'>
                         {{label.post_title}}
                       </sup>
           </router-link>
        </ul>
        <div class="landing__column_right__toe">
          <p class="landing__column_right__toe__text">
            a personal collection of photographs by sophie hardeman
          </p>
        </div>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import weather from '@/components/weather'
import calendar from '@/components/calendar'

export default {
  name: 'landing',
  components: {
    weather,
    calendar
  },
  props: [],
  data() {
    return {
      bannerLink: ''
    }
  },
  computed: {
    ...mapState(['main']),
    emphasizedCollection() {
      if (this.main.collections.length > 0) return this.main.collections.filter(c => c.acf.emphasis)[0].slug
    }
  },
  updated: function() {
    this.$nextTick(function() {
      this.setBannerLink()
    })
  },
  methods: {
    setBannerLink() {
      if (this.main.banner !== undefined) {
        let url = this.main.banner.link
        // let collection = /s-h_collection/
        let vid = /s-h_videos/
        if (vid.test(url)) {
          this.bannerLink = url.replace(vid, 'hardeman-tv')
        }
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.landing {
  background: $white;
  width: $landing-width;
  margin: $margin-top auto 0;
  height: 100%;

  &__column {
    height: calc(100vh - #{$topbar-height + $margin-top});
  }

  &__column_left {
    position: relative;
    float: left;
    width: calc(3/14 * 100%);
    height: 100%;
    background: $grey;
    border-top: $border;
    border-left: $border;
    border-right: $border;
    text-align: center;
    padding: 10px 20px 40px;

    &__title {
      margin-bottom: 20px;
    }

    &__subtitle {
      font-weight: normal;
      margin-bottom: 20px;

      &__highlight {
        background: $yellow;
        padding: 2px 20px;
      }
    }

    &__social {
      margin: 0 10px 40px;
      font-size: 20px;
    }

    &__links {
      margin-bottom: 20px;

      &__item {
        font-size: $font-size-s;
        line-height: $line-height-s;
        border-bottom: none;
      }
    }

    &__weather_head {
      margin-top: $margin-top * 4;
      background: $grey;
      border-top: $border-light;
      border-bottom: $border-light;
    }
  }

  &__column_middle {
    width: calc(9/14 * 100%);
    height: 100%;
    padding: 0 20px;
    position: relative;
    overflow-x: hidden;
    float: left;
    display: flex;
    flex-flow: column wrap;

    &__banner {
      width: 100%;
      height: $banner-height;
      margin-bottom: $line-height * 2;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    &__sections {
      width: 100%;
      height: 0;
      flex-grow: 1;
      margin-bottom: $line-height * 2;
      display: flex;
      flex-flow: column wrap;

        &__collections,
        &__about,
        &__tv,
        &__shop,
        &__stockists {
          width: calc(50% - 20px);
          margin-right: 40px;
          margin-bottom: $line-height * 2;
        }

        &__collections {
          display: inline;
          &__collection {
            display: flex;

            &--emphasis {
                font-weight: bold;
            }

            &--season {
              display: inline-block;
              width: 70px;
            }
          }
        }
    }
  }

  &__column_right {
    position: relative;
    float: left;
    width: calc(2/14 * 100%);
    height: 100%;
    background: $grey;
    border-top: $border;
    border-left: $border;
    border-right: $border;
    text-align: center;
    color: $blue;
    padding: 10px 20px 40px;
    justify-content: space-between;

    &__list {
      margin-top: $margin-top;
      height: calc(100% - 100px);
      overflow-y: auto;
      @include hide-scroll;
    }

    &__toe {
      position: absolute;
      height: 100px;
      bottom: 0;
      left: 20px;
      background: $grey;
      width: calc(100% - 40px);
      font-size: $font-size-s;
      line-height: $line-height-s;

      &__text {
        color: $blue;
        padding: $line-height-s / 2 0;
        border-top: $border;
        border-bottom: $border;
      }
    }
  }
}
</style>
