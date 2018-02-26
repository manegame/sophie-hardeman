<template>
  <div class='events'>
    <navbar />
    <topbar />
    <div v-if='main.single_event.acf'
         class="events__main">
      <div class="events__main__left">
        <img class="events__main__left__image"
             :src='main.single_event.acf.image.sizes["s-h-medium"]' />
      </div>
      <div class="events__main__right">
        <h5 class='events__main__right__title'>
          {{main.single_event.title.rendered}}
        </h5>
        <p v-html='main.single_event.acf.info' />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'events',
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

.events {
  @include single;

  &__main {
    position: relative;
    clear: none;

    &__left {
      width: $left-col-width;
      float: left;

      &__image {
        width: 100%;
        height: auto;
      }
    }

    &__right {
      @include right-col;
      &__title {
        color: $black;
      }
    }
  }
}
</style>
