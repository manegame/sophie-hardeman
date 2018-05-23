<template>
  <div class="foot"
       :class='{"foot--expanded": expanded}'>
    <template v-if='main.impressum'>
      <a class="foot__link" 
         v-if='mobile'
         @click.prevent='toggleHeight'>Impressum</a>
      <router-link v-for='entry in main.impressum'
                   tag='a'
                   class="foot__link"
                   :key='entry.id'
                   :to='{name: "impressum", params: {slug: entry.slug}}'
                   v-html='entry.title.rendered' />
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'foot',
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    ...mapState(['main']),
    mobile() {
      if (window.innerWidth < 800) return true
    }
  },
  methods: {
    toggleHeight() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.foot {
  width: 100%;
  max-height: $footer-height;
  background: $grey;
  color: $blue;
  border-top: $border;
  text-align: center;
  position: absolute;
  bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  z-index: 999;
  transition: all .3s ease-out;
  -webkit-transition: all .3s ease-out;

  &--expanded {
    max-height: 1000px;
  }

  &__link {
    margin: 0 10px;
    font-size: $font-size-s;
    line-height: $footer-height;
    font-weight: normal;
    cursor: pointer;
  }

  @include screen-size('small') {
    white-space: initial;
    overflow-y: hidden;

    &__link {
      display: block;
    }
  }
}
</style>
