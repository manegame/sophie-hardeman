<template>
  <div class='diary'>
    <navbar />
    <topbar />
    <div class="diary__main"
         ref='diary'
         @scroll='checkEls'
         id='mainContent'>
         <div class="diary__main__scroll"
              id='scrollContent'>
           <template v-for='entry in main.diary'>
             <h1 class="diary__main__scroll__title"
                 :id='entry.slug'
                 :key='entry.id'
                 :ref='entry.id'>
                   {{entry.title.rendered}}
             </h1>
             <img class="diary__main__scroll__image"
                  v-if='entry.acf.image'
                  :src='entry.acf.image.sizes["s-h-large"]'/>
           </template>
         </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import animatedScrollTo from 'animated-scrollto'

export default {
  name: 'diary',
  components: {
    navbar,
    topbar
  },
  computed: {
    ...mapState(['main']),
    data() {
      return {
        scrolling: false
      }
    },
    mainContent() {
      return document.getElementById('mainContent')
    },
    scrollContent() {
      return document.getElementById('scrollContent')
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
  mounted() {
    let el = document.getElementById(this.$route.params.slug)
    animatedScrollTo(this.mainContent, el.offsetTop - 30, 300, () => {
      // end scrolling, disable scroll on route update
      this.scrolling = false
      console.log('ending automated scroll', this.scrolling)
    })
  },
  watch: {
    $route(to, from) {
      let el = document.getElementById(to.params.slug)
      // check if the scroll is initiated by a route update through scrolling.
      if (this.scrolling === true) {
        console.log('route has changed')
      } else {
        // start scrolling, disable scroll on route update
        this.scrolling = true
        console.log('starting automated scroll', this.scrolling)
        animatedScrollTo(this.mainContent, el.offsetTop - 30, 300, () => {
          // end scrolling, disable scroll on route update
          this.scrolling = false
          console.log('ending automated scroll', this.scrolling)
        })
      }
    }
  },
  methods: {
    checkEls() {
      const diaryItems = document.querySelectorAll('.diary__main__scroll__title')
      let els = []
      diaryItems.forEach(i => {
        if (this.elementInViewport(i)) els.push(i)
      })
      if (!this.scrolling) this.changeRoute(els[0])
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
    changeRoute(el, bool) {
      if (bool === 'userScrolled') {
        this.$router.push({name: 'diary', params: {slug: el.id, userScrolled: true}})
      }
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

    &__scroll {
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
}
</style>
