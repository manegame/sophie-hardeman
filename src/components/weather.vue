<template>
  <div class="weather" v-if='main.weather.weather'>
    <!-- <div class="weather__tip"><img src='https://s-h.manusnijhoff.nl/wp-content/uploads/2018/05/0.png'/></div> -->
    <h3 class="weather__head">what to wear?</h3>
    <div class="weather__top">
      <p class="weather__top__title" v-html='main.weather.name'/>
      <div class="weather__top__info">
        <img class="weather__top__info__icon"
           :src='"https://openweathermap.org/img/w/" + main.weather.weather[0].icon + ".png"' />
        <h1 class="weather__top__info__temp">{{Math.round(main.weather.main.temp) | temperature}}</h1>
        <p class="weather__top__info__sub" v-html='main.weather.weather[0].description'/>
      </div>
    </div>
    <div class="weather__bottom">
      <p class="weather__bottom__day">{{weekday}}</p>
      <div class="weather__bottom__temps">
        <p class="weather__bottom__temps__temp">lo: {{main.weather.main.temp_min | temperature}}</p>
        <p class="weather__bottom__temps__temp">hi: {{main.weather.main.temp_max | temperature}}</p><br />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {format} from 'date-fns'

export default {
  name: 'weather',
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
  },
  updated: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been re-rendered
    })
  },
  methods: {
    ...mapActions(['GET_WEATHER'])
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
  padding: 0 0 40px;

  &__head {
    text-align: center;
    margin-bottom: 4px;
    background: $grey;
    border-top: $border-light;
    border-bottom: $border-light;
    cursor: pointer;
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
      margin-left: 20px;
      width: 80px;
      display: flex;
      flex-flow: row wrap;
      align-items: flex-end;

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

      &__temp {
        width: auto;
        font-family: $sans-serif-stack;
        font-weight: bold;
        font-size: 26px;
        line-height: 26px;

        @include screen-size('medium') {
          text-align: right;
        }

        @include screen-size('short') {
          margin: auto;
          width: calc(100% - 60px);
        }
      }

      &__sub {
        text-align: left;
        margin-bottom: 6px;
        color: $blue;
      }
    }
  }

  &__bottom {
    display: flex;
    border-bottom: $border-light;
    padding: 2px 0;
    height: calc(#{$line-height-s * 2} + 8px);

    @include screen-size('short') {
      display: none;
    }

    &__day {
      color: $blue;
      width: 120px;
    }

    &__temps {
      &__temp {
        color: $blue;
        font-size: $font-size-s;
        line-height: $line-height-s;
      }
    }
  }
}
</style>
