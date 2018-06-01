<template>
  <div class='community'>
    <navbar />
    <topbar />
    <div class="community__main"
         id='mainContent'
         @scroll='checkEls'
         v-if='main.community.length > 0'>
      <template v-for='entry in main.community'>
        <img class="community__main__image scrollItem"
             :key='"img"+entry.id'
             :id='entry.slug'
             :ref='entry.id'
             v-if='entry.acf.image'
             :src='entry.acf.image.sizes["s-h-large"]'/>
        <p class="community__main__title"
          :key='"p" + entry.id'>
              {{entry.title.rendered}}
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
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
    topbar
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

  &__main {
    padding-bottom: 80px;

    &__title {
      font-size: $font-size;
      line-height: $line-height;
      color: $blue;
    }

    &__image {
      max-height: 75vh;
      width: auto;
      max-width: 100%;
      margin-bottom: $margin-top;
    }
  }
}
</style>
