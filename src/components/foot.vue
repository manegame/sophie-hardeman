<template>
  <div class="foot">
    <template v-if='main.impressum'>
      <router-link v-for='entry in main.impressum'
                   tag='a'
                   class="foot__link"
                   :key='entry.id'
                   :to='{name: "impressum", params: {slug: entry.slug}}'
                   v-html='entry.title.rendered' />
    </template>
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
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;

  &__link {
    margin: 0 10px;
    font-size: $font-size-s;
    line-height: $footer-height;
    font-weight: normal;
  }
}
</style>
