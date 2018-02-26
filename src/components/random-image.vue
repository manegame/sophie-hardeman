<template>
  <div class="random_image">
    <img class="random_image__image"
         v-if='main.random_images.length > 0'
         :src='main.random_images[randomInt].image.sizes["s-h-medium"]' />
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'random-image',
  computed: {
    ...mapState(['main']),
    randomInt() {
      if (this.main.random_images.length > 0) return Math.floor(Math.random() * this.main.random_images.length)
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.random_image {
  width: 100%;

  &__image {
    width: 100%;
  }
}
</style>
