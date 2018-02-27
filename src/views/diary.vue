<template>
  <div class='diary'>
    <navbar />
    <topbar />
    <div class="diary__main"
         @scroll='checkEls'
         id='mainContent'>
         <template v-for='entry in main.diary'>
           <h1 class="diary__main__title scrollItem"
               :id='entry.slug'
               :key='entry.id'
               :ref='entry.id'>
                 {{entry.title.rendered}}
           </h1>
           <img class="diary__main__image"
                v-if='entry.acf.image'
                :src='entry.acf.image.sizes["s-h-large"]'/>
         </template>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import dynamicScroll from '@/components/mixins/dynamicScroll'
// import animatedScrollTo from 'animated-scrollto'

export default {
  name: 'diary',
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

.diary {
  @include single;

  &__main {
    padding-bottom: 80px;

    &__title {
      font-size: 26px;
      line-height: 42px;
      color: $black;
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
