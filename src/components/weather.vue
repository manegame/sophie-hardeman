<template>
  <div class="weather" v-if='main.weather.weather'>
    <h3 class="weather__head">weather</h3>
    <div class="weather__top">
      <p class="weather__top__title" v-html='main.weather.name'/>
      <div class="weather__top__info">
        <img class="weather__top__info__icon"
           :src='"https://openweathermap.org/img/w/" + main.weather.weather[0].icon + ".png"' />
        <div class="weather__top__info__right">
          <h1 class="weather__top__info__right__temp">{{Math.round(main.weather.main.temp) | temperature}}</h1>
          <p class="weather__top__info__right__sub" v-html='main.weather.weather[0].description'/>
        </div>
      </div>
    </div>
    <div class="weather__bottom">
      <p class="weather__bottom__day">{{weekday}}</p>
      <div class="weather__bottom__temps">
        <p class="weather__bottom__temps__temp">lo: {{main.weather.main.temp_min | temperature}}</p>
        <p class="weather__bottom__temps__temp">hi: {{main.weather.main.temp_max | temperature}}</p><br />
      </div>
    </div>
    <h3 class="weather__foot">what to wear?</h3>
    <template v-if="season !== null">
      <router-link :to='`collection/${season.slug}/lookbook`' tag='img' class='weather__pic' :src='main.single_garment.acf.image.sizes["s-h-tiny"]' />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { format } from 'date-fns'

export default {
  name: 'weather',
  data() {
    return {
      season: null
    }
  },
  props: [],
  computed: {
    ...mapState(['main']),
    weekday() {
      let d = new Date()
      return format(d, 'ddd')
    }
  },
  mounted() {
    this.GET_WEATHER()
    this.GET_COLLECTIONS()
      .then(() => {
        let slug = this.getRandomGarment().post_name
        this.GET_SINGLE_GARMENT(slug)
          .then(() => {
            this.season = this.main.collections.find(collection => {
              return collection.acf.garments.find(garment => {
                return garment.ID === this.main.single_garment.id
              })
            })
          })
      })
  },
  updated: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been re-rendered
    })
  },
  methods: {
    ...mapActions([
      'GET_WEATHER',
      'GET_COLLECTIONS',
      'GET_SINGLE_GARMENT'
    ]),
    ...mapGetters(['getRandomGarment'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.weather {
  text-align: left;
  text-transform: lowercase;
  height: auto;
  overflow: hidden;
  margin-bottom: $line-height;

  &__head {
    text-align: center;
    margin-bottom: 4px;
    background: $grey;
    border-top: $border-light;
    border-bottom: $border-light;
    cursor: pointer;
  }

  &__foot {
    text-align: center;
    margin-bottom: 4px;
    background: $grey;
    border-top: none;
    border-bottom: $border-light;
    cursor: pointer;
  }

  &__pic {
    width: 100%;
    max-height: $line-height * 7;
    object-fit: contain;
    object-position: center;
  }

  &__top {
    border-bottom: $border-light;
    margin-bottom: 4px;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;

    &__title {
      width: 100%;
      color: $blue;
    }

    &__info {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: flex-start;

      @include screen-size('medium') {
        margin-left: 0;
        width: 100%;
      }

      &__icon {
        width: 80px;
        height: 80px;
        margin-right: 0;
        filter: blur(2px);

        @include screen-size('medium') {
          width: 100px;
          margin: 0 auto;
        }

        @include screen-size('short') {
          filter: blur(1px);
          width: 60px;
          height: 60px;
        }
      }

      &__right {
        flex-grow: 1;
        text-align: right;
        width: 100%;

        &__temp {
          font-family: $sans-serif-stack;
          font-weight: bold;
          font-size: 26px;
          line-height: 26px;

          @include screen-size('medium') {
            text-align: right;
          }
        }

        &__sub {
          margin-bottom: 6px;
          color: $blue;
        }
      }
    }
  }

  &__bottom {
    display: flex;
    border-bottom: $border-light;
    padding: 2px 0;

    @include screen-size('short') {
      display: none;
    }

    &__day {
      color: $blue;
      width: 120px;
      margin: 0;
    }

    &__temps {
      &__temp {
        color: $blue;
        font-size: $font-size-s;
        line-height: $line-height-s;
        margin: 0;
      }
    }
  }
}
</style>
