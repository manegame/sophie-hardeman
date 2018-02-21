<template>
  <div class='single_sale'>
    <navbar />
    <topbar />
    <div class="single_sale__main">
      <h1 class="single_sale__main__title">{{main.single_garment.title.rendered}}</h1>
      <img :src='main.single_garment.acf.image.sizes["s-h-large"]'/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'single-sale',
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

.single_sale {
  @include single;

  &__main {
    &__title {
      color: $black;
    }
  }
}
</style>
