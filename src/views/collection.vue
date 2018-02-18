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
      <h1 class="collection__main__title">
        {{main.single.acf.season}} {{main.single.title.rendered}}
      </h1>
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
  updated: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been re-rendered
    })
  },
  methods: {}
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

  &__navigation {
    grid-template: left;
    padding-left: 20px;

    &__item {
      display: flex;

      &--ss {
        width: 80px;
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
    &__title {
      color: $black;
    }
  }
}
</style>
