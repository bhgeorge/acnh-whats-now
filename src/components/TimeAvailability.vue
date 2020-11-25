<template>
  <div>
    <!-- Months -->
    <ul class="o-list-inline u-m-top-s">
      <li
        v-for="month in 12"
        :key="month"
        :class="{ 'active': months.indexOf(month - 1) !== -1 }"
        class="o-list-inline__item c-time-availability__item"
      >
        {{ parseMonth(month) | monthShort }}
      </li>
    </ul>
    <hr>
    <!-- Hours -->
    <ul class="o-list-inline u-m-top">
      <li
        v-for="hour in 24"
        :key="hour"
        :class="{ 'active': hours.indexOf(hour - 1) !== -1 }"
        class="o-list-inline__item c-time-availability__item"
      >
        {{ parseDate(hour - 1) | hour }}
      </li>
    </ul>
  </div>
</template>

<script>
import { parse } from 'date-fns';

export default {
  props: {
    hours: {
      type: Array,
      required: true,
    },

    months: {
      type: Array,
      required: true,
    },
  },

  methods: {
    parseDate(hourInt) {
      return parse(`${hourInt}`, 'H', new Date());
    },

    parseMonth(monthInt) {
      return parse(`${monthInt}`, 'M', new Date());
    },
  },
};
</script>
