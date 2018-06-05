<template>
  <div class='diary'>
    <navbar />
    <topbar />
    <div class="diary__main"
         @scroll='checkEls'
         id='mainContent'>
         <div v-for='entry in main.diary'
              class="diary__main__item scrollItem"
              :key='"item" + entry.id'
              :ref='entry.id'
              :id='entry.slug' >
            <load-img class="diary__main__item__image"
                      :item='entry'
                      :key='"img" + entry.id' />
            <p class="diary__main__item__title"
                :key='"p" + entry.id'>
                  {{entry.title.rendered}}
            </p>
         </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import loadImg from '@/components/load-img'
import dynamicScroll from '@/components/mixins/dynamicScroll'

export default {
  name: 'diary',
  head: {
    title: () => {
      return {
        inner: 'Diary'
      }
    },
    meta: () => {
      return [
        { name: 'title', content: 'Diary' }
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

.diary {
  @include single;
  @include scroller;
}
</style>
