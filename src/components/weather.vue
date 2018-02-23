<template>
  <div class="weather" v-if='main.weather.weather'>
    <div class="weather__top">
      <p class="weather__top__title" v-html='main.weather.name'/>
      <img class="weather__top__icon"
           :src='"http://openweathermap.org/img/w/" + main.weather.weather[0].icon + ".png"' />
      <div>
        <h1 class="weather__top__temp">{{Math.round(main.weather.main.temp) | temperature}}</h1>
        <p class="weather__top__sub" v-html='main.weather.weather[0].description'/>
      </div>
    </div>
    <div class="weather__bottom">
      <p class="weather__bottom__day">{{weekday}}</p>
      <div class="weather__bottom__temps">
        <p class="weather__bottom__temps__temp" v-html='"lo: " + main.weather.main.temp_min'/>
        <p class="weather__bottom__temps__temp" v-html='"hi: " + main.weather.main.temp_max'/><br />
      </div>
      <!-- <p>
        wind direction:
      </p>
      <hr :style='"transform:rotate(" + main.weather.wind.deg + 90 + "deg)"'/> -->
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
  padding: 4px 0;

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

    &__sub {
      text-align: left;
      margin-bottom: 6px;
      color: $blue;
    }

    &__temp {
      font-family: $sans-serif-stack;
      font-weight: bold;
      font-size: 26px;
      line-height: 26px;
    }

    &__icon {
      width: 100px;
      margin-right: 40px;
      filter: blur(2px);
      height: auto;
    }
  }

  &__bottom {
    display: flex;
    border-bottom: $border-light;
    padding: 2px 0;
    height: calc(#{$line-height-s * 2} + 8px);

    &__day {
      color: $blue;
      width: 140px;
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
