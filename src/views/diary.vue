<template>
  <div class='diary'>
    <navbar />
    <topbar />
    <div class="diary__main"
         @scroll='checkEls'
         id='mainContent'>
         <template v-for='entry in main.diary'>
           <img class="diary__main__image scrollItem"
                v-if='entry.acf.image'
                :id='entry.slug'
                :key='entry.id'
                :ref='entry.id'
                :src='entry.acf.image.sizes["s-h-large"]'/>
           <p class="diary__main__title">
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
      font-size: $font-size;
      line-height: $line-height;
      color: $blue;
    }

    &__image {
      max-height: 75vh;
      width: auto;
      max-width: 100%;
      margin-top: $margin-top;
    }
  }
}
</style>
