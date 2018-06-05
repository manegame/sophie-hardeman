<template>
  <div class='order-complete'>
    <navbar />
    <topbar />
    <div class="order-complete__main">
         <div class="order-complete__main__left">
          <!--  -->
         </div>
         <div class="order-complete__main__right">
           Thanks for ordering at Hardeman. You'll be looking fly soon!
         </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'


export default {
  name: 'order-complete',
  head: {
    title: () => {
      return {
        inner: 'Order Complete'
      }
    },
    meta: () => {
      return [
        { name: 'title', content: 'Order Complete' }
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

.order-complete {
  @include single;

  &__main {
    position: relative;
    clear: none;

    &__left {
      width: $left-col-width;
      display: block;
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
      float: right;

      &__title {
        color: $black;
      }
    }
  }
}

</style>
