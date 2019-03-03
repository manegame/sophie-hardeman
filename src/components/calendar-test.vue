<template>
  <section class="calendar" style='width:200px'>
    <router-link 
      v-if='main.events.length' 
      tag='h3' 
      :to="{ 
        name: 'events', 
        params: { 
          slug: main.events[0].slug 
        }
      }" 
      class="calendar__head">event calendar</router-link>
      
      <table class='calendar__table'>
        <thead class='calendar__table__head'> 
          <tr>
            <th>Su</th>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
          </tr>
        </thead>
        <tbody class='calendar__table__body'>
          <tr class='calendar__table__body__row'>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class='calendar__table__body__row'>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class='calendar__table__body__row'>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class='calendar__table__body__row'>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'calendar-test',
  data() {
    return {
      date: new Date(),
      thisMonth: new Date().getMonth(),
      thisYear: new Date().getFullYear()
    }
  },
  computed: {
    ...mapState(['main']),
    daysInMonth() {
      return 32 - new Date(this.thisYear, this.thisMonth, 32).getDate()
    },
    monthName() {
      return new Date().toLocaleString('en-us', { month: 'long' })
    },
    dayName() {
      return new Date().toLocaleString('en-us', { weekday: 'short' })
    }
  },
  methods: {
    ...mapActions(['GET_EVENTS'])
  },
  mounted() {
    this.GET_EVENTS()
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

  &__table {
    width: 100%;
    border-collapse: collapse;

    td, th {
      border: 1px solid $grey;
    }

    &__head {
      width: 100%;
      text-align: left;
      background: $yellow;
      padding-bottom: 4px;
      border-top: $border-light;
      border-bottom: none;
      cursor: pointer;
      text-transform: uppercase;
      font-weight:bold;
    }

    &__body {
      &__row {
        min-height: $line-height;
      }
    }
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
