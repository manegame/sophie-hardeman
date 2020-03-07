<template>
  <div class='app'>
    <keep-alive exclude='checkout,single-sale'>
      <router-view id='view' />
    </keep-alive>
    <foot />
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import foot from './components/foot'

export default {
  name: 'app',
  components: {
    foot
  },
  data() {
    return {
      ready: false,
      cat_id: 6,
      meta: {
        sitename: 'HARDEMAN',
        facebook: 'https://www.facebook.com/hardemanonline/',
        title: 'HARDEMAN',
        description: 'HARDEMAN is a genderless jeans brand based in Amsterdam.',
        type: 'website',
        image: 'https://cms.hardeman.co/wp-content/uploads/2018/07/000019_preview-800x533.jpg',
        url: 'https://hardeman.co',
        defaults: {
          title: 'Welcome',
          description: 'HARDEMAN is a genderless jeans brand based in Amsterdam.',
          image: 'https://cms.hardeman.co/wp-content/uploads/2018/07/000019_preview-800x533.jpg',
          type: 'website'
        }
      }
    }
  },
  computed: {
    ...mapState(['main', 'shopify']),
    ...mapGetters(['uniqueProductTypes'])
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
      'GET_COMMUNITY',
      'GET_IMPRESSUM',
      'GET_SINGLE_IMPRESSUM',
      //
      // SHOPIFY
      //
      'RESET_SHOPIFY',
      'CREATE_CHECKOUT',
      'GET_SHOPIFY_COLLECTIONS',
      'GET_PRODUCT',
      'GET_PRODUCT_TYPES',
      'GET_PRODUCTS'
    ]),
    $_setMetaTags(meta = {}) {
      this.meta.title = meta.title || this.meta.defaults.title
      this.meta.description = meta.description || this.meta.defaults.description
      this.meta.image = meta.image || this.meta.defaults.image
      this.meta.type = meta.type || this.meta.defaults.type
      this.meta.url = 'https://hardeman.co' + this.$route.fullPath
      this.$emit('updateHead')
    },
    $_fetchData(route) {
      // All requests for data from the server originates from this function
      if (!this.shopify.checkout) {
        this.CREATE_CHECKOUT()
      }
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
          this.GET_PRODUCTS()
          this.GET_PRODUCT_TYPES()
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
          this.GET_PRODUCTS()
          this.GET_PRODUCT_TYPES()
          // this.RESET_SHOPIFY()
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
          this.GET_SINGLE_IMPRESSUM(route.params.slug)
          break
        case ('shopify'):
          this.GET_SHOPIFY_COLLECTIONS()
          this.GET_PRODUCT_TYPES()
          this.GET_PRODUCTS()
          break
        case ('shopify single'):
          this.GET_SHOPIFY_COLLECTIONS()
          this.GET_PRODUCT_TYPES()
          this.GET_PRODUCT(route.params.handle)
          break
      }
    }
  },
  created () {
    if (!this.shopify.checkout) {
      this.CREATE_CHECKOUT()
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
        {name: 'application-name', content: 'HARDEMAN'},
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
      // Component Usage
      this.$ua.trackEvent(
        'page',
        this.$route.fullPath,
        this.$route.fullPath
      )
      switch (to) {
        case (to.name === 'collection' && to.params.slug === from.params.slug):
          this.ready = true
          break
        case (from.name === 'diary' && to.name === 'diary'):
          this.ready = true
          break
        default:
          if (from.name === null) {
            // load first time
            this.$_fetchData('first load')
          }
          this.$_fetchData(to)
          this.$_setMetaTags()
          break
      }
      // Empty order after leaving the complete route
      if (from.name === 'order-complete') this.WC_EMPTY_ORDER()
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
}

.fc-toolbar {
  display: none;
}

.fc-widget-content {
  height: 100%;
  padding: 0;
}

.fc-content-skeleton tbody {
  height: 100px;
}

.fc-event-container {
  width: 100%;
  height: 6px;

  a {
    height: 100%;
  }

  &::after {
    content: '';
    width: 32px;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-image: url('/static/lit.gif');
    background-size: contain;
    pointer-events: none;
  }
}

.wikipedia {
  padding-bottom: $line-height * 4;
  ul {
    display: block;
  }

  h2,
  h3 {
    font-weight: 600 !important;
    margin-top: $line-height * 1.5;
    margin-bottom: $line-height-s;
  }

  b {
    font-weight: 600;
  }

  span {
    font-weight: inherit;
  }
}
</style>
