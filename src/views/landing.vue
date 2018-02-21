<template>
    <div class="landing">
      <!-- - -->
      <!-- - -->
      <!-- - -->
      <!-- LEFT -->
      <div class="landing__column_left">
        <h1 class="landing__column_left__title">
          hardeman
        </h1>
        <h4 class="landing__column_left__subtitle">
          amsterdam based <br/>
          denim brand
        </h4>
        <a href='facebook'>FB</a>
        <a href='instagram'>INSTA</a>
        <ul class="landing__column_left__links">
          <router-link :to="{name: 'collection',params: { slug: emphasizedCollection, section: 'lookbook'}}">collections</router-link>
        </ul>
        <h3 class="landing__column_left__weather_head">what to wear?</h3>
          <weather />
        <h4>where to go?</h4>
          <calendar />
      </div>
      <!-- - -->
      <!-- - -->
      <!-- - -->
      <!-- MIDDLE -->
      <div class="landing__column_middle">
        <div class="landing__column_middle__banner">
          <img :src='main.banner.acf.banner.sizes["s-h-medium"]'/>
        </div>
        <div class="landing__column_middle__sections">
          <!-- - -->
          <!-- - -->
          <!-- - -->
          <!-- Collections -->
          <section class="landing__column_middle__sections__collections">
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
          <section class="landing__column_middle__sections__stockists">
            <h2>stockists</h2>
            <ul>
              <router-link tag='li'
                           v-for='stockist in main.stockists.acf.stockists'
                           :key='stockist.id'
                           :to='{name: "stockists"}'>
                           <span>{{stockist.stockist}}<sup v-for='label in stockist.labels'>{{label.post_title}}</sup></span>
              </router-link>
            </ul>
          </section>
        </div>
      </div>
      <!-- - -->
      <!-- - -->
      <!-- - -->
      <!-- RIGHT -->
      <div class="landing__column_right">
        <h3 class="landing__column_right__head">
          diary
        </h3>
        <ul>
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
        <p class="landing__column_right__toe">
          a personal collection of photographies by sophie hardeman
        </p>
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
      emphasizedCollection: 'slug'
    }
  },
  computed: {
    ...mapState(['main'])
  },
  updated: function() {
    this.$nextTick(function() {
      this.emphasizedCollection = this.setSlug()
    })
  },
  methods: {
    setSlug() {
      return this.main.collections.filter(c => c.acf.emphasis)[0].slug
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
  display: grid;
  width: $landing-width;
  margin: $margin-top auto 0;
  height: 100%;
  grid-template: 'left main right'
                 / 3fr 9fr 2fr;
  grid-gap: 20px;

  &__column_left {
    grid-column: 'left';
    background: $grey;
    border-top: $border;
    border-left: $border;
    border-right: $border;
    text-align: center;
    padding: 10px 20px 40px;

    &__weather_head {
      background: $grey;
      border-top: $border-light;
      border-bottom: $border-light;
    }
  }

  &__column_middle {
    grid-area: 'main';
    display: flex;
    flex-flow: column;

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
    grid-area: 'right';
    background: $grey;
    border-top: $border;
    border-left: $border;
    border-right: $border;
    text-align: center;
    color: $blue;
    padding: 10px 20px 40px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    &__toe {
      font-size: $font-size-s;
      line-height: $line-height-s;
      padding: $line-height-s / 2 0;
      border-top: $border;
      border-bottom: $border;
    }
  }
}
</style>
