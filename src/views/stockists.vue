<template>
  <div class='stockists'>
    <navbar />
    <topbar />
    <div class="stockists__main">
      <h1 class='main__title'>
        stockists
      </h1>
      <a v-for='item in main.stockists.acf.stockists'
         :href='item.url'
         v-html='item.stockist'/>
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
    &__title {
      color: $black;
    }
  }
}
</style>
