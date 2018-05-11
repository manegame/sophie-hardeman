<template>
  <section class="calendar">
    <router-link v-if='main.events.length' tag='h3' :to="{name: 'events', params: {slug: main.events[0].slug}}" class="calendar__head">where to go?</router-link>
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
      config: {
        header: {
          left: '',
          center: '',
          right: ''
        },
        eventClick: (event) => {
          this.$router.push({name: 'events', params: {slug: event.slug}})
        },
        height: 160,
        locale: 'nl',
        views: {
          'basicFourWeek': {
            type: 'basic',
            duration: { weeks: 4 }
          }
        },
        defaultView: 'basicFourWeek',
        fixedWeekCount: true,
        themeSystem: 'standard',
        eventColor: '#ff6b00',
        editable: false,
        columnHeaderFormat: 'dd'
      }
    }
  },
  computed: {
    ...mapState(['main']),
    events() {
      let a = []
      this.main.events.map(e => {
        let item = {
          title: e.title.rendered,
          start: e.acf.date[0].start,
          end: e.acf.date[0].end,
          slug: e.slug
        }
        a.push(item)
      })
      return a
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.calendar {
  width: 100%;
  height: auto;
  min-height: 160px;
  padding-bottom: 40px;
  box-sizing: border-box;

  &__head {
    width: 100%;
    text-align: center;
    background: $grey;
    padding-bottom: 4px;
    border-top: $border-light;
    border-bottom: none;
    cursor: pointer;
  }
}

.navbar__calendar {
  width: calc(100% - 80px);
}

.navbar__calendar .calendar__head {
  border: none;
  background: initial;
}
</style>
