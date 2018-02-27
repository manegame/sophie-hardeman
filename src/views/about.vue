<template>
  <div class='about'>
    <navbar />
    <topbar />
    <div class="about__main">
      <div class="about__main__left">
        <img v-if='$route.params.slug === "bio" && main.single_about.acf'
             class="about__main__left__bio_profile_pic"
             :src='main.single_about.acf.profile_pic.sizes["s-h-small"]' />
        <randomImage v-else />
      </div>
      <div class="about__main__right"
           v-if='main.single_about.acf'>
        <h5 class="about__main__right__title">
          {{main.single_about.title.rendered}}
        </h5>
        <p v-if='main.single_about.acf.text'
           v-html='main.single_about.acf.text' />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import randomImage from '@/components/random-image'

export default {
  name: 'about',
  components: {
    navbar,
    topbar,
    randomImage
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

.about {
  @include single;

  &__main {
    position: relative;
    clear: none;

    &__left {
      width: $left-col-width;
      height: 100%;
      float: left;

      &__bio_profile_pic {
        width: 100%;
      }
    }

    &__right {
      position: relative;
      float: right;
      width: calc(100% - #{$left-col-width} - 20px);
      height: 100%;
      padding: 0 20px;
      margin-right: 20px;

      &__title {
        color: $black;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
