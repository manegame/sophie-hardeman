<template>
  <div class='community'>
    <navbar />
    <topbar />
    <div class="community__main"
         id='mainContent'
         @scroll='checkEls'
         v-if='main.community.length > 0'>
      <div  v-for='entry in main.community'
            class="community__main__item scrollItem"
            :key='"img"+entry.id'
            :id='entry.slug'
            :ref='entry.id'>
        <load-img class="community__main__item__image"
                  :item='entry'/>
        <p  class="community__main__item__title"
            :key='"p" + entry.id'
            v-html='entry.title.rendered' />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import loadImg from '@/components/base/load-img'
import dynamicScroll from '@/components/mixins/dynamicScroll'

export default {
  name: 'community',
  head: {
    title: () => {
      return {
        inner: 'Community'
      }
    },
    meta: () => {
      return [
        { name: 'title', content: 'Community' }
      ]
    }
  },
  mixins: [dynamicScroll],
  components: {
    navbar,
    topbar,
    loadImg
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

.community {
  @include single;
  @include scroller;}
</style>
