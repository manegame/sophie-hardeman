<template>
    <div>
        <div class='message'>
            <p class='message__text message__text--active'>{{msg}}</p>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'main',
  props: [],
  data() {
    return {
      msg: 'PWR'
    }
  },
  computed: {
    ...mapState(['main'])
  },
  mounted() {},
  updated: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been re-rendered
    })
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.message {
  padding: 20px;
  background: blue;

  &__text {
    background: red;

    &--active {
      color: green;
    }
  }
}
</style>
