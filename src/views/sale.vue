<template>
  <div class='sale'>
    <navbar />
    <topbar />
    <div class="sale__main">
      <h1 class="sale__main__title">
        sale
      </h1>
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
