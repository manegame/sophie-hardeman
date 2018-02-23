<template>
  <section class="calendar">
    <h3 class="calendar__head">where to go?</h3>
    <full-calendar :events='events'
                   :config='config' />
  </section>
</template>

<script>
import {mapState} from 'vuex'
import {FullCalendar} from 'vue-full-calendar'
export default {
  name: 'calendar',
  components: {
    FullCalendar
  },
  data() {
    return {
      events: [
        {
          title: 'a',
          start: '2018-12-27'
        },
        {
          title: 'bbb',
          start: '2018-02-27'
        }
      ],
      config: {
        locale: 'nl',
        defaultView: 'month',
        fixedWeekCount: true,
        header: {
          left: '',
          center: '',
          right: ''
        },
        height: 200,
        contentHeight: 200,
        themeSystem: 'standard',
        eventColor: '#0066ff',
        columnHeaderFormat: 'dd'
      }
    }
  },
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.calendar {
  position: absolute;
  width: calc(100% - 40px);
  height: 120px;
  bottom: 40px;

  &__head {
    margin-bottom: 4px;
    background: $grey;
    border-top: $border-light;
    border-bottom: none;
  }
}
</style>
