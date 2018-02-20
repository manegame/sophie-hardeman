<template>
  <div class='hardeman_tv'>
    <navbar />
    <topbar />
    <div class="hardeman_tv__main">
      <h1 class="hardeman_tv__main__title">
        Hardeman TV
      </h1>
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
