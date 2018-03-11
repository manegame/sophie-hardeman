<template>
  <div class='single_sale'>
    <navbar />
    <topbar />
    <div v-if='main.single_garment.acf'
         class="single_sale__main">
         <h5 class="single_sale__main__title">
           <span class="single_sale__main__title--season"
                 v-html='main.single_garment.acf.season'></span>
           <span class='single_sale__main__title--title'
                 v-html='main.single_garment.title.rendered'></span>
         </h5>
         <div class="single_sale__main__left">
           <img class="single_sale__main__left__image"
                :src='main.single_garment.acf.image.sizes["s-h-small"]'/>
           <div class="single_sale__main__left__text">
             <template v-if='main.single_garment.acf.description'>
               <p class="single_sale__main__left__text--head">Description</p>
               <p class="single_sale__main__left__text--main"
                  v-html='main.single_garment.acf.description' />
             </template>
             <template v-if='main.single_garment.acf.details'>
               <p class="single_sale__main__left__text--head">Details</p>
               <p class="single_sale__main__left__text--main"
                  v-html='main.single_garment.acf.details' />
             </template>
             <template v-if='main.single_garment.acf.details_and_sizing'>
               <p class="single_sale__main__left__text--head">Details & sizing</p>
               <p class="single_sale__main__left__text--main"
                  v-html='main.single_garment.acf.details_and_sizing' />
             </template>
           </div>
           <div class="single_sale__main__left__payment">
             –– pick a size and payment options ––
           </div>
         </div>
         <div class="single_sale__main__right">
           <aboutSophie />
         </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import aboutSophie from '@/components/about-sophie'

export default {
  name: 'single-sale',
  components: {
    navbar,
    topbar,
    aboutSophie
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
      width: calc(100% - #{$left-col-width});
      margin-bottom: 10px;
      color: $black;

      @include screen-size('small') {
        width: 100%;
      }

      &--season {
        color: $grey-darker;
        display: inline;

        &::before {
          content: '\2605';
          font-size: 20px;
          margin-right: 6px;
        }
      }
    }

    &__left {
      position: relative;
      clear: none;
      float: left;
      width: calc(100% - #{$left-col-width});

      @include screen-size('small') {
        width: 100%;
        margin-bottom: 40px;
      }

      &__image {
        width: 100%;
        height: 45vh;
        object-fit: contain;
        background: $grey;
        margin-bottom: 10px;
      }

      &__text {
        width: 50%;
        float: left;
        font-size: $font-size-s;
        line-height: $line-height-s;

        &--head {
          color: $grey-darker;
        }

        &--main {
          margin-bottom: $line-height-s;
        }

        @include screen-size('small') {
          width: 100%;
        }
      }

      &__payment {
        font-size: $font-size-s;
        line-height: $line-height-s;
        width: 50%;
        float: left;
      }
    }

    &__right {
      padding-left: 20px;
      width: $left-col-width;
      position: relative;
      float: right;

      @include screen-size('small') {
        padding: 0;
        float: left;
        width: 100%;
      }
    }
  }
}
</style>
