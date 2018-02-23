<template>
  <div class="foot">
    <a class="foot__link">©hardeman</a>
    <a class="foot__link">shipments</a>
    <a class="foot__link">return</a>
    <a class="foot__link">terms of use</a>
    <a class="foot__link">avoid scams and frauds</a>
    <a class="foot__link">privacy police</a>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'foot',
  props: [],
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

.foot {
  width: 100%;
  height: $footer-height;
  background: $grey;
  color: $blue;
  border-top: $border;
  text-align: center;
  position: absolute;
  bottom: 0;

  &__link {
    margin: 0 10px;
    font-size: $font-size-s;
    line-height: $footer-height;
    font-weight: normal;
  }
}
</style>
