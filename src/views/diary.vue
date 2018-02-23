<template>
  <div class='diary'>
    <navbar />
    <topbar />
    <div class="diary__main"
         id='mainContent'
         ref='diary'
         @scroll='handleScroll'>
      <template v-for='entry in main.diary'>
        <h1 class="diary__main__title"
            :id='entry.slug'
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
// import animatedScrollTo from 'animated-scrollto'

export default {
  name: 'diary',
  components: {
    navbar,
    topbar
  },
  computed: {
    ...mapState(['main']),
    mainContent() {
      return document.getElementById('mainContent')
    },
    activeItem: {
      get: () => {
        return ''
      },
      set: (newV) => {
        this.activeItem = newV[0]
        return newV
      }
    }
  },
  watch: {
    $route(to, from) {
      let el = document.getElementById(to.params.slug)
      console.log(el)
      // animatedScrollTo(this.mainContent, el, 300)
    }
  },
  methods: {
    handleScroll(event) {
      this.checkEl(event)
    },
    checkEl(event) {
      const diaryItems = document.querySelectorAll('.diary__main__title')
      let els = []
      diaryItems.forEach(i => {
        if (this.elementInViewport(i)) els.push(i)
      })
      this.changeRoute(els[0])
    },
    elementInViewport(el) {
      var rect = el.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    },
    changeRoute(el) {
      this.$router.push({name: 'diary', params: {slug: el.id}})
    }
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
