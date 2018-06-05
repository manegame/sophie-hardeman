<template>
  <div class='impressum'>
    <navbar />
    <topbar />
    <div class="impressum__main"
         v-if='main.single_impressum.acf'>
         <h5 v-html='main.single_impressum.title.rendered' />
         <div class="impressum__main__right"
              v-if='main.single_impressum.acf.wysiwyg'>
           <p v-html='main.single_impressum.acf.wysiwyg' />
         </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'


export default {
  name: 'impressum',
  head: {
    title: () => {
      return {
        inner: 'Impressum'
      }
    },
    meta: () => {
      return [
        { name: 'title', content: 'Impressum' }
      ]
    }
  },
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

.impressum {
  height: $exact-height;

  @include single;

  &__main {
    position: relative;
    clear: none;

    &__left {
      width: $left-col-width;
      float: left;

      @include screen-size('small') {
        width: 100%;
      }

      &__image {
        width: 100%;
        height: auto;
      }
    }

    &__right {
      @include right-col;
      padding-top: $line-height-s;

      &__title {
        color: $black;
      }
    }
  }
}

</style>
