<template>
  <ul class="o-list-inline">
    <li
      v-for="hour in 24"
      :key="hour"
      :class="{ 'active': hours.indexOf(hour - 1) !== -1 }"
      class="o-list-inline__item c-time-availability__item"
    >
      {{ parseDate(hour - 1) | hour }}
    </li>
  </ul>
</template>

<script>
import { parse } from 'date-fns';

export default {
  props: {
    hours: {
      type: Array,
      required: true,
    },
  },

  methods: {
    parseDate(hourInt) {
      return parse(`${hourInt}`, 'H', new Date());
    },
  },
};
</script>
