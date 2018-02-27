<template>
  <div class="navbar">
    <router-link class='navbar__title'
                 :to="{ name: 'landing'}"
                 tag='h1'>
                 hardeman
               </router-link>
    <!-- COLLECTIONS -->
    <template v-if='$route.name === "collection"'>
      <p class='navbar__head'>collections </p>
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
      <p class='navbar__head'>about </p>
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
      <p class='navbar__head'>for sale </p>
      <ul class="nav">
        <router-link class="nav__item"
                     :class='{"nav__item--emphasis": $route.params.slug === "all"}'
                     tag='li'
                     :to='{name: "sale", params: {slug: "all"}}'>
                     all
                     </router-link>
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
      <p class='navbar__head'>hardeman tv </p>
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
      <p class='navbar__head'>diary</p>
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
    <!-- COMMUNITY -->
    <template v-if='$route.name === "community"'>
      <p class='navbar__head'>community</p>
      <ul class="nav">
        <template v-for='entry in main.community'>
          <router-link class="nav__item"
                       :class='{"nav__item--emphasis": $route.params.slug === entry.slug}'
                       tag='li'
                       :to='{name: "community", params: {slug: entry.slug}}'>
                       {{entry.title.rendered}} <sup v-for='label in entry.acf.labels'>{{label.post_title}}</sup>
                       </router-link>
        </template>
      </ul>
    </template>
    <!-- STOCKISTS -->
    <template v-if='$route.name === "stockists"'>
      <p class='navbar__head'>stockists</p>
      <ul class="nav">
        <template v-for='s in main.stockists'>
          <router-link class="nav__item"
                       :class='{"nav__item--emphasis": $route.params.slug === s.slug}'
                       tag='li'
                       :key='s.id'
                       :to='{name: "stockists", params: {slug: s.slug}}'>
                       {{s.title.rendered}} <sup v-for='label in s.acf.labels'>{{label.post_title}}</sup>
                       </router-link>
        </template>
      </ul>
    </template>
    <!-- EVENTS -->
    <template v-if='$route.name === "events"'>
      <p class='navbar__head'>events</p>
      <ul class="nav">
        <template v-for='e in main.events'>
          <router-link class="nav__item"
                       :class='{"nav__item--emphasis": $route.params.slug === e.slug}'
                       tag='li'
                       :key='e.id'
                       :to='{name: "events", params: {slug: e.slug}}'>
                       {{e.title.rendered}} <sup v-for='label in e.acf.labels'>{{label.post_title}}</sup>
                       </router-link>
        </template>
      </ul>
    </template>
    <!-- IMPRESSUM -->
    <template v-if='$route.name === "impressum"'>
      <!-- <p class='navbar__head'>impressum</p> -->
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
  width: calc(3/14 * 100%);
  position: relative;
  float: left;
  padding-left: 20px;

  &__head {
    color: $blue;
  }

  &__title {
    margin-bottom: 6px;
  }

  .nav {
    padding-top: 20px;
    color: $blue;

    &__item {
      border-bottom: none;
      height: auto;

      &--emphasis {
        font-weight: bold;
      }

      &--ss {
        display: block;
        position: relative;
        float: left;
        height: 100%;
        width: 60px;
      }

      &--tt {
        display: block;
        position: relative;
        float: left;
        width: calc(100% - 60px);
      }
      &__sub {
        display: none;

        &__item {
          padding-left: 60px;
          border-bottom: none;
          color: $black;
          display: none;

          &--show {
            display: block;
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
