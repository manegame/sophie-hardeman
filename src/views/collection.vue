<template>
  <div>
    collection
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'collection',
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

.temp {
  background: #ff81f2;
}
</style>
