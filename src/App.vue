<template>
  <div class='app'>
    <router-view id='view' />
    <foot />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import foot from './components/foot'
import core from './components/shop/mixins/core'

export default {
  name: 'app',
  mixins: [core],
  components: {
    foot
  },
  data() {
    return {
      ready: false,
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
      //
      // HARDEMAN WORDPRESS CORE
      //
      'GET_BANNER',
      'GET_COLLECTIONS',
      'GET_SINGLE_COLLECTION',
      'GET_SINGLE_ABOUT',
      'CLEAR_SINGLES',
      'GET_DIARY',
      'GET_EVENTS',
      'GET_SINGLE_EVENT',
      'GET_STOCKISTS',
      'GET_ABOUT',
      'GET_GARMENT',
      'GET_SINGLE_GARMENT',
      'GET_SINGLE_VIDEO',
      'GET_SINGLE_STOCKIST',
      'GET_GARMENTS',
      'GET_GARMENT_CATEGORIES',
      'GET_VIDEOS',
      'GET_VIDEO',
      'GET_RANDOM_IMAGES',
      'GET_COMMUNITY',
      'GET_IMPRESSUM',
      'GET_SINGLE_IMPRESSUM',
      //
      // WOOCOMMERCE
      //
      'GET_PRODUCTS',
      'GET_PRODUCT_VARIATIONS',
      'GET_PRODUCT_CATEGORIES',
      'GET_SHIPPING_ZONES',
      'GET_SHIPPING_ZONE_LOCATIONS',
      'GET_SHIPPING_ZONE_METHODS',
      'GET_PRODUCT',
      'SHIPPING_LOADED',
      'EMPTY_ORDER'
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
      this.GET_IMPRESSUM()
      switch (route.name) {
        case ('first load'):
          this.GET_BANNER()
          this.GET_COLLECTIONS()
          this.GET_ABOUT()
          this.GET_VIDEOS()
          this.GET_GARMENT_CATEGORIES()
          this.GET_DIARY()
          this.GET_EVENTS()
          this.GET_STOCKISTS()
          this.GET_COMMUNITY()
          break
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
          this.GET_COMMUNITY()
          break
        case ('collection'):
          this.CLEAR_SINGLES()
          this.GET_SINGLE_COLLECTION(route.params.slug)
          this.GET_COLLECTIONS()
          break
        case ('about'):
          this.CLEAR_SINGLES()
          this.GET_RANDOM_IMAGES()
          this.GET_ABOUT()
          this.GET_SINGLE_ABOUT(route.params.slug)
          break
        case ('sale'):
          if (route.params.slug === 'all') {
            this.GET_GARMENT_CATEGORIES()
            this.GET_GARMENTS(route.params.slug)
            this.GET_PRODUCTS()
            this.GET_PRODUCT_CATEGORIES()
          } else {
            this.GET_GARMENT_CATEGORIES().then(() => {
              const cat = this.main.garment_categories.filter(c => { return c.slug === this.$route.params.slug })[0]
              this.GET_GARMENTS(cat.id)
            })
          }
          break
        case ('single sale'):
          this.GET_GARMENT_CATEGORIES()
          this.GET_SINGLE_GARMENT(route.params.item)
          break
        case ('hardeman tv'):
          this.GET_VIDEOS().then(() => {
            let vid = this.main.videos.filter(v => { return v.slug === route.params.slug })[0]
            this.GET_SINGLE_VIDEO(vid.id)
          })
          break
        case ('diary'):
          this.GET_DIARY()
          break
        case ('stockists'):
          this.GET_STOCKISTS()
          this.GET_SINGLE_STOCKIST(route.params.slug)
          break
        case ('events'):
          this.GET_EVENTS()
          this.GET_SINGLE_EVENT(route.params.slug)
          break
        case ('community'):
          this.GET_COMMUNITY()
          break
        case ('impressum'):
          this.GET_RANDOM_IMAGES()
          this.GET_SINGLE_IMPRESSUM(route.params.slug)
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
      // console.log(to.params.slug, from.params.slug)
      switch (to) {
        case (to.name === 'collection' && to.params.slug === from.params.slug):
          this.ready = true
          break
        case (from.name === 'diary' && to.name === 'diary'):
          this.ready = true
          break
        default:
          if (from.name === null) {
            this.$_fetchData('first load')
          }
          this.$_fetchData(to)
          this.$_setMetaTags()
          break
      }
    },
    'main.single.acf'() {
      if (this.main.single.acf.videos) this.main.single.acf.videos.map(v => this.GET_VIDEO(v.ID))
      if (this.main.single.acf.garments) this.main.single.acf.garments.map(g => this.GET_GARMENT(g.ID))
    }
  }
}
</script>

<style lang='scss'>
@import './style/helpers/_mixins.scss';
@import './style/helpers/_responsive.scss';
@import './style/helpers/_reset.css';
@import './style/helpers/_embed.scss';
@import './style/_variables.scss';
@import './style/_typography.scss';
@import './style/vendor/fullcalendar.scss';

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

.fc-toolbar {
  display: none;
}

.fc-widget-content {
  height: 100%;
  padding: 0;
}
</style>
