<template>
  <div class='about'>
    <navbar />
    <topbar />
    <div class="about__main">
      <img v-if='main.single_about.acf.profile_pic'
           class="about__main__bio_profile_pic"
           :src='main.single_about.acf.profile_pic.sizes["s-h-small"]' />
      <h1 class="about__main__title">
        {{main.single_about.title.rendered}}
      </h1>
      <p v-if='main.single_about.acf.text'
         v-html='main.single_about.acf.text' />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'about',
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

.about {
  @include single;

  &__main {
    &__bio_profile_pic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
    }

    &__title {
      color: $black;
    }
  }
}
</style>
