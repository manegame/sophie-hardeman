<template>
  <div class='about'>
    <navbar />
    <topbar />
    <div class="about__main">
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
    &__title {
      color: $black;
    }
  }
}
</style>
