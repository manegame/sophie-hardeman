// Dynamic scrolling with updated navigation
//
// HOW TO USE
// provide the scrollable div with id 'mainContent' and all titles with class 'scrollItem'
import animatedScrollTo from 'animated-scrollto'

export default {
  data() {
    return {
      firstLoad: true
    }
  },
  computed: {
    mainContent() { return document.getElementById('mainContent') },
    scrollItems() { return document.querySelectorAll('.scrollItem') }
  },
  updated() {
    this.$nextTick(() => {
      if (this.firstLoad) this.scrollToElement()
      this.firstLoad = false
    })
  },
  methods: {
    checkEls() {
      let els = []
      this.scrollItems.forEach(i => {
        if (this.elementInViewport(i)) els.push(i)
      })
      this.changeRouteByScroll(els[0])
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
    changeRouteByScroll(el) {
      this.$router.push({name: this.$route.name, params: {slug: el.id, noSnap: true}})
    },
    scrollToElement() {
      // console.log('scroll to called', this.$route.params.slug)
      let el = document.getElementById(this.$route.params.slug)
      // console.log(el)
      if (el !== null) animatedScrollTo(this.mainContent, el.offsetTop - 34, 1000)
    }
  },
  beforeDestroy() {
    this.firstLoad = true
  },
  watch: {
    $route(to, from) {
      // console.log('...', to.params.noSnap)
      if (to.params.noSnap === true) {
        // console.log('. ')
      } else {
        // console.log('snap!')
        this.scrollToElement()
      }
    }
  }
}
