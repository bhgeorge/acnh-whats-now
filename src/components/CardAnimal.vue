<template>
  <li
    :is="htmlTag"
    class="c-card c-card--outline"
  >
    <h3
      :is="titleTag"
      class="c-card__title"
    >
      {{ animal.name }}
    </h3>
    <div class="c-card__body">
      <!-- TODO: Image -->
      <div>
        <!-- TODO: Tooltip -->
        <p>{{ animal.location }}</p>
        <p v-if="animal.size">{{ animal.size }}</p>
        <!-- TODO: Collapse -->
        <details>
          <summary>Time</summary>
          <TimeAvailability :hours="animal.hours" />
        </details>
      </div>
    </div>
  </li>
</template>

<script>
import TimeAvailability from '@/components/TimeAvailability.vue';

export default {
  props: {
    animal: {
      type: Object,
      required: true,
    },

    htmlTag: {
      type: String,
      default: 'li',
    },

    titleTag: {
      type: String,
      default: 'h3',
    },
  },

  components: {
    TimeAvailability,
  },
};
</script>
