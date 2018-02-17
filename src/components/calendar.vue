<template>
  <div class="calendar">
    calendar
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'calendar',
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

.calendar {
  height: 100px;
  background: #bfbfbf;
}
</style>
