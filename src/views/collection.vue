<template>
  <div class='collection'>
    <div class="collection__navigation">
      <router-link :to="{ name: 'landing'}"
                   tag='h1'>
                   hardeman
                 </router-link>
      <p>
        collections
      </p>
      <ul>
        <template v-for='collection in main.collections'>
          <router-link class="collection__navigation__item"
                       :class='{"collection__navigation__item--emphasis": main.single.slug === collection.slug}'
                       tag='li'
                       :to='{name: "collection", params: {slug: collection.slug}}'>
                       <span class='collection__navigation__item--ss'>{{collection.acf.season}}</span>
                       <span class='collection__navigation__item--tt'>{{collection.title.rendered}}</span>
                       </router-link>
                       <ul class="collection__navigation__item__sub"
                           :class='{"collection__navigation__item__sub--show": main.single.slug === collection.slug}'>
                         <li class="collection__navigation__item__sub__item">
                           lookbook
                         </li>
                         <li class="collection__navigation__item__sub__item">
                           video
                         </li>
                         <li class="collection__navigation__item__sub__item">
                           campaign
                         </li>
                       </ul>
        </template>
      </ul>
    </div>
    <div class="collection__main">
      <div class="collection__main__top_bar">
        <router-link class="collection__main__top_bar__back"
                     :to="{ name: 'landing'}"><- back to overview</router-link>
        <span class="collection__main__top_bar__posted">posted {{main.single.date | dotted}}</span>
        <a class="collection__main__top_bar__recommend"
          href='mailto:?subject=Hey! Check out SOPHIE HARDEMAN SUPER NICE COLLECTION&body=Wooowww'>mail to a friend</a>
        <a class="collection__main__top_bar__reply"
           href='mailto:sophie@hardemanonline.com'>reply</a>
        <a class="collection__main__top_bar__print"
           @click.prevent='printPage'>print</a>
      </div>
      <h1 class="collection__main__title">
        {{main.single.acf.season}} {{main.single.title.rendered}}
      </h1>
      <div class="collection__main__lookbook">
        <div class="collection__main__lookbook__look" v-for='item in main.single.garments'>
          <img class="collection__main__lookbook__look__image"
               :src='item.acf.image.sizes["s-h-medium"]'/>
          <div class="collection__main__lookbook__look__meta">
            {{main.single.acf.season}}
            {{item.title.rendered}}
            <span v-if='item.acf.sale.for_sale'>sale</span>
            <del v-else>sale</del>
          </div>
        </div>
      </div>
      <div class="collection__main__info">
        <p v-html='main.single.acf.info' />
      </div>
      <div class="collection__main__video"
           v-for='video in main.single.videos'
           v-html='video.acf.video'>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'collection',
  props: [],
  computed: {
    ...mapState(['main'])
  },
  methods: {
    printPage() {
      window.print()
    }
  },
  updated: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been re-rendered
    })
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.collection {
  height: 100%;
  margin-top: $margin-top;
  display: grid;
  grid-template: 'left main'
                 / 3fr 11fr;
  grid-gap: 20px;
  overflow: hidden;

  &__navigation {
    grid-template: left;
    padding-left: 20px;

    &__item {
      display: flex;

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
        }

        &--show {
          display: block;
        }
      }
    }
  }

  &__main {
    height: auto;
    overflow: scroll;
    padding: 0 20px;
    @include hide-scroll;

    &__top_bar {
      height: 30px;
      font-size: $font-size-s;
      line-height: 20px;
      display: flex;
      align-items: center;
      text-align: left;
      border-bottom: $border;

      &__back {
        flex-grow: 10;
        color: $black;
        font-weight: bold;
        text-decoration: none;
      }

      &__posted,
      &__recommend,
      &__reply {
        color: $black;
        text-decoration: none;
        background: $white;
        padding: 0 8px;
      }

      &__recommend,
      &__reply {
        margin: 0 2px;
        border: $border;
        &:hover {
          background: $yellow;
        }
      }

      &__print {
        padding-left: 8px;
        color: $blue;
        text-decoration: underline;
      }
    }

    &__title {
      color: $black;
    }

    &__lookbook {
      display: flex;

      &__look {
        margin: 20px 20px 0 0;
        width: 350px;
        height: 350px;

        &__image {
          border-radius: 20px 20px 0 0;
          width: 100%;
          height: 80%;
          object-fit: cover;
        }

        &__meta {
          height: 20%;
          width: 100%;
          border-radius: 0 0 20px 20px;
          border: $border;
          background: $white;
        }
      }
    }

    &__info {
      padding-top: $margin-top;
    }

    &__video {
      padding-top: $margin-top;
    }
  }
}
</style>
