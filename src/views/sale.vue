<template>
  <div class='sale'>
    <navbar />
    <topbar />
    <div class="sale__main">
      <router-link tag='div'
                   v-for='item in main.garments'
                   :key='item.id'
                   :to="{ name: 'single sale', params: {slug: $route.params.slug, item: item.slug}}"
                   class="sale__main__item" >
             <img class="sale__main__item__image"
                  :src='item.acf.image.sizes["s-h-large"]' />
      </router-link>
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
    &__item {
      width: 400px;
      height: 400px;
      border-radius: 20px;

      &__image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
