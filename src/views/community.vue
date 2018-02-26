<template>
  <div class='community'>
    <navbar />
    <topbar />
    <div class="community__main"
         v-if='main.community.length > 0'>
      <template v-for='entry in main.community'>
        <h1 class="community__main__title"
            :id='entry.slug'
            :key='entry.id'
            :ref='entry.id'>
              {{entry.title.rendered}}
        </h1>
        <img class="community__main__image"
             v-if='entry.acf.image'
             :src='entry.acf.image.sizes["s-h-large"]'/>
      </template>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'community',
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

.community {
  @include single;

  &__main {
    padding-bottom: 80px;

    &__title {
      font-size: 26px;
      line-height: 42px;
      color: $black;
    }

    &__image {
      max-height: 75vh;
      width: auto;
      max-width: 100%;
      margin-bottom: $margin-top;
    }
  }
}
</style>
