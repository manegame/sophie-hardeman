<template>
  <div class='hardeman_tv'>
    <navbar />
    <topbar />
    <div class="hardeman_tv__main">
      <h5 class="hardeman_tv__main__title">
        hardeman TV
      </h5>
      <div class="hardeman_tv__main__video"
           v-for='video in main.videos'
           v-html='video.acf.video' />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'hardeman-tv',
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

.hardeman_tv {
  @include single;

  &__main {
    &__title {
      color: $black;
    }
  }
}
</style>
