<template>
  <div class='diary'>
    <navbar />
    <topbar />
    <div class="diary__main"
         ref='diary'>
      <template v-for='entry in main.diary'>
        <h1 class="diary__main__title"
            :key='entry.id'
            :ref='entry.id'>
              {{entry.title.rendered}}
        </h1>
        <img class="diary__main__image"
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
  name: 'diary',
  components: {
    navbar,
    topbar
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    scrollTo(ref) {
      this.$refs.diary.scrollTop = ref.offsetTop - 30
    }
  },
  watch: {
    $route(to, from) {
      let entry = this.main.diary.filter(e => e.slug === to.params.slug)[0]
      this.scrollTo(this.$refs[entry.id][0])
    }
    // const mainContent = document.getElementById('main-content')
    // const target = document.getElementById(to.params.title)
    // animatedScrollTo(mainContent, target.offsetTop, 300)
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.diary {
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
