<template>
  <div class='stockists'>
    <navbar />
    <topbar />
    <div v-if='main.single_stockist'
         class="stockists__main">
      <div class="stockists__main__left">
        <img class="stockists__main__left__image"
             :src='main.single_stockist.acf.image.sizes["s-h-medium"]' />
      </div>
      <h5 class='main__title'>
        {{main.single_stockist.title.rendered}}
      </h5>
      <p v-html='main.single_stockist.acf.description' />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'stockists',
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

.stockists {
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

    &__title {
      color: $black;
    }

    &__stockist {
      display: block;
    }
  }
}
</style>
