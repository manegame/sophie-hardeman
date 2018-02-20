<template>
  <div class='collection'>
    <navbar />
    <div class="collection__main">
      <topbar />
      <h1 class="collection__main__title">
        {{main.single.acf.season}} {{main.single.title.rendered}}
      </h1>
      <div class="collection__main__lookbook">
        <div class="collection__main__lookbook__look" v-for='item in main.single.garments'>
          <img class="collection__main__lookbook__look__image"
               :src='item.acf.image.sizes["s-h-medium"]'/>
          <div class="collection__main__lookbook__look__meta">
            {{main.single.acf.season}}
            {{item.title.rendered}}
            <span v-if='item.acf.sale.for_sale'>sale</span>
            <del v-else>sale</del>
          </div>
        </div>
      </div>
      <div class="collection__main__info">
        <p v-html='main.single.acf.info' />
      </div>
      <div class="collection__main__video"
           v-for='video in main.single.videos'
           v-html='video.acf.video'>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'collection',
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

.collection {
@include single;

  &__main {
    &__title {
      color: $black;
    }

    &__lookbook {
      display: flex;

      &__look {
        margin: 20px 20px 0 0;
        width: 350px;
        height: 350px;

        &__image {
          border-radius: 20px 20px 0 0;
          width: 100%;
          height: 80%;
          object-fit: cover;
        }

        &__meta {
          height: 20%;
          width: 100%;
          border-radius: 0 0 20px 20px;
          border: $border;
          background: $white;
        }
      }
    }

    &__info {
      padding-top: $margin-top;
    }

    &__video {
      padding-top: $margin-top;
    }
  }
}
</style>
