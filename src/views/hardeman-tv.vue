<template>
  <div class='hardeman_tv'>
    <navbar />
    <topbar />
    <div class="hardeman_tv__main">
      <div class="hardeman_tv__main__video">
        <div v-if='main.single_video.acf'
             class="video-embed"
             v-html='embedCode' />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import embed from 'embed-video'

export default {
  name: 'hardeman-tv',
  head: {
    title: () => {
      return {
        inner: 'Hardeman TV'
      }
    },
    meta: () => {
      return [
        { name: 'title', content: 'Hardeman TV' }
      ]
    }
  },
  components: {
    navbar,
    topbar
  },
  computed: {
    ...mapState(['main']),
    embedCode() {
      return embed(this.main.single_video.acf.video, { query: {width: 2000, portrait: 0, color: '00f', quality: '1080p'}, attr: {class: 'inner'}})
    }
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

    &__video {
      width: calc(100% - 20px);

      @include screen-size('medium') {
        width: 100%;
      }
    }
  }
}
</style>
