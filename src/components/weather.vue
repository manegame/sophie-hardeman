<template>
  <div class="weather" v-if='main.weather.weather'>
    <div class="weather__top">
      <div>
        <p v-html='main.weather.name'/>
        <img class="weather__top__icon"
             :src='"http://openweathermap.org/img/w/" + main.weather.weather[0].icon + ".png"' />
      </div>
      <div>
        <h1>{{Math.round(main.weather.main.temp) | temperature}}</h1>
        <p class="weather__top__sub" v-html='main.weather.weather[0].description'/>
      </div>
    </div>
    <div class="weather__bottom">
      <p>
        {{weekday}}
      </p>
      <p v-html='"lo: " + main.weather.main.temp_min'/>
      <p v-html='"hi: " + main.weather.main.temp_max'/>
      <p v-html='"visibility: " + main.weather.visibility'/>
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

  &__top {
    border-bottom: $border-light;
    display: flex;
    align-items: flex-end;

    &__sub {
      text-align: right;
    }

    &__icon {
      width: 50px;
      height: auto;
    }
  }
}
</style>
