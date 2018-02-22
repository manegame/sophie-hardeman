<template>
  <section>
    <p class="suggestions" v-if='!not'>
      suggestions for you:
      <ul class="suggestions__links">
        <router-link class="suggestions__links__item"
                     tag='li'
                     :to='{name: "collection", params: {slug: "xxx"}}'
                     v-html='"collections"' />
        <router-link class="suggestions__links__item"
                     tag='li'
                     :to='{name: "about", params: {slug: "xxx"}}'
                     v-html='"about hardeman"' />
        <router-link class="suggestions__links__item"
                     tag='li'
                     :to='{name: "hardeman tv", params: {slug: "xxx"}}'
                     v-html='"hardeman tv"' />
        <router-link class="suggestions__links__item"
                     tag='li'
                     :to='{name: "sale", params: {slug: "xxx"}}'
                     v-html='"for sale"' />
        <router-link class="suggestions__links__item"
                     tag='li'
                     :to='{name: "stockists", params: {slug: "xxx"}}'
                     v-html='"stockists"' />
      </ul>
    </p>
    <ul class="suggestions__not">
      <li class="suggestions__not__item">
        <span class="suggestions__not__item__span">do NOT contact me with unsollicited offers</span>
      </li>
    </ul>
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'suggestions',
  props: {
    not: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.suggestions {
  padding: 4px 6px;
  width: $left-col-width;
  border: $border-light;
  margin-bottom: 40px;

  &__not {
    @include small-list;
    &__item {
      &__span {
        margin-top: 40px;
        color: $black !important;
      }
    }
  }

  &__links {
    @include small-list;
  }
}
</style>
