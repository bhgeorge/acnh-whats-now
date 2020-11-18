<template>
  <div id="app">
    <router-view/>
    <!-- Mobile Navigation -->
    <footer>
      <nav class="c-nav-mobile">
        <ul class="c-nav-mobile__list">
          <li
            v-for="item in navItems"
            :key="item.name"
            class="c-nav-mobile__list-item"
          >
            <router-link :to="{ name: item.name }">
              {{ item.text }}
            </router-link>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
import { ACTION_TYPES } from '@/store';

export default {
  data() {
    return {
      navItems: [
        {
          name: 'fish',
          text: 'Fish',
        },
        {
          name: 'bugs',
          text: 'Bugs',
        },
        {
          name: 'diving',
          text: 'Diving',
        },
        {
          name: 'settings',
          text: 'Settings',
        },
      ],
    };
  },

  mounted() {
    this.$store.dispatch(ACTION_TYPES.START_TIME);
  },
};
</script>
