<template>
  <div class='app'>
    <router-view id='view'/>
    <foot />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import foot from './components/foot'

export default {
  name: 'app',
  components: {
    foot
  },
  data() {
    return {
      cat_id: 6,
      meta: {
        sitename: 'Sophie Hardeman',
        facebook: 'xxxxxxxxx',
        twitter: '@xxxxx',
        title: 'Sophie Hardeman',
        description: 'xxxx',
        type: 'website',
        image: 'http://xxxx',
        url: 'http://xxxx',
        defaults: {
          title: 'Home',
          description: 'xxxx',
          image: 'http://xxxx',
          type: 'website'
        }
      }
    }
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    ...mapActions([
      'GET_BANNER',
      'GET_COLLECTIONS',
      'GET_SINGLE_COLLECTION',
      'GET_SINGLE_ABOUT',
      'CLEAR_SINGLES',
      'GET_DIARY',
      'GET_EVENTS',
      'GET_STOCKISTS',
      'GET_ABOUT',
      'GET_GARMENT',
      'GET_SINGLE_GARMENT',
      'GET_GARMENTS',
      'GET_GARMENT_CATEGORIES',
      'GET_VIDEOS',
      'GET_VIDEO'
    ]),
    $_setMetaTags(meta = {}) {
      this.meta.title = meta.title || this.meta.defaults.title
      this.meta.description = meta.description || this.meta.defaults.description
      this.meta.image = meta.image || this.meta.defaults.image
      this.meta.type = meta.type || this.meta.defaults.type
      this.meta.url = 'http://xxx.com' + this.$route.fullPath
      this.$emit('updateHead')
    },
    $_fetchData(route) {
      // All requests for data from the server originates from this function
      switch (route.name) {
        case ('landing'):
          this.CLEAR_SINGLES()
          this.GET_BANNER()
          this.GET_COLLECTIONS()
          this.GET_ABOUT()
          this.GET_VIDEOS()
          this.GET_GARMENT_CATEGORIES()
          this.GET_DIARY()
          this.GET_EVENTS()
          this.GET_STOCKISTS()
          break
        case ('collection'):
          this.CLEAR_SINGLES()
          this.GET_SINGLE_COLLECTION(route.params.slug)
          this.GET_COLLECTIONS()
          break
        case ('about'):
          this.CLEAR_SINGLES()
          this.GET_ABOUT()
          this.GET_SINGLE_ABOUT(route.params.slug)
          break
        case ('sale'):
          this.GET_GARMENT_CATEGORIES().then(() => {
            let cat = this.main.garment_categories.filter(c => { return c.slug === this.$route.params.slug })[0]
            this.GET_GARMENTS(cat.id)
          })
          break
        case ('single sale'):
          this.GET_GARMENT_CATEGORIES()
          this.GET_SINGLE_GARMENT(route.params.item)
          break
        case ('hardeman tv'):
          this.GET_VIDEOS()
          break
        case ('diary'):
          this.GET_DIARY()
          break
        case ('stockists'):
          this.GET_STOCKISTS()
          break
      }
    }
  },
  head: {
    title() {
      return {
        inner: this.meta.title
      }
    },
    meta() {
      return [
        {name: 'application-name', content: 'Sophie Hardeman'},
        {name: 'description', content: this.meta.description},
        // Twitter
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: this.meta.title},
        {name: 'twitter:description', content: this.meta.description},
        {name: 'twitter:site', content: this.meta.twitter},
        {name: 'twitter:creator', content: this.meta.twitter},
        {name: 'twitter:image:src', content: this.meta.image},
        // Facebook / Open Graph
        {property: 'og:title', content: this.meta.title},
        {property: 'og:site_name', content: this.meta.defaults.title},
        {property: 'og:description', content: this.meta.description},
        {property: 'og:type', content: this.meta.type},
        {property: 'og:url', content: this.meta.url},
        {property: 'og:image', content: this.meta.image},
        // {property: 'fb:admins', content: this.meta.facebook},
        // {property: 'fb:app_id', content: this.meta.facebook},
        // Google+ / Schema.org
        {itemprop: 'name', content: this.meta.title},
        {itemprop: 'description', content: this.meta.description},
        {itemprop: 'image', content: this.meta.image}
      ]
    }
  },
  watch: {
    $route(to, from) {
      if (to !== undefined) {
        this.$_fetchData(to)
        this.$_setMetaTags()
      } else {
        this.$_fetchData(from)
        this.$_setMetaTags()
      }
    },
    'main.single.acf'() {
      this.main.single.acf.garments.map(g => this.GET_GARMENT(g.ID))
      this.main.single.acf.videos.map(v => this.GET_VIDEO(v.ID))
    }
  }
}
</script>

<style lang='scss'>
@import './style/helpers/_mixins.scss';
@import './style/helpers/_responsive.scss';
@import './style/helpers/_reset.css';
@import './style/_variables.scss';
@import './style/_typography.scss';

.app {
  font-family: $sans-serif-stack;
  font-size: $font-size;
  line-height: $line-height;
  color: $black;
  background: $white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  overflow: hidden;

  #view {
    height: calc(100% - #{$margin-top + $footer-height});
  }
}
</style>
