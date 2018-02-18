<template>
  <full-calendar :events='events'
                 :config='config' />
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
        header: {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        themeSystem: 'standard',
        eventColor: '#378006',
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
@import '../style/vendor/fullcalendar.css';
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.fc {
  background: $white;

  .fc-toolbar,
  .fc-header-toolbar {
    background: rgb(180, 70, 25);
  }

  .fc-view-container {
    table {
      width: 100%;
    }
  }
}
</style>
