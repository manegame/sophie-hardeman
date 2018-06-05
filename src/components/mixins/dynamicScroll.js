// Dynamic scrolling with updated navigation
//
// HOW TO USE
// provide the scrollable div with id 'mainContent' and all titles with class 'scrollItem'
import animatedScrollTo from 'animated-scrollto'

export default {
  computed: {
    mainContent() { return document.getElementById('mainContent') },
    scrollItems() { return document.querySelectorAll('.scrollItem') }
  },
  updated() {
    this.$nextTick(() => {
      this.scrollToElement()
    })
  },
  methods: {
    checkEls() {
      let els = []
      document.querySelectorAll('.scrollItem').forEach(i => {
        if (this.elementInViewport(i)) els.push(i)
      })
      if (els.length > 0) this.changeRouteByScroll(els[0])
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
      this.$router.push({name: this.$route.name, params: {slug: el.id, noScrollTo: true}})
    },
    scrollToElement() {
      let el = document.getElementById(this.$route.params.slug)
      if (el !== null) animatedScrollTo(this.mainContent, el.offsetTop - 40, 600)
    }
  },
  beforeDestroy() {
    this.firstLoad = true
  },
  watch: {
    $route(to, from) {
      if (to.params.noScrollTo === false) {
        this.scrollToElement()
      }
    }
  }
}
