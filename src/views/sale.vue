<template>
  <div class='sale'>
    <navbar />
    <topbar />
    <div class="sale__main">
      <h1 class="sale__main__title">
        {{$route.params.slug}}
      </h1>
      <div class="sale__main__item"
           v-for='item in main.garments'>
             <img :src='item.acf.image.sizes["s-h-large"]' />
            {{item.title.rendered}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'sale',
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

.sale {
  @include single;

  &__main {
    &__title {
      color: $black;
    }
  }
}
</style>
