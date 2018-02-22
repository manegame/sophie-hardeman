<template>
  <div class="navbar">
    <router-link class='navbar__title'
                 :to="{ name: 'landing'}"
                 tag='h1'>
                 hardeman
               </router-link>
    <!-- COLLECTIONS -->
    <template v-if='$route.name === "collection"'>
      <p>collections </p>
      <ul class="nav">
        <template v-for='collection in main.collections'>
          <router-link class="nav__item"
                       :class='{"nav__item--emphasis": main.single.slug === collection.slug}'
                       tag='li'
                       :to='{name: "collection", params: {slug: collection.slug, section: "lookbook"}}'>
                       <span class='nav__item--ss'>{{collection.acf.season}}</span>
                       <span class='nav__item--tt'>{{collection.title.rendered}}<sup v-for='label in collection.acf.labels'>{{label.post_title}}</sup></span>
                       </router-link>
                       <ul class="nav__item__sub"
                           :class='{"nav__item__sub--show": main.single.slug === collection.slug}'>
                           <router-link tag='li'
                                        class="nav__item__sub__item nav__item__sub__item--show"
                                        :class="{'nav__item__sub__item--active': $route.params.section === 'lookbook'}"
                                        :to="{ name: 'collection', params: {slug: collection.slug, section: 'lookbook'} }"
                                        v-html='"lookbook"' />
                           <router-link tag='li'
                                        v-if='main.single.videos'
                                        class="nav__item__sub__item"
                                        :class="{
                                                  'nav__item__sub__item--active': $route.params.section === 'video',
                                                  'nav__item__sub__item--show': main.single.videos.length > 0
                                                 }"
                                        :to="{ name: 'collection', params: {slug: collection.slug, section: 'video'} }"
                                        v-html='"video"' />
                           <router-link tag='li'
                                        v-if='main.single.acf.campaign_images'
                                        class="nav__item__sub__item"
                                        :class="{
                                                  'nav__item__sub__item--active': $route.params.section === 'campaign',
                                                  'nav__item__sub__item--show': main.single.acf.campaign_description !== ''
                                                }"
                                        :to="{ name: 'collection', params: {slug: collection.slug, section: 'campaign'} }"
                                        v-html='"campaign"' />
                       </ul>
        </template>
      </ul>
    </template>
    <!-- ABOUT -->
    <template v-if='$route.name === "about"'>
      <p>about </p>
      <ul class="nav">
        <template v-for='page in main.about'>
          <router-link class="nav__item"
                       :class='{"nav__item--emphasis": $route.params.slug === page.slug}'
                       tag='li'
                       :to='{name: "about", params: {slug: page.slug}}'>
                       {{page.title.rendered}}<sup v-for='label in page.acf.labels'>{{label.post_title}}</sup>
                       </router-link>
        </template>
      </ul>
    </template>
    <!-- SALE -->
    <template v-if='$route.name === "sale" || $route.name === "single sale"'>
      <p>for sale </p>
      <ul class="nav">
        <template v-for='category in main.garment_categories'>
          <router-link class="nav__item"
                       :class='{"nav__item--emphasis": $route.params.slug === category.slug}'
                       tag='li'
                       :to='{name: "sale", params: {slug: category.slug}}'>
                       {{category.name}}<sup v-for='label in category.acf.labels'>{{label.post_title}}</sup>
                       </router-link>
        </template>
      </ul>
    </template>
    <!-- HARDEMAN TV -->
    <template v-if='$route.name === "hardeman tv"'>
      <p>hardeman tv </p>
      <ul class="nav">
        <template v-for='video in main.videos'>
          <router-link class="nav__item"
                       :class='{"nav__item--emphasis": $route.params.slug === video.slug}'
                       tag='li'
                       :to='{name: "hardeman tv", params: {slug: video.slug}}'>
                       {{video.title.rendered}}<sup v-for='label in video.acf.labels'>{{label.post_title}}</sup>
                       </router-link>
        </template>
      </ul>
    </template>
    <!-- DIARY -->
    <template v-if='$route.name === "diary"'>
      <p>diary</p>
      <ul class="nav">
        <template v-for='entry in main.diary'>
          <router-link class="nav__item"
                       :class='{"nav__item--emphasis": $route.params.slug === entry.slug}'
                       tag='li'
                       :to='{name: "diary", params: {slug: entry.slug}}'>
                       {{entry.title.rendered}} <sup v-for='label in entry.acf.labels'>{{label.post_title}}</sup>
                       </router-link>
        </template>
      </ul>
    </template>
    <!-- STOCKISTS -->
    <template v-if='$route.name === "stockists"'>
      <p>stockists</p>
      <ul class="nav">
        <template v-for='s in main.stockists'>
          <router-link class="nav__item"
                       :class='{"nav__item--emphasis": $route.params.slug === s.slug}'
                       tag='li'
                       :to='{name: "stockists", params: {slug: s.slug}}'>
                       {{s.title.rendered}} <sup v-for='label in s.acf.labels'>{{label.post_title}}</sup>
                       </router-link>
        </template>
      </ul>
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'navbar',
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.navbar {
  grid-template: left;
  padding-left: 20px;

  &__title {
    margin-bottom: 20px;
  }

  .nav {
    padding-top: 20px;
    &__item {
      display: flex;
      border-bottom: none;

      &--emphasis {
        font-weight: bold;
      }

      &--ss {
        width: 80px;
        flex-basis: 80px;
        flex-shrink: 1;
      }

      &--tt {
        flex-basis: 200px;
        flex-shrink: 2;
      }
      &__sub {
        display: none;

        &__item {
          padding-left: 80px;
          border-bottom: none;
          color: $black;
          display: none;

          &--show {
            display: initial;
          }

          &--active {
            text-decoration: underline;
          }
        }

        &--show {
          display: block;
        }
      }
    }
  }
}
</style>
